<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

// Asegúrate de que no haya salidas antes de este punto
include 'conexion2.php';

$Row = consultaSQL("Mes", "meses", "");

if ($Row === false || empty($Row)) {
    echo json_encode(["error" => "No se encontraron meses."]);
    exit;
}

// Extraer solo los nombres de los meses
$meses = array_map(function($row) {
    return $row['Mes'];
}, $Row);

// Asegúrate de que no haya espacios ni saltos de línea antes o después del JSON

ob_clean(); // Limpia cualquier salida anterior
echo json_encode($meses);
exit;
