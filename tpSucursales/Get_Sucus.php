<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

include 'conexion2.php';

$Row = consultaSQL("Nombre_Suc", "sucursales", "");

if ($Row === false || empty($Row)) {
    echo json_encode(["error" => "No se encontraron sucursales."]);
    exit;
}

// Extraer solo los nombres de las sucursales
$sucursales = array_map(function($row) {
    return $row['Nombre_Suc'];
}, $Row);

// Asegurarse de que no haya salida antes del JSON
ob_clean(); // Limpia cualquier salida anterior
echo json_encode($sucursales);
exit;