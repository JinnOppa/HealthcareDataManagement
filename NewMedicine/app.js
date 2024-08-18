// Define the contract ABI and address
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_batchID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_medicineName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_manufacturer",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_productionDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_expiryDate",
				"type": "uint256"
			}
		],
		"name": "addMedicine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "batchID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "medicineName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "manufacturer",
				"type": "string"
			}
		],
		"name": "MedicineAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_batchID",
				"type": "string"
			}
		],
		"name": "getMedicine",
		"outputs": [
			{
				"internalType": "string",
				"name": "medicineName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "manufacturer",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "productionDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expiryDate",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "listAllMedicines",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "batchID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "medicineName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "manufacturer",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "productionDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expiryDate",
						"type": "uint256"
					}
				],
				"internalType": "struct Medicine.MedicineDetails[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_batchID",
				"type": "string"
			}
		],
		"name": "verifyMedicineAuthenticity",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = '0xF323F37F6d64F972175677D8dC2A7eBa625cc312'; // Replace with your deployed contract address

let web3;
let medicineContract;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            medicineContract = new web3.eth.Contract(contractABI, contractAddress);
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        alert('MetaMask is not installed!');
    }

    document.getElementById('addMedicineForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const batchID = document.getElementById('batchID').value;
        const medicineName = document.getElementById('medicineName').value;
        const manufacturer = document.getElementById('manufacturer').value;
        const productionDate = document.getElementById('productionDate').value;
        const expiryDate = document.getElementById('expiryDate').value;

        const accounts = await web3.eth.getAccounts();
        try {
            await medicineContract.methods.addMedicine(
                batchID, 
                medicineName, 
                manufacturer, 
                productionDate, 
                expiryDate
            ).send({ from: accounts[0] });
            alert('Medicine added successfully');
        } catch (error) {
            console.error('Error adding medicine:', error);
            alert('Failed to add medicine');
        }
    });

    document.getElementById('getMedicineButton').addEventListener('click', async () => {
        const batchID = document.getElementById('getBatchID').value;
        try {
            const result = await medicineContract.methods.getMedicine(batchID).call();
            document.getElementById('medicineDetails').innerText = `
                Name: ${result[0]}
                Manufacturer: ${result[1]}
                Production Date: ${result[2]}
                Expiry Date: ${result[3]}
            `;
        } catch (error) {
            console.error('Error getting medicine details:', error);
            alert('Failed to get medicine details');
        }
    });

    document.getElementById('listMedicinesButton').addEventListener('click', async () => {
        try {
            const result = await medicineContract.methods.listAllMedicines().call();
            const medicinesList = result.map(med => `
                Batch ID: ${med.batchID} <br>
                Name: ${med.medicineName} <br>
                Manufacturer: ${med.manufacturer} <br>
                Production Date: ${med.productionDate} <br>
                Expiry Date: ${med.expiryDate} <br><br>
            `).join('');
            document.getElementById('medicinesList').innerHTML = medicinesList;
        } catch (error) {
            console.error('Error listing medicines:', error);
            alert('Failed to list medicines');
        }
    });
});