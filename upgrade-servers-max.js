/** @param {NS} ns **/
export async function main(ns) {
	// define initial array to put total list of servers into
	let hostname = "BigBlackDick";
	let number = 1;

	// 1. build a queue using the list of currently owned servers
	// 2. find the max amount of ram so we don't have to constantly call this function
	// 3. find the cost of a server with the max amount of ram so we don't have to constantly call this function

	let checkServersMaxRamQueue = ns.getPurchasedServers();
	//let maxRamToBuy = ns.getPurchasedServerMaxRam();
	let maxRamToBuy = 1024
	let costOfMaxRamServer = ns.getPurchasedServerCost(maxRamToBuy);

	// debug print the initial queue of servers
	ns.tprint("servers currently owned: " + checkServersMaxRamQueue);

	/**
	 * 1. check the queue of servers to scan for at least 1 entry
	 * 2. print current ram, max available for purchase, upgrade cost and current money
	 * 3. if the server has less than the maximum amount of ram and you can afford delete it and buy a new one
	 * 4. if the server has less than the amount of ram and you can't afford it, insult the user and instruct them to contribute to capitalism
	 */

	while (checkServersMaxRamQueue.length > 0) {
		let checkServerMaxRam = checkServersMaxRamQueue.shift();
		ns.tprint(checkServerMaxRam + " has " + ns.getServerMaxRam(checkServerMaxRam) + " gigabizzles of ram");
		ns.tprint("the maximum ram to purchase is " + maxRamToBuy + " gigabizzles");
		ns.tprint("it will cost " + costOfMaxRamServer + " to upgrade");
		ns.tprint("you have " + ns.getServerMoneyAvailable("home"));

		if (ns.getServerMaxRam(checkServerMaxRam) < maxRamToBuy && ns.getServerMoneyAvailable("home") > costOfMaxRamServer) {
			ns.killall(checkServerMaxRam);
			ns.print("Killing Scripts");
            while (ns.getServerUsedRam(checkServerMaxRam) > 0) {
                await ns.sleep(200);
            }
            ns.print("Scripts Killed");

			ns.print("deleting server: " + checkServerMaxRam);
			ns.deleteServer(checkServerMaxRam);

			while (ns.serverExists(checkServerMaxRam)) {
				await ns.sleep(200);
			}

			ns.tprint("deleted server: " + checkServerMaxRam);
			ns.purchaseServer(hostname + number, maxRamToBuy);
			ns.tprint("bought a server: " + hostname + number + " : " + maxRamToBuy + " Gigabizzles");
			++number;
		}
		else if (ns.getServerMaxRam(checkServerMaxRam) < maxRamToBuy && ns.getServerMoneyAvailable("home") < costOfMaxRamServer) {
			ns.tprint("get a job you broke bitch!");
		}
		else {
			ns.tprint("something else happened");
		}
	}
}
