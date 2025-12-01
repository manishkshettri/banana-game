<?php
session_start();
header('Content-Type: application/json');

// must be logged in
if (!isset($_SESSION['user'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$apiUrl = "https://marcconrad.com/uob/banana/api.php";
$response = @file_get_contents($apiUrl);

if ($response === FALSE) {
    echo json_encode(['error' => 'API error']);
    exit;
}

$data = json_decode($response, true);

// store solution server-side only
$_SESSION['solution'] = $data['solution'];

// send only question (image) to client
echo json_encode([
    'question' => $data['question']
]);
