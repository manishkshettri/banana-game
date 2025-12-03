<?php
// get_puzzle.php
session_start();
header('Content-Type: application/json');

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
if (!isset($data['question']) || !isset($data['solution'])) {
    echo json_encode(['error' => 'Bad API data']);
    exit;
}

// store correct answer server-side
$_SESSION['solution'] = $data['solution'];

// send only question to client
echo json_encode(['question' => $data['question']]);
