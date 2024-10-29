<?php
// actualizar_venta.php

// Permitir solicitudes CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Manejar la solicitud OPTIONS (pre-flight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Incluir el archivo de conexión
include 'conexion2.php';

// Verificar que sea una solicitud POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

try {
    // Obtener el cuerpo de la solicitud JSON
    $datos = json_decode(file_get_contents('php://input'), true);

    // Validar que todos los campos necesarios estén presentes
    if (!isset($datos['id']) || !isset($datos['sucursal']) || !isset($datos['valor'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Faltan datos requeridos']);
        exit();
    }

    // Validar y sanitizar los datos
    $id = filter_var($datos['id'], FILTER_VALIDATE_INT);
    $sucursal = filter_var($datos['sucursal'], FILTER_SANITIZE_STRING);
    $valor = filter_var($datos['valor'], FILTER_VALIDATE_FLOAT);

    if ($id === false || $valor === false) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos inválidos']);
        exit();
    }

    // Obtener la conexión
    $conn = db_connect();

    // Preparar la consulta SQL
    $sql = "UPDATE venta SET $sucursal = ? WHERE id = ?";
    $stmt = mysqli_prepare($conn, $sql);

    if ($stmt === false) {
        throw new Exception('Error al preparar la consulta: ' . mysqli_error($conn));
    }

    // Vincular los parámetros
    mysqli_stmt_bind_param($stmt, 'di', $valor, $id);

    // Ejecutar la consulta
    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception('Error al ejecutar la consulta: ' . mysqli_stmt_error($stmt));
    }

    // Verificar si se actualizó alguna fila
    if (mysqli_stmt_affected_rows($stmt) === 0) {
        http_response_code(404);
        echo json_encode(['error' => 'No se encontró el registro para actualizar']);
    } else {
        echo json_encode([
            'success' => true,
            'message' => 'Venta actualizada correctamente',
            'affected_rows' => mysqli_stmt_affected_rows($stmt)
        ]);
    }

    // Cerrar el statement
    mysqli_stmt_close($stmt);
    
    // Cerrar la conexión
    mysqli_close($conn);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error en el servidor',
        'message' => $e->getMessage()
    ]);
}
?>