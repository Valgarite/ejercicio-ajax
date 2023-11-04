<?php
$archivo = 'tasks-data.xml';

$lineaEditada = $_POST["editando"] + 1;
$contenidoNuevo = $_POST["contenido"];

$lineas = file($archivo, FILE_IGNORE_NEW_LINES);

if (isset($lineas[$lineaEditada]) && !($lineas[$lineaEditada] == "</list>")) {

    $lineas[$lineaEditada] = $contenidoNuevo;

    $textoActualizado = implode("\n", $lineas);

    file_put_contents($archivo, $textoActualizado);
} else {
    echo 'La línea especificada no existe en el archivo.';
}
?>