console.log(document.title); // APR Manager Inc. - 2022
let asociadosGrabados = getAsociados();
if (asociadosGrabados) { // Existe asociadosAPR
  console.log(`Hay ${asociadosGrabados.length} asociados`);
  lstAsociados(asociadosGrabados)
} else {
  console.log("No hay asociados");
}
const btnAccion = document.getElementById('btnAccion');
btnAccion.addEventListener('click', (event) => {
  event.preventDefault();
  const frmRegistro = getMyForm();
  asociadosGrabados.push(frmRegistro);
  localStorage.setItem("asociados", JSON.stringify(asociadosGrabados));
  initMyForm();
  asociadosGrabados = getAsociados();
  console.log(`Saliendo desde click hay ${asociadosGrabados.length} asociados`);
  lstAsociados(asociadosGrabados);
});

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
  console.log(`frmRegistro: ${frmRegistro}`);
  return frmRegistro;
}
function getAsociados() {
  let asociados = JSON.parse(localStorage.getItem("asociados"));

  return asociados;
}
function setAsociados() {
}
function updateAsociados() {
}
function deleteAsociados() {
}
function lstAsociados(asociados) {
  console.log(`lstAsociados: ${asociados}`);
  const titleNumeral = '#';
  const titleMedidor = 'Medidor';
  const titleNombre = 'Nombre';
  const titleEmail = 'Email';
  const titleCelular = 'Celular';
  const titleParcela = 'Parcela';
  const titleRow = document.getElementById('titleRow');
  title = document.createElement('tr');
  title.innerHTML = '';
  title.innerHTML = `<tr><th>${titleNumeral}</th>
                            <th>${titleMedidor}</th>
                            <th>${titleNombre}</th>
                            <th>${titleEmail}</th>
                            <th>${titleCelular}</th>
                            <th>${titleParcela}</th></tr>`;
  titleRow.appendChild(title);
  //
  const detailRow = document.getElementById('detailRow');
  detailRow.innerHTML = '';
  i = 1;
  asociados.forEach((asociado) => {
    console.log(`Asociado: ${asociado}`);
    const nombreCompleto = `${asociado.nombre} ${asociado.apellidos}`;
    detail = document.createElement('tr');
    detail.innerHTML=`<tr><th scope="row">${i}</th>
                            <td>${asociado.medidor}</td>
                            <td>${nombreCompleto}</td>
                            <td>${asociado.email}</td>
                            <td>${asociado.celular}</td>
                            <td>${asociado.parcela}</td></tr>`;
    detailRow.appendChild(detail);
    i++;
  });
}
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
