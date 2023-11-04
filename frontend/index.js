const inputElements = [inDesc, inResp, inCantDias, inStart, inExp] = ["descripcion", "responsable", "cantidad-dias", "fecha-inicio", "fecha-exp"].map((element) => { return document.getElementById(element) })
const backUrl = "../backend/"
const xmlUrl = `${backUrl}tasks-data.xml`
var editando = -1
cargarDoc()
let xmlDoc = loadXMLDoc(xmlUrl)

inStart.min = new Date().toISOString().split("T")[0];
inExp.min = new Date().toISOString().split("T")[0];

function subirTarea() {
    let validacion = true
    inputElements.forEach((el) => {
        if (el.value == "" || null || undefined) {
            validacion = false
        }
    })
    if (!validacion) {
        window.alert("¡Campos vacíos!")
        return
    }
    const xmlString = xmlElementToString(createXmlElement())
    const formData = new FormData();
    const xhr = new XMLHttpRequest();
    formData.append("contenido", xmlString);
    console.log(xmlString)
    if (editando > -1) {
        formData.append("editando", editando)
        xhr.open("POST", `${backUrl}editar-elemento.php`, true);
    } else {
        xhr.open("POST", `${backUrl}agregar-elemento.php`, true);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Procesar respuesta exitosa
            cargarDoc()
            editando = -1
        } else if (xhr.readyState === 4) {
            // Procesar error
            window.alert("Error en la solicitud.");
        }
    };
    xhr.send(formData);
}

function createXmlElement() {
    try {
        const XMLElementsList = [newTaskElement, newRespElement, newCantElement, newStartElement, newExpElement, newDescElement] = ["task", "resp", "cant", "start", "exp", "desc"].map((el) => { return xmlDoc.createElement(el); });
        const textList = [respText, cantText, startText, endText, descText] = [inResp, inCantDias, inStart, inExp, inDesc].map((el) => { return xmlDoc.createTextNode(el.value) });
        [newRespElement, newCantElement, newStartElement, newExpElement, newDescElement].map(
            (el, i) => {
                // Conectar el texto a un elemento.
                return el.appendChild(textList[i])
            })
        textList.forEach((el, i) => newTaskElement.appendChild(XMLElementsList[i + 1]))
        return newTaskElement
    } catch (error) {

    }
}

function xmlElementToString(elementoXML) {
    const serializer = new XMLSerializer();
    const elementoString = serializer.serializeToString(elementoXML);
    return elementoString;
}

function cargarDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            buscarTareas(this);
        }
    };
    xhttp.open("GET", xmlUrl, true);
    xhttp.send();
}
function loadXMLDoc(FileName) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", FileName, false);
    xhttp.send(null);
    return xhttp.responseXML;
}

function buscarTareas(xml) {
    let xmlDoc = xml.responseXML;
    try {
        let x = xmlDoc.getElementsByTagName("task");
        let table = "<tr><th>Número</th><th>Responsable</th><th>Duración</th><th>Inicia</th><th>Expira</th><th>Descripción</th><th colspan=2>Acciones</th></tr>";
        for (let i = 0; i < x.length; i++) {
            table += "<tr><td>" +
                (i + 1) +
                "</td><td>" +
                x[i].getElementsByTagName("resp")[0].childNodes[0].nodeValue +
                "</td><td>" +
                x[i].getElementsByTagName("cant")[0].childNodes[0].nodeValue +
                "</td><td>" +
                x[i].getElementsByTagName("start")[0].childNodes[0].nodeValue +
                "</td><td>" +
                x[i].getElementsByTagName("exp")[0].childNodes[0].nodeValue +
                "</td><td id=desc>" +
                x[i].getElementsByTagName("desc")[0].childNodes[0].nodeValue +
                "</td>" +
                `<td><button onclick=escogerModificado(${i})>Modificar</button></td>` +
                `<td><button onclick=eliminar(${i})>Eliminar</button></td>` +
                "</tr>";
        }
        document.getElementById("activity-list").innerHTML = table;
        document.getElementById("editando").innerText = "Agregar nueva tarea"
    } catch (error) {
        return
    }
}

function eliminar(i) {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", `${backUrl}eliminar-elemento.php?task=${i}`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Procesar respuesta exitosa
            console.log(xhr.responseText);
            cargarDoc()
        } else if (xhr.readyState === 4) {
            // Procesar error
            console.log("Error en la solicitud.");
        }
    };
    xhr.send();
}

function escogerModificado(i) {
    editando = i
    const mensajeEditando = document.getElementById("editando")
    mensajeEditando.innerText = "Editando a: " + (i + 1).toString()
}

function validarNombre() {
    const regex = /^[a-zA-ZáéíóúñÑ\s]*$/; // expresión regular que permite solo letras con o sin tilde y espacios en blanco
    if (inResp.value == "") {
        // Acción a realizar cuando el valor está vacío
    } else if (!regex.test(inResp.value)) {
        var valorAnterior = inResp.value;
        inResp.value = valorAnterior.replace(/[^a-zA-ZáéíóúñÑ\s]/g, '');
    } else if (inResp.value.length > 32) {
        inResp.value = inResp.value.slice(0, 32);
    }
}

function validarTexto() {
    const regex = /^[a-zA-ZáéíóúñÑ\s.$%,@&#-]*$/;
    if (inDesc.value === "") {
    } else if (!regex.test(inDesc.value)) {
        var valorAnterior = inDesc.value;
        inDesc.value = valorAnterior.replace(/[^a-zA-ZáéíóúñÑ\s.$%,@&#-]/g, '');
    } else if (inResp.value.length > 255) {
        inResp.value = inResp.value.slice(0, 255);
    }
}

function validarNum() {
    const value = parseInt(inCantDias.value);

    if (isNaN(value) || value > 31) {
        inCantDias.value = 31
    } else if (value < 0) {
        inCantDias.value = 0
    }
}