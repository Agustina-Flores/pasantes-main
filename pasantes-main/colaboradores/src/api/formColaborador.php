<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: *");
ob_clean(); 

 
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}
 
$serverName = "DESKTOP-ILGS57R";
$connectionOptions = array(
    "Database" => "Inventario",
    "UID" => "ejemplo",
    "PWD" => "1234",
    "CharacterSet" => "UTF-8"
);

$conn = sqlsrv_connect($serverName, $connectionOptions);
if (!$conn) {
    die(json_encode(["error" => "Error de conexión a la base de datos", "details" => sqlsrv_errors()]));
}

 

$dni = $_POST["dni"] ?? null;
$contrasenia = $_POST["contrasenia"] ?? null;
$email = $_POST["email"] ?? null;
$nombre = $_POST["nombre"] ?? null;
$apellido = $_POST["apellido"] ?? null;
$celular = $_POST["celular"] ?? null;
$linkedin = $_POST["linkedin"] ?? null; 
$razonSocial = $_POST["razonSocial"] ?? null;
$condicionIVA = $_POST["condicionIVA"] ?? null;
$cuit = $_POST["cuit"] ?? null;
$experienciaLaboral = $_POST["experienciaLaboral"] ?? null;
$educacion = $_POST["educacion"] ?? null;
$cursos = $_POST["cursos"] ?? null;
$presentacion = $_POST["presentacion"] ?? null;
$conocimientos = $_POST["conocimientos"] ?? null;
$provincia = $_POST["provincia"] ?? null;
$domicilio = $_POST["domicilio"] ?? null;
$tarifaHora = $_POST["tarifaHora"] ?? null;
$disponibilidad = $_POST["disponibilidad"] ?? null;
$aceptarPoliticas = isset($_POST["aceptarPoliticas"]) ? (int)$_POST["aceptarPoliticas"] : 0;

 
$idioma = !empty($_POST["idioma"]) ? implode(", ", (array)$_POST["idioma"]) : null;
$area = !empty($_POST["area"]) ? implode(", ", (array)$_POST["area"]) : null;
$pais = !empty($_POST["pais"]) ? implode(", ", (array)$_POST["pais"]) : null;


if (
    empty($dni) || empty($contrasenia) || empty($email) || empty($nombre) || empty($apellido) || empty($celular) ||
    empty($razonSocial) || empty($condicionIVA) || empty($cuit) || empty($presentacion) ||
    empty($idioma) || empty($tarifaHora) || empty($disponibilidad)
) {
    echo json_encode(["error" => "Faltan datos obligatorios"]);
    exit();
}


$fotoPerfil = null;
if (isset($_FILES["fotoPerfil"]) && $_FILES["fotoPerfil"]["error"] === UPLOAD_ERR_OK) {
    $foto = $_FILES["fotoPerfil"];

    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!in_array($foto["type"], $allowedTypes)) {
        echo json_encode(["error" => "Archivo no permitido"]);
        exit();
    }

    $uploadDir = __DIR__ . '/public/descargas/fotos_perfil/';

 
    if (!is_writable($uploadDir)) {
        error_log("Permiso denegado en: " . realpath($uploadDir));
        echo json_encode(["error" => "La carpeta no tiene permisos de escritura"]);
        exit();
    }

    $fileName = uniqid('foto_', true) . '.' . pathinfo($foto['name'], PATHINFO_EXTENSION);
    $filePath = $uploadDir . $fileName;

    if (!move_uploaded_file($foto['tmp_name'], $filePath)) {
        echo json_encode(["error" => "Error al mover el archivo al directorio "]);
        exit();
    }

    if (!file_exists($filePath)) {
        echo json_encode(["error" => "El archivo no se encuentra en la carpeta"]);
        exit();
    }

     
    $fotoPerfil = "public/descargas/fotos_perfil/" . $fileName;
}
 
$cv = null;
$cvRuta = null; 

if (isset($_FILES["cv"]) && $_FILES["cv"]["error"] === UPLOAD_ERR_OK) {
    $cv = $_FILES["cv"];
 
    if (!isset($cv["tmp_name"]) || empty($cv["tmp_name"])) {
        echo json_encode(["error" => "No se recibió correctamente el archivo"]);
        exit();
    }
 
    $allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!in_array($cv["type"], $allowedTypes)) {
        echo json_encode(["error" => "Tipo de archivo no permitido"]);
        exit();
    }
 
    $uploadDir = __DIR__ . '/public/descargas/cv/';
    if (!is_dir($uploadDir) && !mkdir($uploadDir, 0777, true)) {
        echo json_encode(["error" => "No se pudo crear la carpeta"]);
        exit();
    }

    if (!is_writable($uploadDir)) {
        echo json_encode(["error" => "La carpeta no tiene permisos de escritura"]);
        exit();
    }
 
    $cvName = uniqid('cv_', true) . '.' . pathinfo($cv['name'], PATHINFO_EXTENSION);
    $cvPath = $uploadDir . $cvName;

 
    if (!move_uploaded_file($cv['tmp_name'], $cvPath)) {
        echo json_encode(["error" => "Error al mover el archivo"]);
        exit();
    }
 
    $cvRuta = "public/descargas/cv/" . $cvName;
}
 
$checkSql = "SELECT id FROM colaboradores WHERE cuit = ?";
$checkParams = [$cuit];
$checkStmt = sqlsrv_query($conn, $checkSql, $checkParams);

if ($checkStmt === false) {
    error_log(" Error al verificar si el CUIT existe: " . print_r(sqlsrv_errors(), true));
    echo json_encode(["error" => "Error al verificar CUIT"]);
    exit();
}

$row = sqlsrv_fetch_array($checkStmt, SQLSRV_FETCH_ASSOC);

if ($row) {
    
    $colaborador_id = $row['id'];

    $updateSql = "UPDATE colaboradores SET 
        dni = ?, contrasenia = ?, email = ?, nombre = ?, apellido = ?, celular = ?, linkedin = ?, 
        razonSocial = ?, condicionIVA = ?, fotoPerfil = ?, cv = ?, conocimientos = ?, 
        presentacion = ?, idioma = ?, area = ?, pais = ?, provincia = ?, 
        domicilio = ?, tarifaHora = ?, disponibilidad = ?, aceptarPoliticas = ?
    WHERE cuit = ?"; 

    $updateParams = [
        $dni, $contrasenia, $email, $nombre, $apellido, $celular, $linkedin, 
        $razonSocial, $condicionIVA, $fotoPerfil, $cvRuta, $conocimientos, 
        $presentacion, $idioma, $area, $pais, $provincia, 
        $domicilio, $tarifaHora, $disponibilidad, $aceptarPoliticas,
        $cuit 
    ];

    $updateStmt = sqlsrv_query($conn, $updateSql, $updateParams);

    if ($updateStmt === false) {
        error_log(" Error al ejecutar el UPDATE: " . print_r(sqlsrv_errors(), true));
        echo json_encode(["error" => "Error al actualizar colaborador", "details" => sqlsrv_errors()]);
        exit();
    }

    error_log(" Colaborador actualizado correctamente con ID: " . $colaborador_id);
    echo json_encode(["success" => "Colaborador actualizado correctamente", "id" => $colaborador_id]);
} else {
    
    $insertSql = "INSERT INTO colaboradores 
    (dni, contrasenia, email, nombre, apellido, celular, linkedin, razonSocial, condicionIVA, cuit, fotoPerfil, cv, conocimientos, presentacion, idioma, area, pais, provincia, domicilio, tarifaHora, disponibilidad, aceptarPoliticas)
    OUTPUT INSERTED.id
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    $insertParams = [
        $dni, $contrasenia, $email, $nombre, $apellido, $celular, $linkedin, 
        $razonSocial, $condicionIVA, $cuit, $fotoPerfil, $cvRuta, 
        $conocimientos, $presentacion, $idioma, $area, $pais, $provincia, 
        $domicilio, $tarifaHora, $disponibilidad, $aceptarPoliticas
    ];

    $insertStmt = sqlsrv_query($conn, $insertSql, $insertParams);

    if ($insertStmt === false) {
        error_log(" Error al ejecutar el INSERT: " . print_r(sqlsrv_errors(), true));
        echo json_encode(["error" => "Error al insertar colaborador", "details" => sqlsrv_errors()]);
        exit();
    }

    $row = sqlsrv_fetch_array($insertStmt, SQLSRV_FETCH_ASSOC);

    if ($row && isset($row['id'])) {
        $colaborador_id = $row['id'];
        echo json_encode(["success" => "Colaborador registrado correctamente", "id" => $colaborador_id]);
    } else {
        error_log(" No se obtuvo el ID del colaborador después del INSERT.");
        echo json_encode(["error" => "No se pudo obtener el ID del colaborador"]);
        exit();
    }
}

 
 
if (!empty($_POST["experienciaLaboral"])) {
    $experienciaLaboral = json_decode($_POST["experienciaLaboral"]?? '[]', true);
    error_log("Datos de experiencia laboral recibidos: " . print_r($experienciaLaboral, true));


} else {
    error_log(" No se encontró experiencia laboral.");
}


if (!empty($experienciaLaboral) && is_array($experienciaLaboral)) {
    foreach ($experienciaLaboral as $exp) {
        $sigoTrabajando = isset($exp["sigoTrabajando"]) ? (int)$exp["sigoTrabajando"] : 0;

       
        $sql_check = "SELECT id FROM experiencia_laboral WHERE colaborador_id = ? AND cargo = ?";
        $params_check = [$colaborador_id, $exp["cargo"]];
        $stmt_check = sqlsrv_query($conn, $sql_check, $params_check);

        if ($stmt_check === false) {
            error_log("Error al verificar experiencia laboral : " . print_r(sqlsrv_errors(), true));
            continue;  
        }
         

        $row = sqlsrv_fetch_array($stmt_check, SQLSRV_FETCH_ASSOC);
        sqlsrv_free_stmt($stmt_check);  

        if ($row) {
             
            $sql_update = "UPDATE experiencia_laboral 
                           SET empresa = ?, jornada = ?, tiempo = ?, detalle = ?, sigoTrabajando = ?
                           WHERE id = ?";

            $params_update = [
                $exp["empresa"], 
                $exp["jornada"], 
                $exp["tiempo"], 
                $exp["detalle"], 
                $sigoTrabajando, 
                $row["id"]
            ];

            $stmt_update = sqlsrv_query($conn, $sql_update, $params_update);

            if ($stmt_update === false) {
                error_log("Error al actualizar experiencia laboral: " . print_r(sqlsrv_errors(), true));
                echo json_encode(["error" => "Error al actualizar experiencia laboral"]);
                exit();
            }
            error_log("Experiencia laboral actualizada correctamente ");
        } else {
            
            $sql_insert = "INSERT INTO experiencia_laboral (colaborador_id, cargo, empresa, jornada, tiempo, detalle, sigoTrabajando) 
                           VALUES (?, ?, ?, ?, ?, ?, ?)";

            $params_insert = [
                $colaborador_id, 
                $exp["cargo"], 
                $exp["empresa"], 
                $exp["jornada"], 
                $exp["tiempo"], 
                $exp["detalle"], 
                $sigoTrabajando
            ];

            $stmt_insert = sqlsrv_query($conn, $sql_insert, $params_insert);
            if ($stmt_insert === false) {
                error_log(" Error al insertar experiencia laboral: " . print_r(sqlsrv_errors(), true));
                echo json_encode(["error" => "Error al insertar experiencia laboral"]);
                exit();
            }
            error_log(" Experiencia laboral insertada correctamente: ");
        }
} 
 
} else {
    error_log(" No se encontró experiencia laboral.");
}

 

if (!empty($_POST["educacion"])) {
    $educacion = json_decode($_POST["educacion"] ?? '[]', true);
    error_log("Datos de educacion recibidos: " . print_r($educacion, true));

     
} else {
    error_log(" No se encontró educacion.");
}

if (!empty($educacion) && is_array($educacion)) {
    foreach ($educacion as $edu) {
    
            $sql_check = "SELECT id FROM educacion_laboral WHERE colaborador_id = ? AND titulo = ?";
            $params_check = [$colaborador_id, $edu["titulo"]];
            $stmt_check = sqlsrv_query($conn, $sql_check, $params_check);

            if ($stmt_check === false) {
                error_log("Error al verificar educación: " . print_r(sqlsrv_errors(), true));
                continue;
            }

            $row = sqlsrv_fetch_array($stmt_check, SQLSRV_FETCH_ASSOC);

            if ($row) {
                 
                $sql_update = "UPDATE educacion_laboral 
                               SET institucion = ?, cursado = ?, detalles = ? 
                               WHERE id = ?";

                $params_update = [
                    $edu["institucion"],     
                    $edu["cursado"],    
                    $edu["detalles"],   
                    $row["id"]   
                ];

                $stmt_update = sqlsrv_query($conn, $sql_update, $params_update);

                if ($stmt_update === false) {
                    error_log(" Error al actualizar educación: " . print_r(sqlsrv_errors(), true));
                    echo json_encode(["error" => "Error al actualizar educación"]);
                    exit();
                }
                error_log(" Educación actualizada correctamente : ");
                sqlsrv_free_stmt($stmt_update);
            } else {
                
                $sql_insert = "INSERT INTO educacion_laboral (colaborador_id, institucion, titulo, cursado, detalles) 
                               VALUES (?, ?, ?, ?, ?)";

                $params_insert = [
                    $colaborador_id,   
                    $edu["institucion"], 
                    $edu["titulo"],     
                    $edu["cursado"],  
                    $edu["detalles"]    
                ];

                $stmt_insert = sqlsrv_query($conn, $sql_insert, $params_insert);

                if ($stmt_insert === false) {
                    error_log(" Error al insertar educación: " . print_r(sqlsrv_errors(), true));
                    echo json_encode(["error" => "Error al insertar educación"]);
                    exit();
                }
                error_log(" Educación insertada correctamente: ");
                sqlsrv_free_stmt($stmt_insert);
            }
    }
} else {
    error_log("  No se encontró educación");
}

 
 

if (!empty($_POST["cursos"])) {
    $cursos = json_decode($_POST["cursos"]?? '[]', true);
    error_log("Datos de cursos recibidos: " . print_r($cursos, true));

    
} else {
    error_log(" No se encontraron cursos.");
}

if (!empty($cursos) && is_array($cursos)) {
    foreach ($cursos as $curso) {
      
            $sql_check = "SELECT id FROM cursos WHERE colaborador_id = ? AND nombre = ?";
            $params_check = [$colaborador_id, $curso["nombre"]];
            $stmt_check = sqlsrv_query($conn, $sql_check, $params_check);

            if ($stmt_check === false) {
                error_log("Error al verificar curso: " . print_r(sqlsrv_errors(), true));
                continue;
            }

            $row = sqlsrv_fetch_array($stmt_check, SQLSRV_FETCH_ASSOC);
sqlsrv_free_stmt($stmt_check);
if ($row && isset($row["id"])) {
    error_log("ID del curso encontrado: " . $row["id"]);
} else {
    error_log("No se encontró un curso existente con nombre: " . $curso["nombre"]);
}
            if ($row) {
               
                $sql_update = "UPDATE cursos 
                               SET institucion = ?, carga = ?, contenido = ? 
                               WHERE id = ?";

                $params_update = [
                    $curso["institucion"],     
                    $curso["carga"],   
                    $curso["contenido"],  
                    $row["id"]   
                ];

                $stmt_update = sqlsrv_query($conn, $sql_update, $params_update); 
                if ($stmt_update === false) {
                    error_log(" Error al actualizar cursos: " . print_r(sqlsrv_errors(), true));
                    echo json_encode(["error" => "Error al actualizar cursos"]);
                    exit();
                }
                error_log(" Curso actualizado correctamente: ");
                sqlsrv_free_stmt($stmt_update);
            } else {
              
                $sql_insert = "INSERT INTO cursos (colaborador_id, institucion, nombre,carga, contenido) 
                               VALUES (?, ?, ?, ?, ?)";

                $params_insert = [
                    $colaborador_id,    
                    $curso["institucion"],  
                    $curso["nombre"],     
                    $curso["carga"],   
                    $curso["contenido"]   
                ];

                $stmt_insert = sqlsrv_query($conn, $sql_insert, $params_insert);

                if ($stmt_insert === false) {
                    error_log(" Error al insertar curso: " . print_r(sqlsrv_errors(), true));
                    echo json_encode(["error" => "Error al insertar curso"]);
                    exit();
                }
                error_log(" Curso insertado correctamente: ");
                sqlsrv_free_stmt($stmt_insert);
            }
    }
} else {
    error_log(" No se encontró curso");
}
 
echo json_encode(["message" => "Colaborador, experiencia laboral, educacion, cursos guardados correctamente"]);
sqlsrv_close($conn);
 
 ?>