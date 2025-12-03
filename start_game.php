<?php
// start_game.php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user'])) {
    echo json_encode(['status'=>'fail','message'=>'Not logged in']);
    exit;
}
$_SESSION['score'] = 0;
unset($_SESSION['solution']);
echo json_encode(['status'=>'success','score'=>0]);
