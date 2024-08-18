const contractABI = [
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
				"name": "recordID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "patientName",
				"type": "string"
			}
		],
		"name": "PatientRecordAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_recordID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_patientName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_diagnosis",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_treatment",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_date",
				"type": "uint256"
			}
		],
		"name": "addPatientRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_recordID",
				"type": "string"
			}
		],
		"name": "getPatientRecord",
		"outputs": [
			{
				"internalType": "string",
				"name": "patientName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "diagnosis",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "treatment",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "listAllPatients",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "recordID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "patientName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "diagnosis",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "treatment",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					}
				],
				"internalType": "struct Patient.PatientRecord[]",
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
				"name": "_recordID",
				"type": "string"
			}
		],
		"name": "verifyPatientRecord",
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
const contractAddress = '0x409FE3D7F71C64871f18E8acb50790B38802Fbad';

let web3;
let patientContract;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            patientContract = new web3.eth.Contract(contractABI, contractAddress);
            initializeEventListeners();
        } catch (error) {
            console.error("User denied account access", error);
            alert('Please allow access to MetaMask.');
        }
    } else {
        alert('MetaMask is not installed!');
    }
});

function initializeEventListeners() {
    const addPatientForm = document.getElementById('addPatientForm');
    const getPatientButton = document.getElementById('getPatientButton');
    const listPatientsButton = document.getElementById('listPatientsButton');

    // Debugging logs
    console.log('addPatientForm:', addPatientForm);
    console.log('getPatientButton:', getPatientButton);
    console.log('listPatientsButton:', listPatientsButton);

    if (addPatientForm) {
        addPatientForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const recordID = document.getElementById('recordID').value;
            const patientName = document.getElementById('patientName').value;
            const diagnosis = document.getElementById('diagnosis').value;
            const treatment = document.getElementById('treatment').value;
            const date = document.getElementById('date').value;

            try {
                const accounts = await web3.eth.getAccounts();
                await patientContract.methods.addPatientRecord(
                    recordID,
                    patientName,
                    diagnosis,
                    treatment,
                    date
                ).send({ from: accounts[0] });
                alert('Patient record added successfully');
            } catch (error) {
                console.error('Error adding patient record:', error);
                alert('Failed to add patient record');
            }
        });
    } else {
        console.error('Form element not found');
    }

    if (getPatientButton) {
        getPatientButton.addEventListener('click', async () => {
            const recordID = document.getElementById('getRecordID').value;

            try {
                const result = await patientContract.methods.getPatientRecord(recordID).call();
                document.getElementById('patientDetails').innerText = `
                    Name: ${result[0]}
                    Diagnosis: ${result[1]}
                    Treatment: ${result[2]}
                    Date: ${result[3]}
                `;
            } catch (error) {
                console.error('Error getting patient record:', error);
                document.getElementById('patientDetails').innerText = 'Failed to get patient record';
            }
        });
    } else {
        console.error('Get Patient button not found');
    }

    if (listPatientsButton) {
        listPatientsButton.addEventListener('click', async () => {
            try {
                const result = await patientContract.methods.listAllPatients().call();
                const patientsList = result.map(record => `
                        Record ID: ${record.recordID}<br>
                        Name: ${record.patientName}<br>
                        Diagnosis: ${record.diagnosis}<br>
                        Treatment: ${record.treatment}<br>
                        Date: ${record.date}<br><br>  
                `).join('');
                document.getElementById('patientsList').innerHTML = patientsList;
            } catch (error) {
                console.error('Error listing patients:', error);
                document.getElementById('patientsList').innerText = 'Failed to list patients';
            }
        });
    } else {
        console.error('List Patients button not found');
    }
}