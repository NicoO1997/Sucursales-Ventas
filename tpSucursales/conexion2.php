

<?php
//<!-- EN ESTE ARCHIVO SE ENCUENTRA LA CONEXION A LA BASE DE DATOS Y LA CONSULTA SELECT -->

//DB USer id19746472_pruebassql
//DB: id19746472_sucursales
//Key:  DQLtesting9-

function db_connect() {
	//Nombre de usuario
	$mysql_username="root";
	//Contraseña 
	$mysql_password="";
	//Nombre del servidor, si es local usar localhost
	$server_name="localhost";
	//Nombre de la bd
	$basededatos ="prog2";
	/*
	Verifica el usuario y la contraseña
	Es posible que este error no salte correctamente en mysql y que aparezca como [caching_sha2_password], si esto llega a suceder, la forma
	más sencilla de arreglarlo es ir a MySQL y ejecutar el siguiente código:
	CREATE USER 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
	GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' WITH GRANT OPTION;
	cambiar el 'user' por el nuevo nombre de usuario, lo mismo con 'password'. Usar esos nuevos datos creados para conectar con la bd.
	*/
	$conn = mysqli_connect( $server_name, $mysql_username, $mysql_password) or die ("No se ha podido conectar al servidor de Base de datos");

	//Verifica la bd
	$db = mysqli_select_db( $conn, $basededatos) or die ( "No se ha podidio conectar con la base de datos ' $basededatos '" );

	//Retorna la conexion con la bd
	return $conn;
}

//Crea la consulta SQL
function consultaSQL($parametro1, $parametro2, $parametro3) {
    $conn = db_connect();
    $campos = $parametro1;
    $tabla = $parametro2;
    $condicion = $parametro3;

    if ($condicion == "") {
        $sql = "SELECT $campos FROM $tabla";
    } else {
        $sql = "SELECT $campos FROM $tabla WHERE $condicion";
    }

    $stmt = mysqli_query($conn, $sql);
    if ($stmt === false) {
        die(print_r(mysqli_error($conn), true));
    }

    $datos = array();
    // Cambiar MYSQLI_BOTH por MYSQLI_ASSOC para solo obtener nombres de columnas
    while ($fila = mysqli_fetch_array($stmt, MYSQLI_ASSOC)) {
        $datos[] = $fila;
    }

    mysqli_close($conn);
    return $datos;
}
?>
