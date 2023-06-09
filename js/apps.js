//variables

const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Contenedor para los resultados
const resultados = document.querySelector('#resultado');

// trae el año actual
const max = new Date().getFullYear();
const min = max - 10


//Genaramos un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision:'',
    color:'',

 }



document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos)

    llenarSelect();
})

//Evento listener para los select de busqueda
//cheng nos dise cuando un select cambio y le pasamos el evento 
marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value
    console.log(datosBusqueda)
    filtrarAutos();
    
})
year.addEventListener('change', (e) => {
    datosBusqueda.year = parseInt(e.target.value) 
  
    filtrarAutos();
    
})
minimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = e.target.value
    filtrarAutos();
})
maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = e.target.value
    filtrarAutos();
})
puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = parseInt(e.target.value)
    filtrarAutos();
})
transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value
    filtrarAutos();
})
color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value
    console.log(datosBusqueda)
    filtrarAutos();
})

function mostrarAutos(autos){

    limpiarHtml()
    autos.forEach( autos => {
        const {marca, modelo, year, puertas, transmision, precio, color} = autos
        const autoHTML =  document.createElement('P');
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - ${transmision} - ${precio} - ${color}
         `

         resultados.appendChild(autoHTML)
    } )
}

function limpiarHtml(){
    while (resultados.firstChild) {
        resultados.removeChild(resultados.firstChild)
    }
}


function llenarSelect(){

    for(let i = max; i > min; i-- ){
        console.log(i)
        const años = document.createElement('option');
        años.textContent = i
        year.appendChild(años)
    }
}

function filtrarAutos() {
    const resultado =  autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    if(resultado.length){
        console.log(resultado.length)
        mostrarAutos(resultado)
    }else{
        noResultado();
    }
   
}

function noResultado(){
    limpiarHtml();

    const noResultado  = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados ';
    resultados.appendChild(noResultado)

}


function filtrarMarca(auto){
    const {marca} = datosBusqueda
    if(marca){
        return auto.marca === marca
    }
    return auto;
}
function filtrarYear(auto){
    
    const {year} = datosBusqueda;
   
    if(year){
        return auto.year === year
    }
    return auto;
}
function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if (minimo) {
        return auto.precio >= minimo
    }
    return auto
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if (maximo) {
        return auto.precio <= maximo
    }
    return auto;
}
function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if (puertas) {
        return auto.puertas === puertas
    }
    return autos
}

function filtrarTransmision (auto){
        const { transmision} = datosBusqueda;
        if (transmision) {
            return auto.transmision === transmision
        }
        return auto;
}
function filtrarColor (auto){
    const {color } = datosBusqueda;
    if (color) {
        return auto.color === color
     }
     return auto;
}