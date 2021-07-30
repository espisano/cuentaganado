document.querySelector('#datos-boton').onclick = function(event) {
    const $cantidadVehiculos = document.querySelector('#cantidad-vehiculos');
    const cantidadVehiculos = Number($cantidadVehiculos.value);
    
    if (!/^[0-9]{1,2}$/.test($cantidadVehiculos.value) ){
      $cantidadVehiculos.classList.add('is-invalid')

      event.preventDefault();
    }

    else{
      $cantidadVehiculos.classList.remove('is-invalid')
      crearInputVehiculos(cantidadVehiculos);
      ocultarFormularioBienvenida();
      mostrarInputVehiculos(); 

      event.preventDefault(); 
    }
}

function crearInputVehiculos(cantidadVehiculos) {
        for (let i = 0; i < cantidadVehiculos; i++) {
            crearInputVehiculo(i);
        }
}

function crearInputVehiculo(indice){
        const $div = document.createElement('div');
        $div.className = 'tipoVehiculo';
        //$div.classList.add('')

        const $mensajeError = document.createElement('div')
        $mensajeError.className= 'invalid-feedback'
        $mensajeError.textContent = "El campo debe tener entre 1 y 8 caracteres"
      
        const $label = document.createElement('label');
        $label.textContent = 'Tipo de vehiculo #: ' + (indice + 1);
        $label.style.padding = "00px 10px 00px 00px"
        
        const $input = document.createElement('input');
        $input.type = 'text';
        $input.id = 'vehiculo'+(indice + 1)
        $input.placeholder= '...'
        //$input.className = 'form-control'
        
                      
        $div.appendChild($label);
        $div.appendChild($input);
        $div.appendChild($mensajeError);
      
        const $tiposVehiculos = document.querySelector('#tipos-vehiculos');
        $tiposVehiculos.appendChild($div);
}

document.querySelector('#comenzar-boton').onclick = function(event) {
  const $cantidadVehiculos = document.querySelector('#cantidad-vehiculos');
  const cantidadVehiculos = Number($cantidadVehiculos.value);
  const $cantidadRamas = document.querySelector('#formulario-bienvenida').ramas;
  const cantidadRamas = Number($cantidadRamas.value);
  const $formularioVehiculos = document.querySelector('#formulario-vehiculos')  
  const $input = $formularioVehiculos.querySelectorAll('input')
  
  let x = 0

  for (let i = 0; i < $input.length; i++){
    if ($input[i].value <= 0 || $input[i].value.length >10){
      $input[i].classList.add('border')
      $input[i].classList.add('border-danger')
      $input[i].classList.add('is-invalid')
      x += 1

      event.preventDefault()
        }
    else {
      $input[i].classList.remove('border')
      $input[i].classList.remove('border-danger')
      $input[i].classList.remove('is-invalid')

    }
  }
  if (x === 0){
  // obtenerListaVehiculos() ;
  crearFilas(cantidadVehiculos);     
  crearGrilla (cantidadVehiculos, cantidadRamas);    
  ordenarId(cantidadVehiculos, cantidadRamas);
  sumarUnidades();
  ocultarInputVehiculos();
  mostrarBotonera();    
  event.preventDefault(); 
}
else {
  return 'vacio'
}

  
}

function obtenerListaVehiculos() {
      const $tiposVehiculo = document.querySelectorAll('.tipoVehiculo input');
      const tiposVehiculos = [];

      for (let i = 0; i < $tiposVehiculo.length; i++) {
        tiposVehiculos.push($tiposVehiculo[i].value);
      }
      return tiposVehiculos;
}

function crearFilas(cantidadVehiculos){
  for (let i = 0; i < cantidadVehiculos; i++){
    const $botoneraCenso = document.querySelector('#botonera-censo');
   const $fila = document.createElement('div');
    $fila.className = 'row';
    $fila.classList.add('row-botonera')
    $fila.id = 'fila' + (i + 1)
    $botoneraCenso.appendChild($fila);
  }
}

function listaFilas(){
  const $filas = document.querySelectorAll('.row-botonera');
  const filas = [];

  for (let i = 0; i < $filas.length; i++) {
    filas.push($filas[i].id);
    }
  return filas;
}
  
function crearGrilla (cantidadVehiculos, cantidadRamas){
  for (let i = 0; i < cantidadRamas; i++){
    crearRamas(cantidadVehiculos);
    crearBotones(cantidadVehiculos);
    
      }
}

function crearRamas(cantidadVehiculos){
  let $filas = listaFilas();

  for (let i = 0; i < cantidadVehiculos; i++){        
    const $rama = document.createElement('div');
    $rama.className = 'col' 
    $rama.classList.add('guia') 
    $rama.classList.add('d-grid')  
    $rama.classList.add('gap-2')
    $rama.classList.add('col-3')
    $rama.classList.add('mx-auto')
    let filas = document.querySelector((`#${$filas[i]}`))    
    filas.appendChild($rama)
    
  }
}

function crearBotones(cantidadVehiculos){
  let $filas = listaFilas();
  const listaVehiculos = obtenerListaVehiculos();
  for (let i = 0; i < cantidadVehiculos; i++){
    const $boton = document.createElement('button');
    $boton.className = 'boton-censo';
    $boton.classList.add('boton-guia');
    $boton.classList.add('btn')
    $boton.classList.add('btn-default')
    $boton.type = 'button';
    $boton.classList.add('btn');
    $boton.classList.add('btn-primary');
    $boton.textContent = listaVehiculos[i];
    let $contador = document.createElement('input');    
    $contador.className = 'contador-censo'
    $contador.type = 'number'
    $contador.classList.add('contador-guia')    
    $contador.setAttribute("value", "0");
    let filas = document.querySelector((`#${$filas[i]}`))
    let rama = filas.querySelector('.guia')
    rama.appendChild($boton)
    rama.appendChild($contador)
    rama.classList.remove('guia')
  
    }

}

function obtenerListaContador(){
  const $listaContador = document.querySelectorAll('.contador-censo');
  const listaContador = [];

  for (let i = 0; i < $listaContador.length; i++){
    listaContador.push($listaContador[i].id)
    }
    return listaContador;
  
}

function ordenarId(cantidadVehiculos, cantidadRamas){
  const cantidadGuias = cantidadVehiculos * cantidadRamas
  for (let i = 0; i < cantidadGuias; i++){
    let contador = document.querySelector('.contador-guia')
    contador.id = 'contador' + (i + 1)
    let botones = document.querySelector('.boton-guia') 
    botones.id = 'boton' + (i + 1)
    contador.classList.remove('contador-guia');
    botones.classList.remove('boton-guia')

  }

}
function sumarUnidades(){
let buttons = document.getElementsByClassName('boton-censo');
let $contador = obtenerListaContador();
  for (let i=0 ; i < buttons.length ; i++){
    (function(index){
       buttons[index].onclick = function(){
       let contador = parseInt(document.querySelector((`#${$contador[i]}`)).value, 10);                  
       contador = isNaN(contador) ? 0 : contador;   
       contador++; 
       document.querySelector((`#${$contador[i]}`)).value = contador;
       };
       })(i)
    }
  }

function ocultarFormularioBienvenida() {
    document.querySelector('#formulario-bienvenida').classList.add('d-none');
}

function mostrarInputVehiculos(){
    document.querySelector('#formulario-vehiculos').className = ''
}

function ocultarInputVehiculos(){
  document.querySelector('#formulario-vehiculos').classList.add('d-none')
}

function mostrarBotonera(){
  document.querySelector('#botonera-container').classList.remove('d-none')
}

function resetear () {
  const $inputs = document.querySelectorAll('.contador-censo')
  for (let i = 0; i < $inputs.length; i++){
        $inputs[i].value = 0
  }
}

// function juntarListas(){
// const listaTipos = obtenerListaTipos()
// const listaNumeros = obtenerListaNumeros()

 
// }

function obtenerListaTipos(){
const $listaTipos = document.querySelectorAll('.boton-censo');
const listaTipos = [];
for (let i = 0; i < $listaTipos.length; i++) {
  listaTipos.push($listaTipos[i].textContent);
  }
  return listaTipos;
}

function obtenerListaNumeros(){
  const $listaNumeros = document.querySelectorAll('.contador-censo');
  const listaNumeros = [];

for (let i = 0; i < $listaNumeros.length; i++) {
  listaNumeros.push($listaNumeros[i].value);
  }
  return listaNumeros;
} 

document.querySelector('#resetear').onclick = function(event){
  resetear();

  event.preventDefault();
}

document.querySelector('#guardar-resetear').onclick = function(event){
crearTabla();
crearTituloTabla();
crearContenidoTabla();
guardarValores();
removerGuias();
resetear();

event.preventDefault();

}


function crearTabla(){
  const $botoneraContainer = document.querySelector('#botonera-container')
  const $tabla = document.createElement('table')
  $tabla.className = 'tabla-guia'
  const $thead = document.createElement('thead')
  const $tbody = document.createElement('tbody')
  $tabla.appendChild($thead)
  $tabla.appendChild($tbody)
  $botoneraContainer.appendChild($tabla)
  
  
}

function crearTituloTabla(){
  const $cantidadRamas = document.querySelector('#formulario-bienvenida').ramas;
  const cantidadRamas = Number($cantidadRamas.value);
  const $tabla = document.querySelector('.tabla-guia')
  const $thead = $tabla.querySelector('thead');
  const $tr = document.createElement('tr');
  for (let i = 0; i < cantidadRamas; i++){
    const $numeroRama = document.createElement('th')
    $numeroRama.setAttribute("scope", "col");
    $numeroRama.textContent = 'Rama #: ' + (i + 1);
    $tr.appendChild($numeroRama)
    

  }
  $thead.appendChild($tr)
}
function crearContenidoTabla(){
  const $cantidadVehiculos = document.querySelector('#cantidad-vehiculos');
  const cantidadVehiculos = Number($cantidadVehiculos.value);
  for (let i = 0; i < cantidadVehiculos; i++){
    crearFilaTabla()
  }
}

function crearFilaTabla(){
  const $cantidadRamas = document.querySelector('#formulario-bienvenida').ramas;
  const cantidadRamas = Number($cantidadRamas.value); 
  const $tabla = document.querySelector('.tabla-guia')
  const $tbody = $tabla.querySelector('tbody');
  const $tr = document.createElement('tr');
  for (let i = 0; i < cantidadRamas; i++){
    const $valoresGuardados = document.createElement('td')
    $valoresGuardados.className = 'valores-guia'
    $tr.appendChild($valoresGuardados)
    
  }
  $tbody.appendChild($tr)
  
}

function guardarValores() {
  const $listaTablas = document.querySelectorAll('.valores-guia');
  const listaTipos = obtenerListaTipos();
  const listaNumeros = obtenerListaNumeros();
  for (let i = 0; i < $listaTablas.length; i++){
    $listaTablas[i].textContent = (listaTipos[i]) + ": " + (listaNumeros[i])
  }
}

function inputError(){
  const $input = document.querySelector('input')
  const input = $input.value;
  if (input.length > 0 && input.length < 11){
    return;

  }
  else{
    $input.classList.add('border')
    $input.classList.add('border-danger')
  }
}

function removerGuias(){
  const $tabla = document.querySelector('.tabla-guia');
  $tabla.classList.remove('tabla-guia')
  const $valores = document.querySelectorAll('.valores-guia');
  for (let i = 0; i < $valores.length; i++){
  $valores[i].classList.remove('valores-guia')
  }
}

