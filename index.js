document.querySelector('#datos-boton').onclick = function(event) {
    const $cantidadVehiculos = document.querySelector('#cantidad-vehiculos');
    const cantidadVehiculos = Number($cantidadVehiculos.value);
    const $cantidadRamas = document.querySelector('#cantidad-ramas');
    const cantidadRamas = Number($cantidadRamas.value);  

    crearInputVehiculos(cantidadVehiculos);
    ocultarFormularioBienvenida();
    mostrarInputVehiculos(); 

    event.preventDefault(); 

}

function crearInputVehiculos(cantidadVehiculos) {
        for (let i = 0; i < cantidadVehiculos; i++) {
            crearInputVehiculo(i);
        }
}

function crearInputVehiculo(indice){
        const $div = document.createElement('div');
        $div.className = 'tipoVehiculo';
      
        const $label = document.createElement('label');
        $label.textContent = 'Tipo de vehiculo #: ' + (indice + 1);
        
        const $input = document.createElement('input');
        $input.type = 'text';
        $input.id = 'vehiculo#'+(indice + 1)
              
        $div.appendChild($label);
        $div.appendChild($input);
      
        const $tiposVehiculos = document.querySelector('#tipos-vehiculos');
        $tiposVehiculos.appendChild($div);
}

document.querySelector('#comenzar-boton').onclick = function(event) {
  const $cantidadVehiculos = document.querySelector('#cantidad-vehiculos');
  const cantidadVehiculos = Number($cantidadVehiculos.value);
  const $cantidadRamas = document.querySelector('#cantidad-ramas');
  const cantidadRamas = Number($cantidadRamas.value);  

  obtenerListaVehiculos() ;
  crearFilas(cantidadVehiculos);     
  crearGrilla (cantidadVehiculos, cantidadRamas);    
  ordenarId(cantidadVehiculos, cantidadRamas);
  sumarUnidades();
  ocultarInputVehiculos();
  mostrarBotonera();    
  event.preventDefault(); 
  
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
    $fila.id = 'fila' + (i + 1)
    $botoneraCenso.appendChild($fila);
  }
}

function listaFilas(){
  const $filas = document.querySelectorAll('.row');
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
    document.querySelector('#formulario-bienvenida').className = 'd-none';
}

function mostrarInputVehiculos(){
    document.querySelector('#formulario-vehiculos').className = ''
}

function ocultarInputVehiculos(){
  document.querySelector('#formulario-vehiculos').className = 'd-none'
}

function mostrarBotonera(){
  document.querySelector('#botonera-censo').className = ''
}
