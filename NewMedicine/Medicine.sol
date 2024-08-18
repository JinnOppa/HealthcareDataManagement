// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Medicine {
    address public owner;

    struct MedicineDetails {
        string batchID;
        string medicineName;
        string manufacturer;
        uint256 productionDate;
        uint256 expiryDate;
    }

    mapping(string => MedicineDetails) private medicines;
    string[] private batchIDs;

    event MedicineAdded(string batchID, string medicineName, string manufacturer);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addMedicine(
        string memory _batchID,
        string memory _medicineName,
        string memory _manufacturer,
        uint256 _productionDate,
        uint256 _expiryDate
    ) public onlyOwner {
        require(bytes(_batchID).length > 0, "Batch ID is required");
        require(bytes(_medicineName).length > 0, "Medicine name is required");
        require(bytes(_manufacturer).length > 0, "Manufacturer is required");

        medicines[_batchID] = MedicineDetails(
            _batchID,
            _medicineName,
            _manufacturer,
            _productionDate,
            _expiryDate
        );
        
        batchIDs.push(_batchID);

        emit MedicineAdded(_batchID, _medicineName, _manufacturer);
    }

    function getMedicine(string memory _batchID) public view returns (
        string memory medicineName,
        string memory manufacturer,
        uint256 productionDate,
        uint256 expiryDate
    ) {
        MedicineDetails memory med = medicines[_batchID];
        require(bytes(med.batchID).length > 0, "Medicine not found");

        return (
            med.medicineName,
            med.manufacturer,
            med.productionDate,
            med.expiryDate
        );
    }

    // Additional functionality to address public goods problem

    function verifyMedicineAuthenticity(string memory _batchID) public view returns (bool) {
        MedicineDetails memory med = medicines[_batchID];
        return bytes(med.batchID).length > 0;
    }

    function listAllMedicines() public view returns (MedicineDetails[] memory) {
        uint256 count = batchIDs.length;
        MedicineDetails[] memory allMedicines = new MedicineDetails[](count);

        for (uint256 i = 0; i < count; i++) {
            string memory batchID = batchIDs[i];
            allMedicines[i] = medicines[batchID];
        }

        return allMedicines;
    }
}
