<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medicine Management</title>
    <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
    <script defer src="app.js"></script>
</head>
<body>
    <h1>Medicine Management</h1>

    <h2>Add Medicine</h2>
    <form id="addMedicineForm">
        <input type="text" id="batchID" placeholder="Batch ID" required>
        <input type="text" id="medicineName" placeholder="Medicine Name" required>
        <input type="text" id="manufacturer" placeholder="Manufacturer" required>
        <input type="number" id="productionDate" placeholder="Production Date (timestamp)" required>
        <input type="number" id="expiryDate" placeholder="Expiry Date (timestamp)" required>
        <button type="submit">Add Medicine</button>
    </form>

    <h2>Get Medicine</h2>
    <input type="text" id="getBatchID" placeholder="Batch ID">
    <button id="getMedicineButton">Get Medicine</button>
    <div id="medicineDetails"></div>

    <h2>List All Medicines</h2>
    <button id="listMedicinesButton">List Medicines</button>
    <div id="medicinesList"></div>
</body>
</html>
