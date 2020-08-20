let dapp;
const CONTRACT_ADDRESS = "0xfD12Bf718C06E3C065553b887F9496dc2014c595";
const CONTRACT_ABI = '[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"s","type":"string"}],"name":"NouveauFichier","type":"event"},{"constant":false,"inputs":[{"internalType":"string","name":"s","type":"string"}],"name":"payerStockage","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getNombreFichiers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"ind","type":"uint256"}],"name":"recuperer","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]';

async function createMetaMaskDapp() {
	try {
		const addresses = await ethereum.enable();
		const address = addresses[0];
		const provider = new ethers.providers.Web3Provider(ethereum);
		let contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider.getSigner(0));
		dapp = { address, provider, contract };
	} catch (err) {
		console.error(err);
	}
}

async function payerEpinglage(hash) {
	if (typeof dapp === "undefined") { await createMetaMaskDapp(); }
	let contrat = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, dapp.provider.getSigner());
	let nmb = await contrat.getNombreFichiers();
	let overrides = {
 	   value: ethers.utils.parseEther("0.1")
	};
	let tx = await contrat.payerStockage(hash, overrides); 
}

async function nouveauFichier() {
	if (typeof dapp === "undefined") { await createMetaMaskDapp(); }
	dapp.contract.on("NouveauFichier", function(str) {
		$.ajax({
			url : "/getSource",
			type : "get",
			data : {
				hash : str
			},
			success: function(response) {
				let lien = document.createElement("a");
				lien.innerHTML = '<a href="'+response+'" download> <img src="file.png" alt="file" width="70" height="90"> </a>'
				let fichiers = document.getElementById("fichiers");
				fichiers.appendChild(lien);
			},
			error: function(xhr) {}
		})
	
	})
}
nouveauFichier();
