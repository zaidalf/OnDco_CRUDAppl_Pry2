console.log(document.title); // APR Manager Inc. - 2022
const frmRegistro = {
      "nombre": '',
      "apellidos": '',
      "email": '',
      "celular": '',
      "medidor": '',
      "parcela": '',
      "rol": '',
      "comuna": '',
      "region": '',
      "gps": '',
};
var updateIdx = 0;
let asociadosGrabados = getAsociados();  // Trae asociados grabados en localStorage
if (asociadosGrabados) {                 // Existe asociadosAPR
  console.log(`Hay ${asociadosGrabados.length} asociados`);
} else {                                 // No existe asociadosAPR
  asociadosGrabados = [];
  console.log("No hay asociados");
}
//
// Inicia con formulario vacio en modo Crear & Lista asociados desde localStorage
buildMyForm(frmRegistro, 'Crear');
lstAsociados(asociadosGrabados);
//
// Click en btnAccion - Crear
const btnAccion = document.querySelector(".btnAccion");
console.log(`btnAccion: ${btnAccion}`);
btnAccion.addEventListener('click', (event) => {
  event.preventDefault();
  const frmRegistro = getMyForm();
  console.log(`frmRegistro: ${frmRegistro} ${frmRegistro.nombre} ${btnAccion.textContent}`);
  if (btnAccion.textContent === 'Crear') {
    createAsociados(frmRegistro);
  } else {
    updateAsociados(frmRegistro, idx);
  }V
  console.log(`Saliendo desde click btnAccion hay ${asociadosGrabados.length} asociados`);
  buildMyForm(frmRegistro, 'Crear');
   asociadosGrabados = getAsociados();
  lstAsociados(asociadosGrabados);
});
// Click en btnUpdate - desde la lista de asociados
const btnUpdate = document.querySelectorAll(".btnUpdate");
console.log(`btnUpdate: ${btnUpdate} ${btnUpdate.length}`);
btnUpdate.forEach((btn, idx) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    updateIdx = idx;
    updateAsociadosForm(idx);
  });
});
// Click en btnDelete - desde la lista de asociados
const btnDelete = document.querySelectorAll(".btnDelete");
console.log(`btnDelete: ${btnDelete} ${btnDelete.length}`);
btnDelete.forEach((btn, idx) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    deleteAsociados(idx);
  });
});
// Click en btnActualizar - desde formulario
const btnActualizar = document.querySelector(".btnActualizar");
console.log(`btnActualizar: ${btnActualizar}`);
btnActualizar.addEventListener('click', (event) => {
  event.preventDefault();
  const frmRegistro = getMyForm();
  console.log(`frmRegistro: ${frmRegistro} ${frmRegistro.nombre} ${btnAccion.textContent}`);
  updateAsociados(frmRegistro);
});
// Click en btnCancela - desde formulario para refrescar DOM
const btnCancelar = document.querySelector(".btnCancelar");
console.log(`btnCancelar: ${btnCancelar}`);
btnCancelar.addEventListener('click', (event) => {
  event.preventDefault();
  location.reload();
});
console.log("Fin main.js");
// -------------------------------------
function getAsociados() {
  let asociados = JSON.parse(localStorage.getItem("asociados"));
  return asociados;
}
//
function createAsociados(_frmRegistro) {
  console.log(`createAsociados: ${_frmRegistro.medidor} ${_frmRegistro.nombre} ${_frmRegistro.apellidos}`);
  if (!_frmRegistro.medidor ||
      !_frmRegistro.nombre ||
      !_frmRegistro.apellidos) {
      alert('Información mínima a ingresar: Nro. de Medidor, Nombre y Apellidos');
  } else {
      asociadosGrabados.push(_frmRegistro);
      localStorage.setItem("asociados", JSON.stringify(asociadosGrabados));
  }
}
// -------------------------------------
function updateAsociadosForm(index) {
  console.log(`updateAsociadosForm entra: ${index} `);
  // index = index + initLstAsociados;
  buildMyForm(asociadosGrabados[index], 'Actualizar');
}
function updateAsociados(_frmRegistro) {
  console.log(`updateAsociados entra: ${updateIdx} _fmrRegistro: ${_frmRegistro.nombre} ${_frmRegistro.apellidos}`);
  if (!_frmRegistro.medidor ||
    !_frmRegistro.nombre ||
    !_frmRegistro.apellidos) {
    alert('Información mínima a ingresar: Nro. de Medidor, Nombre y Apellidos');
  } else {
    console.log(`updateAsociados: ${updateIdx} _fmrRegistro: ${_frmRegistro.medido}`);
    asociadosGrabados[updateIdx] = _frmRegistro;
    localStorage.setItem("asociados", JSON.stringify(asociadosGrabados));
    buildMyForm(frmRegistro, 'Crear');
    lstAsociados(getAsociados());
  }
}
function deleteAsociados(index) {
  console.log(`deleteAsociados: ${index}`);
  let _asociados = asociadosGrabados.splice(index, 1);
  localStorage.setItem("asociados", JSON.stringify(asociadosGrabados));
  buildMyForm(frmRegistro, 'Crear');
  lstAsociados(getAsociados());
}
function getMyForm() {
  console.log('getMyForm');
  const _frmRegistro = {
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
  return _frmRegistro;
}
// -------------------------------------
function buildMyForm(_asociado, _btnFunction) {
  console.log(`buildMyForm: ${_btnFunction}`);
  if (_btnFunction === 'Crear') {
      _asociado.medidor = '';
      _asociado.nombre = '';
      _asociado.apellidos = '';
      _asociado.email = '';
      _asociado.celular = '';
      _asociado.parcela = '';
      _asociado.rol = '';
      _asociado.comuna = '';
      _asociado.region = '';
      _asociado.gps = '';
  }
  let myForm = document.getElementById('myForm');
  myForm.innerHTML = '';
  let frmCellMedidor = document.createElement('div');
  frmCellMedidor.className = 'col-md-12';
  frmCellMedidor.innerHTML = `<label for="frmMedidor" class="form-label">* Nro.serie medidor</label>
                <input type="text" class="form-control" id="frmMedidor" value="${_asociado.medidor}">`;
  myForm.appendChild(frmCellMedidor);
  let frmCellNombre = document.createElement('div');
  frmCellNombre.className = 'col-md-6';
  frmCellNombre.innerHTML = `<label for="frmNombre" class="form-label">* Nombre</label>
                <input type="text" class="form-control" id="frmNombre" value="${_asociado.nombre}">`;
  myForm.appendChild(frmCellNombre);
  let frmCellApellidos = document.createElement('div');
  frmCellApellidos.className = 'col-md-6';
  frmCellApellidos.innerHTML = `<label for="frmApellidos" class="form-label">* Apellidos</label>
                <input type="text" class="form-control" id="frmApellidos" value="${_asociado.apellidos}">`;
  myForm.appendChild(frmCellApellidos);
  let frmCellEmail = document.createElement('div');
  frmCellEmail.className = 'col-md-6';
  frmCellEmail.innerHTML = `<label for="frmEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="frmEmail" value="${_asociado.email}">`;
  myForm.appendChild(frmCellEmail);
  let frmCellCelular = document.createElement('div');
  frmCellCelular.className = 'col-md-6';
  frmCellCelular.innerHTML = `<label for="frmCelular" class="form-label">Celular</label>
                <input type="text" class="form-control" id="frmCelular" value="${_asociado.celular}">`;
  myForm.appendChild(frmCellCelular);
  let frmCellParcela = document.createElement('div');
  frmCellParcela.className = 'col-md-6';
  frmCellParcela.innerHTML = `<label for="frmParcela" class="form-label">Parcela</label>
                <input type="text" class="form-control" id="frmParcela" value="${_asociado.parcela}">`;
  myForm.appendChild(frmCellParcela);
  let frmCellRol = document.createElement('div');
  frmCellRol.className = 'col-md-6';
  frmCellRol.innerHTML = `<label for="frmRol" class="form-label">Rol</label>
                <input type="text" class="form-control" id="frmRol" value="${_asociado.rol}">`;
  myForm.appendChild(frmCellRol);
  let frmCellComuna = document.createElement('div'); 
  frmCellComuna.className = 'col-md-4';
  frmCellComuna.innerHTML = `<label for="frmComuna" class="form-label">Comuna</label>
                <input type="text" class="form-control" id="frmComuna" value="${_asociado.comuna}">`;
  myForm.appendChild(frmCellComuna);
  let frmCellRegion = document.createElement('div');
  frmCellRegion.className = 'col-md-4';
  frmCellRegion.innerHTML = `<label for="frmRegion" class="form-label">Región</label>
                <select id="frmRegion" class="form-select">
                  <option selected>${_asociado.region}</option>
                  <option value="Arica y Parinacota">Arica y Parinacota</option>
                  <option value="Tarapacá">Tarapacá</option>
                  <option value="Antofagasta">Antofagasta</option>
                  <option value="Atacama">Atacama</option>
                  <option value="Coquimbo">Coquimbo</option>
                  <option value="Valparaíso">Valparaíso</option>
                  <option value="Metropolitana de Santiago">Metropolitana de Santiago</option>
                  <option value="Libertador General Bernardo O'Higgins">Libertador General Bernardo O'Higgins</option>
                  <option value="Maule">Maule</option>
                  <option value="Ñuble">Ñuble</option>
                  <option value="Biobío">Biobío</option>
                  <option value="La Araucanía">La Araucanía</option>
                  <option value="Los Ríos">Los Ríos</option>
                  <option value="Los Lagos">Los Lagos</option>
                  <option value="Aysén del General Carlos Ibáñez del Campo">Aysén del General Carlos Ibáñez del Campo</option>
                  <option value="Magallanes y de la Antártica Chilena">Magallanes y de la Antártica Chilena</option>
                </select>`;
  myForm.appendChild(frmCellRegion);
  let frmCellGPS = document.createElement('div');
  frmCellGPS.className = 'col-md-4';
  frmCellGPS.innerHTML = `<label for="frmGPS" class="form-label">GPS</label>
                <input type="text" class="form-control" id="frmGPS" value="${_asociado.gps}">`;
  myForm.appendChild(frmCellGPS);
  let frmHR = document.createElement('hr');
  myForm.appendChild(frmHR);
  console.log(`frmBuild: ${_asociado.medidor}`);
}

// Function: Lista asociados
function lstAsociados(asociados) {
  console.log(`lstAsociados`);
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
    let medidor = [];
    for (let i = 0; i < asociados.length; i++) {
      console.log(`Asociado: ${asociados[i].medidor} ${asociados[i].nombre}  ${asociados[i].apellidos}`);
      const nombreCompleto = `${asociados[i].nombre} ${asociados[i].apellidos}`;
      detail = document.createElement('tr');
      detail.innerHTML=`<tr><th scope="row">${asociados[i].medidor}</th>
      <td>${nombreCompleto}</td>
      <td>${asociados[i].email}</td>
      <td>${asociados[i].celular}</td>
      <td>${asociados[i].parcela}</td>
      <td><button id="" type="button" class="btn btn-primary btnUpdate">Editar</button></td>
      <td><button id="" type="button" class="btn btn-danger btnDelete">Eliminar</button></td></tr>`;
      detailRow.appendChild(detail);
    }
  }
}
