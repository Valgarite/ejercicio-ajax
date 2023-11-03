const [inDesc, inResp, inCantDias, inStart] = ["descripcion", "responsable", "cantidad-dias", "fecha-inicio"].map((element) => { document.getElementById(element) })
cargarDoc()
console.log("epa")
function agregarTarea() {

}

function cargarDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        console.log(this)
        if (this.readyState == 4 && this.status == 200) {
            buscarTareas(this);
        }
    };
    xhttp.open("GET", "prueba.xml", true);
    xhttp.send();
}

function buscarTareas(xml) {
    console.log("epa3")
    let xmlDoc = xml.responseXML;
    let x = xmlDoc.getElementsByTagName("task");
    let table = "<tr><th>Responsable</th><th>Cantidad</th><th>Inicio</th><th>Expira</th><th>Descripción</th></tr>";
    for (let i = 0; i < x.length; i++) {
        console.log(i)
        table += "<tr><td>" +
            x[i].getElementsByTagName("resp")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("cant")[0].childNodes[0].nodeValue +
            "</td>";
        x[i].getElementsByTagName("start")[0].childNodes[0].nodeValue +
            "</td>";
        x[i].getElementsByTagName("exp")[0].childNodes[0].nodeValue +
            "</td>";
        x[i].getElementsByTagName("desc")[0].childNodes[0].nodeValue +
            "</td></tr>";
    }
    document.getElementById("activity-list").innerHTML = table;
}