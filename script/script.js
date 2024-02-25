// Diccionario para almacenar las equivalencias
let equivalencias = {};

// Función para agregar una fila a la tabla
function agregarFila() {
  const nuevaDefinicion = document.getElementById("nuevaDefinicion").value;
  const nuevaEquivalencia = document.getElementById("nuevaEquivalencia").value;
  
  if (nuevaDefinicion && nuevaEquivalencia) {
    equivalencias[nuevaDefinicion] = nuevaEquivalencia;
    
    const tbody = document.querySelector("#equivalencias tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td contenteditable="true">${nuevaDefinicion}</td>
      <td contenteditable="true">${nuevaEquivalencia}</td>
      <td><button onclick="editarFila(this)">Editar</button></td>
      <td><button onclick="borrarFila(this)">Borrar</button></td>
    `;
    tbody.appendChild(newRow);
    
    // Limpiar los campos de entrada
    document.getElementById("nuevaDefinicion").value = "";
    document.getElementById("nuevaEquivalencia").value = "";
    buscarMinimaEquivalencia();
  }
}

// Función para editar una fila
function editarFila(button) {
  const fila = button.parentNode.parentNode;
  const celdas = fila.querySelectorAll("td");
  
  // Convertir las celdas de texto en editables
  celdas[0].setAttribute("contenteditable", "true");
  celdas[1].setAttribute("contenteditable", "true");
  
  // Cambiar el botón de editar por el botón de guardar
  button.innerText = "Guardar";
  button.setAttribute("onclick", "guardarFila(this)");
}

// Función para guardar una fila editada
function guardarFila(button) {
  const fila = button.parentNode.parentNode;
  const celdas = fila.querySelectorAll("td");
  const definicion = celdas[0].innerText;
  const nuevaEquivalencia = celdas[1].innerText;
  
  equivalencias[definicion] = nuevaEquivalencia;
  
  // Convertir las celdas de texto en no editables
  celdas[0].removeAttribute("contenteditable");
  celdas[1].removeAttribute("contenteditable");
  
  // Cambiar el botón de guardar por el botón de editar
  button.innerText = "Editar";
  button.setAttribute("onclick", "editarFila(this)");
  buscarMinimaEquivalencia();
}

// Función para borrar una fila
function borrarFila(button) {
  const fila = button.parentNode.parentNode;
  const definicion = fila.querySelector("td").innerText;
  fila.remove();
  delete equivalencias[definicion];
  // Delete the span value
  const minimaEquivalencia = document.getElementById("minimaEquivalencia");
  // Try buscarMinimaEquivalencia() here
  try {
    buscarMinimaEquivalencia();
  }catch(e) {
    minimaEquivalencia.innerText = "";
  }
}


// Función para buscar la mínima equivalencia
function buscarMinimaEquivalencia() {
  // Get the last row of the table getting all the td's and selecting the last one
  const tbody = document.querySelector("#equivalencias tbody");
  const rows = tbody.querySelectorAll("tr");
  const lastRow = rows[rows.length - 1];
  const celdas = lastRow.querySelectorAll("td");
  const equivalencia = celdas[1].innerText;
  // Put the span with the id minimaEquivalencia in a variable
  const minimaEquivalencia = document.getElementById("minimaEquivalencia");
  // Set the value of the span to the value of the last cell of the last row
  minimaEquivalencia.innerText = equivalencia;
  while (true){
    let changed = false;
    for (let i = 0; i < rows.length - 1; i++){
      const celdas = rows[i].querySelectorAll("td");
      const definicion = celdas[0].innerText;
      const equivalencia = celdas[1].innerText;
      if (minimaEquivalencia.innerText.includes(definicion)){
        minimaEquivalencia.innerText = minimaEquivalencia.innerText.replace(definicion, equivalencia);
        changed = true;
      }
    }
    if (!changed){
      break;
    }
  }
}