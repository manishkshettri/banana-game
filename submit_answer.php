<?php
session_start();
header('Content-Type: application/json');

// must be logged in
if (!isset($_SESSION['user'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$userAnswer = $_POST['answer'] ?? '';
$correct = $_SESSION['solution'] ?? null;

if ($correct === null) {
    echo json_encode(['error' => 'No puzzle loaded']);
    exit;
}

if ($userAnswer == $correct) {
    echo json_encode(['result' => 'correct']);
} else {
    echo json_encode([
        'result' => 'wrong',
        'correct' => $correct
    ]);
}

// clear solution to prevent reuse
unset($_SESSION['solution']);
