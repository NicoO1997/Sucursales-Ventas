<?php 
session_start(); 
?> 

<!DOCTYPE html>
<html lang="es">
    <head>
       
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>PROGRAMACION 2</title>
  
    </head>
    <body >
<table style:"background-color:Red;">
    <tr>
        <td colspan="2" style="text-align:center;">
<h2>Bases de Datos</h2>
</td>
</tr>
<tr>
<td style: "vertical-align: top;background-color:DodgerBlue;">
<ul>
    <li><h4>Meses</h4>
    <ul>
        <li>Nro: 1,2 ...12</li>
        <li>Mes: Enero, Febrero ... Diciembre</li>
        <li>CDias: 31, 28, ... 31</li>
    </ul>
    </li>
    <li><h4>Sucursales</h4>
    <ul>
        <li> Id_Suc: 1, 2, ....</li>
        <li>Nombre_Suc: Santa Fe, Rosario ....</li>
        <li>Dir_Suc: San Martin 1111, Belgrano 222, ....</li>
        <li>Cant_Emp_Suc: 10, 20, ...</li>
      
        
    </ul>
</ul>
    </td>    
<td style: "vertical-align: bottom;">
<ul>
    <li><h4>Clientes</h4>
    <ul>
        <li>Apellido: Aguirre, Bianchi ...</li>
        <li> Nombre: Nicolas, German, ...</li>
        <li> Saldo: 10000, 23000, ...</li>
        <li> Status: 1, 0 , 1, ...</li>
    </ul></li>
    <li><h4>Venta</h4>
    <ul>
        
        <li>Suc1: 20000, 8787, ..(12)..</li>
        <li>Suc2: 20000, 8787, ..(12)..</li>
        <li>Suc3: 20000, 8787, ..(12)..</li>
        <li>Suc4: 20000, 8787, ..(12)..</li>
        <li>Suc5: 20000, 8787, ..(12)..</li>
        
    </ul></li>
    
    
</ul>
        </td>
    </tr>
</table>

<h2>Servicios Disponibles</h2>

<ul>
<?php
	  // llamo al archivo para conectarme a la db
	  include 'conexion2.php';
	  //Asigno a $Row los valores obtenido en la consulta SQL
 //Get_Meses()
	 $Row = consultaSQL("Nro,Mes,CDias","Meses","");
	 $meses = array(array());
	 for($m = 0; $m < count($Row); $m++) {
		 for ($s=0; $s<3;$s++){
			$meses[$m][$s] = $Row[$m][$s];
			 }
	 }
	 
	 echo '<li><h4>Get_meses: <a href="Get_Meses.php" target="_blank"><button>Probar</button></a></h4><br>';
?>
<pre style="color:Blue;border-width:1px;border-style:solid;width:800px;">&lt?php 
session_start(); 
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

// llamo al archivo para conectarme a la db
include 'conexion2.php';
//Asigno a $Row los valores obtenido en la consulta SQL
//Get_Meses()
 $Row = consultaSQL("Nro,Mes,CDias","Meses","");
 echo json_encode ($Row);
?&gt
</pre>

<?PHP

echo json_encode ($Row). "</li>";

 //Get_Sucus()
     $Row = consultaSQL("Id_Suc,Nombre_Suc,Dir_Suc,Cant_Emp_Suc","Sucursales","");

	 $sucus = array(array());
	 for($m = 0; $m < count($Row); $m++) {
		 for ($s=0; $s<4;$s++){
			$sucus[$m][$s] = $Row[$m][$s];
			 }
	 }

	 echo '<li><h4> Get_Sucus: <a href="Get_Sucus.php" target="_blank"><button>Probar</button></a></h4>' ;
?>

<pre style="color:Blue;border-width:1px;border-style:solid;width:800px">&lt?php
session_start(); 
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

// llamo al archivo para conectarme a la db
  include 'conexion2.php';
//Asigno a $Row los valores obtenido en la consulta SQL
//Get_Sucus()
 $Row = consultaSQL("Id_Suc,Nombre_Suc,Dir_Suc,Cant_Emp_Suc","Sucursales","");
 echo json_encode ($Row);
?&gt
</pre>

<?PHP	 
echo json_encode ($Row). "</li>";
//Get_Clientes()
     $Row = consultaSQL("Apellido,Nombre,Saldo,Status","Clientes","");

	 $cli = array(array());
	 for($m = 0; $m < count($Row); $m++) {
		 for ($s=0; $s<4;$s++){
			$cli[$m][$s] = $Row[$m][$s];
					 }
	 }
	 
	 echo '<li> <h4>Get_Clientes: <a href="Get_Clientes.php" target="_blank"><button>Probar</button></a></h4>';
	 ?>
	 
<pre style="color:Blue;border-width:1px;border-style:solid;width:800px">&lt?php
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
echo json_encode ($Row);
&gt?PHP
</pre>	 

<?PHP
echo json_encode ($Row). "</li>";
	 
//Get_Ventas()
     $Row = consultaSQL("Suc1,Suc2,Suc3,Suc4,Suc5","Venta","");

	 $vta = array(array());
	 for($m = 0; $m < count($Row); $m++) {
		 for ($s=0; $s<5;$s++){
			$vta[$m][$s] = $Row[$m][$s];
			//echo "\n<br>Mes: ". $m. "suc:". $s. ": ".$vta[$m][$s];
		 }
	 }
	 
	 echo '<li> <h4>Get_Ventas: <a href="Get_Ventas.php" target="_blank"><button>Probar</button></a></h4>'; 
?>
<pre style="color:Blue;border-width:1px;border-style:solid;width:800px">&lt?php
session_start(); 
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

// llamo al archivo para conectarme a la db
include 'conexion2.php';
//Asigno a $Row los valores obtenido en la consulta SQL

//Get_Ventas()
$Row = consultaSQL("Suc1,Suc2,Suc3,Suc4,Suc5","Venta","");

echo json_encode ($Row);
</pre>	 

<?PHP

echo json_encode ($Row). "</li>";

//			 fwrite(fopen("newfile.txt", "w"),"vtas" . count($vta) .json_encode($vta). "\n" );

	/* Envío Un Script al HTML con los datos en una matriz Venta 
	 echo "\n \n <hr>";
	 echo "\n \n <Script> \n ";
	 echo "const ventas = [";
	 for ($i = 0; $i < count($Row)-1; $i++) {
		echo "[".$Row [$i][0]. ", ".$Row [$i][1]. ",".$Row [$i][2]. ",".$Row [$i][3]. ",".$Row [$i][4]. "],";  
	     }
 
	echo "[".$Row [$i][0]. ", ".$Row [$i][1]. ",".$Row [$i][2]. ",".$Row [$i][3] .",".$Row [$i][4]."]];";  
	//echo "alert (ventas);"; 
	 echo "\n </script> <br>";
	*/
?>
</ul>

                    


     


    </body>
</html>