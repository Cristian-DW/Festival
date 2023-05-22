document.addEventListener('DOMContentLoaded', function(){
    iniciar();
});

function iniciar(){
    navFijo();
    crearGaleria();
    scrollNav();

}

function navFijo(){
    const barra= document.querySelector('.header');
    const elemento= document.querySelector('.sobre-festival');
    const body= document.querySelector('body');

    window.addEventListener('scroll', function(){

        if(elemento.getBoundingClientRect().top < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav(){
    const enlaces= document.querySelectorAll('.header__nav a');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e){
            e.preventDefault();

            const seccionScroll= e.target.attributes.href.value;
            const seccion =document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});
        });
    });
}

function crearGaleria(){
    const galeria = document.querySelector(".galeria-imagenes");

    for(let i=1; i<=12; i++){
        const imagen= document.createElement('picture');
        imagen.innerHTML=`
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="300" height="100"src="build/img/thumb/${i}.jpg"alt="imagen galeria">`;

        imagen.onclick = function(){
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id){
    const imagen= document.createElement('picture');
    imagen.innerHTML=`
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="auto" height="auto"src="build/img/grande/${id}.jpg"alt="imagen galeria">`;
    //crear overlay
    const overlay = document.createElement('DIV');

    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    //modal
    const cerrar= document.createElement('p');
    cerrar.textContent='x';
    cerrar.classList.add('modal');
    //agregar evento
    cerrar.onclick=function(){
        const body=document.querySelector("body");
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    //agregar al overlay
    overlay.appendChild(cerrar);

    //agregar al html
    const body=document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}