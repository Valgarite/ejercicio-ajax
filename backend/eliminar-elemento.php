<?php
$archivo = 'tasks-data.xml';

$lineaEditada = $_GET["task"] + 1;

$lineas = file($archivo, FILE_IGNORE_NEW_LINES);
echo $lineas[$lineaEditada];

if (isset($lineas[$lineaEditada]) && !($lineas[$lineaEditada] == "</list>")) {

    unset($lineas[$lineaEditada]);

    $textoActualizado = implode("\n", $lineas);

    file_put_contents($archivo, $textoActualizado);
} else {
    echo 'La línea especificada no existe en el archivo.';
}
?>