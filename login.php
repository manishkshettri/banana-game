<?php
session_start();
header('Content-Type: application/json');

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if ($username === 'admin' && $password === 'admin') {
    $_SESSION['user'] = $username;
    echo json_encode(['status' => 'success', 'user' => $username]);
} else {
    echo json_encode(['status' => 'fail']);
}
?>
