<?php
// db.php
$DB_HOST = '127.0.0.1';
$DB_NAME = 'banana_game';
$DB_USER = 'root';
$DB_PASS = ''; // change if needed

try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4", $DB_USER, $DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'DB connection failed']);
    exit;
}
