<?php
session_start();
header('Content-Type: application/json');

// Only allow logged-in users
if (!isset($_SESSION['user'])) {
    echo json_encode(['error' => 'Unauthorized access']);
    exit;
}

// Fetch puzzle from external Banana API
$apiUrl = "https://marcconrad.com/uob/banana/api.php";
$response = @file_get_contents($apiUrl);

if ($response === FALSE) {
    echo json_encode(['error' => 'Failed to fetch puzzle']);
    exit;
}

// Return puzzle JSON to JS
echo $response;
?>
