<?php
session_start();
header('Content-Type: application/json');
require 'db.php';

if (!isset($_SESSION['user']) || !isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$userAnswer = trim($_POST['answer'] ?? '');
$correct = $_SESSION['solution'] ?? null;

if ($correct === null) {
    echo json_encode(['error' => 'No puzzle loaded']);
    exit;
}

/* -------------------------------------------------------
   CASE 1 — TIMEOUT (client sends "__TIMEOUT__")
------------------------------------------------------- */
if ($userAnswer === "__TIMEOUT__") {
    goto GAME_OVER;
}

/* -------------------------------------------------------
   CASE 2 — CORRECT ANSWER
------------------------------------------------------- */
if ($userAnswer == $correct) {

    $_SESSION['score'] = ($_SESSION['score'] ?? 0) + 10;
    $newScore = $_SESSION['score'];

    unset($_SESSION['solution']);

    $apiUrl = "https://marcconrad.com/uob/banana/api.php";
    $response = @file_get_contents($apiUrl);

    if ($response === FALSE) {
        echo json_encode([
            'result' => 'correct',
            'score' => $newScore,
            'next_question' => null
        ]);
        exit;
    }

    $data = json_decode($response, true);
    $_SESSION['solution'] = $data['solution'];

    echo json_encode([
        'result' => 'correct',
        'score' => $newScore,
        'next_question' => $data['question']
    ]);
    exit;
}

/* -------------------------------------------------------
   CASE 3 — WRONG ANSWER → GAME OVER
------------------------------------------------------- */
GAME_OVER:

$finalScore = $_SESSION['score'] ?? 0;
$userId = (int)$_SESSION['user_id'];

try {
    $stmt = $pdo->prepare("INSERT INTO games (user_id, score) VALUES (?, ?)");
    $stmt->execute([$userId, $finalScore]);
} catch (Exception $e) {}

try {
    $stmt = $pdo->prepare("SELECT highscore FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $currentHigh = (int)($row['highscore'] ?? 0);
    $isNewHigh = false;

    if ($finalScore > $currentHigh) {
        $stmt = $pdo->prepare("UPDATE users SET highscore = ? WHERE id = ?");
        $stmt->execute([$finalScore, $userId]);
        $isNewHigh = true;
    }
} catch (Exception $e) {}

try {
    $stmt = $pdo->query("SELECT username, highscore FROM users ORDER BY highscore DESC, created_at ASC LIMIT 5");
    $leaders = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (Exception $e) {
    $leaders = [];
}

unset($_SESSION['solution']);

echo json_encode([
    'result' => 'wrong',
    'finalScore' => $finalScore,
    'isNewHigh' => $isNewHigh,
    'leaders' => $leaders
]);
exit;
