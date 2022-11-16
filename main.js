console.log(document.title); // APR Manager Inc. - 2022
let asociadosGrabados = getAsociados();
if (asociadosGrabados) { // Existe asociadosAPR
  console.log(`Hay ${asociadosGrabados.length} asociados`);
} else { // No existe asociadosAPR
  asociadosGrabados = [];
  console.log("No hay asociados");
}
let initLstAsociados = initPagination(asociadosGrabados);
lstAsociados(asociadosGrabados, initLstAsociados);

// Click en btnAccion
const btnCreate = document.getElementById('btnAccion');
btnAccion.addEventListener('click', (event) => {
  console.log('btnAccion');
  event.preventDefault();
  const frmRegistro = getMyForm();
  if (!frmRegistro.medidor ||
       !frmRegistro.nombre ||
       !frmRegistro.apellidos) {
        alert('Información minima a ingresar: Medidor, Nombre y Apellidos');
       } else {
         asociadosGrabados.push(frmRegistro);
         localStorage.setItem("asociados", JSON.stringify(asociadosGrabados));
         initMyForm();
         asociadosGrabados = getAsociados();
         console.log(`Saliendo desde click hay ${asociadosGrabados.length} asociados`);
         initLstAsociados = initPagination(asociadosGrabados);
         lstAsociados(asociadosGrabados, initLstAsociados);
        }
});

// Click en btnUpdate
const btnUpdate = document.querySelectorAll('.btnUpdate');
console.log(`btnUpdate ${btnUpdate.length}`);
btnUpdate.forEach((btn, idx) => {
   btn.addEventListener('click', (event) => {
      event.preventDefault();
      console.log(`btnUpdate ${idx}`);
      updateAsociados(idx);
 })
})
// Click en btnDelete
const btnDelete = document.querySelectorAll('.btnDelete');
console.log(`btnDelete ${btnDelete.length}`);
btnDelete.forEach((btn, idx) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(`btnDelete ${idx}`);
    deleteAsociados(idx);
  })
})
console.log("Fin main.js");

// Function: Inicializa paginación
function initPagination(asociados) {
  let lstPag = JSON.parse(localStorage.getItem("cntPagination"));
  console.log(`initPagination lstPag: ${lstPag}`);
  if (!lstPag) {
    lstPag = 1;
  } else {
    lstPag++;
  }
  let nroPag = 0;
  if (asociados) {
      nroPag = Math.trunc(asociados.length / 10);
      if (asociados.length % 10) {
        nroPag++;
     }  
  } else {
    nroPag = 1;
  }                                   
  console.log(`initPagination nroPag: ${nroPag}`);
  let lstAso = (lstPag - 1) * 10
  console.log(`initPagination: ${lstPag} initAsociados ${lstAso}`);
  return lstAso;
}

function getMyForm() {
  const frmRegistro = {
    "nombre": document.getElementById('frmNombre').value,
    "apellidos": document.getElementById('frmApellidos').value,
    "email": document.getElementById('frmEmail').value,
    "celular": document.getElementById('frmCelular').value,
    "medidor": document.getElementById('frmMedidor').value,
    "parcela": document.getElementById('frmParcela').value,
    "rol": document.getElementById('frmRol').value,
    "comuna": document.getElementById('frmComuna').value,
    "region": document.getElementById('frmRegion').value,
    "gps": document.getElementById('frmGPS').value,
  };
  console.log(`frmRegistro: ${frmRegistro} ${frmRegistro.nombre}`);
  return frmRegistro;
}
function getAsociados() {
  let asociados = JSON.parse(localStorage.getItem("asociados"));
  return asociados;
}
function setAsociados() {
}
function updateAsociados(index) {
  console.log(`updateAsociados: ${initLstAsociados} ${index}`);
}
function deleteAsociados(index) {
  console.log(`deleteAsociados: ${initLstAsociados} ${index}`);
  let asociados_ = asociadosGrabados.splice(index, 1);
  console.log(`deleteAsociados salida splice: ${asociados_.length}`);
  console.log(`deleteAsociados ahora hay: ${asociadosGrabados.length} asociados`);
  localStorage.setItem("asociados", JSON.stringify(asociadosGrabados));
  console.log(`deleteAsociados: ${initLstAsociados}`);
  lstAsociados(getAsociados(), initLstAsociados);
}

// Function: Lista asociados
function lstAsociados(asociados, initLstAso) {
  console.log(`lstAsociados: ${asociados} initLstAso: ${initLstAso}`);
  const titleMedidor = 'Medidor';
  const titleNombre = 'Nombre';
  const titleEmail = 'Email';
  const titleCelular = 'Celular';
  const titleParcela = 'Parcela';
  const titleRow = document.getElementById('titleRow');
  titleRow.innerHTML = '';
  title = document.createElement('tr');
  title.innerHTML = `<tr><th>${titleMedidor}</th>
                          <th>${titleNombre}</th>
                          <th>${titleEmail}</th>
                          <th>${titleCelular}</th>
                          <th>${titleParcela}</th></tr>`;
  titleRow.appendChild(title);
  if (asociados) {
    const detailRow = document.getElementById('detailRow');
    detailRow.innerHTML = '';
    let j = 1;
    let medidor = [];
    for (let i = initLstAso; i < asociados.length; i++) {
      
      // console.log(`Page: ${nroPag} lstPage: ${lstPag}`);
      
      if (j <= 10) {
        console.log(`Asociado: ${j} ${asociados[i].medidor}`);
        medidor[j] = asociados[i].medidor;
        const nombreCompleto = `${asociados[i].nombre} ${asociados[i].apellidos}`;
        detail = document.createElement('tr');
        detail.innerHTML=`<tr><th scope="row">${asociados[i].medidor}</th>
        <td>${nombreCompleto}</td>
        <td>${asociados[i].email}</td>
        <td>${asociados[i].celular}</td>
        <td>${asociados[i].parcela}</td>
        <td>
        <button type="submit" class="btn btn-primary btnUpdate">Editar</button>
        <button type="submit" class="btn btn-danger btnDelete">Eliminar</button>
        </td>
        </tr>`;
        detailRow.appendChild(detail);
        j++;
      } else {
        detail.innerHTML=`<td><button type="submit" class="btn btn-primary btnNext">Continuar</button></td></tr>`;
        detailRow.appendChild(detail);
        break;
      }
    };
  }
}

// Function: Limpia formulario
function initMyForm() {
  document.getElementById('frmNombre').value = '';
  document.getElementById('frmApellidos').value = '';
  document.getElementById('frmEmail').value = '';
  document.getElementById('frmCelular').value = '';
  document.getElementById('frmMedidor').value = '';
  document.getElementById('frmParcela').value = '';
  document.getElementById('frmRol').value = '';
  document.getElementById('frmComuna').value = '';
  document.getElementById('frmRegion').value = '';
  document.getElementById('frmGPS').value = '';
}
