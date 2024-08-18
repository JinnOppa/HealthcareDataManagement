// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Patient {
    struct PatientRecord {
        string recordID;
        string patientName;
        string diagnosis;
        string treatment;
        uint256 date;
    }
    
    mapping(string => PatientRecord) public patientRecords;

    function addPatientRecord(
        string memory _recordID,
        string memory _patientName,
        string memory _diagnosis,
        string memory _treatment,
        uint256 _date
    ) public {
        patientRecords[_recordID] = PatientRecord(
            _recordID,
            _patientName,
            _diagnosis,
            _treatment,
            _date
        );
    }

    function getPatientRecord(string memory _recordID) public view returns (
        string memory patientName,
        string memory diagnosis,
        string memory treatment,
        uint256 date
    ) {
        PatientRecord memory record = patientRecords[_recordID];
        return (
            record.patientName,
            record.diagnosis,
            record.treatment,
            record.date
  );
}
}
