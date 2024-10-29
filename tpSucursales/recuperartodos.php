<?php 
  header("Access-Control-Allow-Origin: *"); 
  header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json');
  require("conexion.php");
 
  $con=retornarConexion();

  $registros=mysqli_query($con,"select codigo, descripcion, precio from articulos");
  if( $registros === false) {
				die( print_r( mysqli_error($con), true) );
  }
  $vec=[];  
  while ($reg=mysqli_fetch_array($registros))  
  {
    $vec[]=$reg;
	
//	while ($fila = mysqli_fetch_array ($stmt)) {
	//		$datos[] = $fila;
 }
  
 $cad=json_encode($vec);
 echo $cad;

?>