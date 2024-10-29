<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'conexion2.php';

// Obtener datos del body
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id']) || !isset($data['nombre']) || !isset($data['direccion']) || !isset($data['cantidadEmpleados'])) {
    http_response_code(400);
    echo json_encode(["error" => "Datos incompletos"]);
    exit;
}

$conn = db_connect();

$updateSQL = "UPDATE sucursales SET Nombre_Suc = ?, Dir_Suc = ?, Cant_Emp_Suc = ? WHERE Id_Suc = ?";
$stmt = mysqli_prepare($conn, $updateSQL);
mysqli_stmt_bind_param($stmt, "ssii", 
    $data['nombre'],
    $data['direccion'],
    $data['cantidadEmpleados'],
    $data['id']
);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["message" => "Sucursal actualizada correctamente"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error al actualizar sucursal: " . mysqli_error($conn)]);
}

mysqli_close($conn);
?>