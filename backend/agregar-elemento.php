<?php
$archivo = 'tasks-data.xml';
$nuevoTexto = $_POST["contenido"];

$lineas = file($archivo, FILE_IGNORE_NEW_LINES);

$posicion = count($lineas) - 1;

array_splice($lineas, $posicion, 0, $nuevoTexto);

$textoActualizado = implode("\n", $lineas);

file_put_contents($archivo, $textoActualizado);
?>