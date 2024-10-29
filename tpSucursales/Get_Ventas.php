<?php
// Get_Ventas.php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

include 'conexion2.php';

$conn = db_connect();

// Obtener todas las columnas de la tabla 'Venta' excepto 'id'
$columnsQuery = "SHOW COLUMNS FROM Venta";
$result = mysqli_query($conn, $columnsQuery);

$columns = [];
while ($column = mysqli_fetch_assoc($result)) {
    if ($column['Field'] !== 'id') { // Excluir la columna 'id'
        $columns[] = $column['Field'];
    }
}

// Unir las columnas en una cadena para la consulta SQL
$columnsList = implode(", ", $columns);

// Ejecutar la consulta usando la función consultaSQL
$Row = consultaSQL($columnsList, "Venta", "");

if ($Row === false || empty($Row)) {
    echo json_encode(["error" => "No se encontraron ventas."]);
    exit;
}

// Procesar los datos para asegurar formato numérico
$processedData = array();
foreach ($Row as $row) {
    $processedRow = array();
    foreach ($row as $key => $value) {
        $processedRow[$key] = floatval($value);
    }
    $processedData[] = $processedRow;
}

mysqli_close($conn);

ob_clean(); // Limpia cualquier salida anterior
echo json_encode($processedData);
?>
