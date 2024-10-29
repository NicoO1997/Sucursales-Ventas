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

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['nombre']) || !isset($data['direccion']) || !isset($data['cantidadEmpleados'])) {
    http_response_code(400);
    echo json_encode(["error" => "Datos incompletos"]);
    exit;
}

$conn = db_connect();
mysqli_begin_transaction($conn);

try {
    // Primero, obtener el último ID de la tabla sucursales
    $getLastIdSQL = "SELECT MAX(ID_Suc) as last_id FROM sucursales";
    $result = mysqli_query($conn, $getLastIdSQL);
    $row = mysqli_fetch_assoc($result);
    $nextId = ($row['last_id'] === null) ? 1 : $row['last_id'] + 1;

    // Insertar nueva sucursal (sin especificar ID, usando AUTO_INCREMENT)
    $insertSQL = "INSERT INTO sucursales (Id_Suc, Nombre_Suc, Dir_Suc, Cant_Emp_Suc) VALUES (?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $insertSQL);
    mysqli_stmt_bind_param($stmt, "issi", 
        $nextId,
        $data['nombre'],
        $data['direccion'],
        $data['cantidadEmpleados']
    );

    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception("Error al crear sucursal: " . mysqli_error($conn));
    }

    // Usar el nextId calculado para crear el nombre de la columna
    $columnName = "Suc" . $nextId;
    
    // Agregar nueva columna a la tabla de ventas
    $alterTableSQL = "ALTER TABLE venta ADD COLUMN `$columnName` INT DEFAULT 0";
    if (!mysqli_query($conn, $alterTableSQL)) {
        throw new Exception("Error al agregar columna de ventas: " . mysqli_error($conn));
    }

    // Insertar 12 filas con valores aleatorios entre 5000 y 10000
    for ($i = 1; $i <= 12; $i++) {
        $randomValue = rand(5000, 10000);
        $updateSQL = "UPDATE venta SET `$columnName` = ? WHERE id = ?";
        $stmt = mysqli_prepare($conn, $updateSQL);
        mysqli_stmt_bind_param($stmt, "ii", $randomValue, $i);
        
        if (!mysqli_stmt_execute($stmt)) {
            throw new Exception("Error al insertar valores aleatorios: " . mysqli_error($conn));
        }
    }

    mysqli_commit($conn);
    echo json_encode([
        "message" => "Sucursal creada correctamente",
        "id" => $nextId
    ]);

} catch (Exception $e) {
    mysqli_rollback($conn);
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}

mysqli_close($conn);
?>