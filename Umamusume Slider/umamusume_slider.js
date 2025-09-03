const slides = document.querySelectorAll(".slides img");

let slide_index = 0;

let interval_id = null;

// initialize_slider();

document.addEventListener("DOMContentLoaded", initialize_slider);

function initialize_slider(){

    if(slides.length > 0){

    slides[slide_index].classList.add("display_slide");

    interval_id = setInterval(next_slide, 3000);
    }

}

function show_slide(index){

    if(index >= slides.length){
        slide_index = 0;
    }

    else if(index < 0){
        slide_index = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove("display_slide");
    });

    slides[slide_index].classList.add("display_slide");

}

function previous_slide(){
    clearInterval(interval_id);
    slide_index--
    show_slide(slide_index);
}

function next_slide(){
    clearInterval(interval_id);
    slide_index++;
    show_slide(slide_index);
}