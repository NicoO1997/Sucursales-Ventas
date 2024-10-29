<?php 
session_start(); 
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');
  // llamo al archivo para conectarme a la db
  include 'conexion2.php';
  //Asigno a $Row los valores obtenido en la consulta SQL

//Get_Clientes()
 $Row = consultaSQL("Apellido,Nombre,Saldo,Status","Clientes","");

 if ($Row === false || empty($Row)) {
  echo json_encode(["error" => "No se encontraron sucursales."]);
  exit;
}

 $clientes = array_map(function($row) {
  return array(
      "Apellido" => $row['Apellido'],
      "Nombre" => $row['Nombre'],
      "Saldo" => $row['Saldo'],
      "Status" => $row['Status']
  );
}, $Row);

// Asegurarse de que no haya salida antes del JSON
ob_clean(); // Limpia cualquier salida anterior
echo json_encode($clientes);
exit;
?>
