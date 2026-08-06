<?php
/**
 * Entry point for PHP REST API
 */

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=utf-8");

// Handle OPTIONS preflight early
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Load Configuration
$config = require __DIR__ . '/config/config.php';

// Instantiate Router & Dispatch Request
require_once __DIR__ . '/src/Router.php';

$router = new Router($config);
$router->handleRequest();
