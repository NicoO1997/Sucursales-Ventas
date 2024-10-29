<?php
// DeleteSucursal.php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

// Manejar la solicitud OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'conexion2.php';

// Obtener ID de la URL
$id = isset($_GET['id']) ? $_GET['id'] : null;

if (!$id) {
    http_response_code(400);
    echo json_encode(["error" => "ID no proporcionado"]);
    exit;
}

$conn = db_connect();
mysqli_begin_transaction($conn);

try {
    // Eliminar la columna de la tabla venta
    $columnName = "Suc" . $id;
    $alterTableSQL = "ALTER TABLE venta DROP COLUMN $columnName";
    if (!mysqli_query($conn, $alterTableSQL)) {
        throw new Exception("Error al eliminar columna de ventas: " . mysqli_error($conn));
    }

    // Eliminar la sucursal
    $sql = "DELETE FROM sucursales WHERE Id_Suc = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "i", $id);
    
    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception("Error al eliminar sucursal: " . mysqli_error($conn));
    }

    mysqli_commit($conn);
    echo json_encode(["message" => "Sucursal eliminada correctamente"]);

} catch (Exception $e) {
    mysqli_rollback($conn);
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}

mysqli_close($conn);
?>