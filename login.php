<?php
// login.php
session_start();
header('Content-Type: application/json');
require 'db.php';

$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';

if (!$username || !$password) {
    echo json_encode(['status'=>'fail','message'=>'Missing fields']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id, password_hash, highscore FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user['password_hash'])) {
        echo json_encode(['status'=>'fail','message'=>'Invalid credentials']);
        exit;
    }

    // set session
    $_SESSION['user'] = $username;
    $_SESSION['user_id'] = (int)$user['id'];
    $_SESSION['score'] = 0;
    // optionally store highscore
    $_SESSION['highscore'] = (int)$user['highscore'];

    echo json_encode(['status'=>'success','user'=>$username,'highscore'=>$_SESSION['highscore']]);
} catch (Exception $e) {
    echo json_encode(['status'=>'fail','message'=>'Server error']);
}
