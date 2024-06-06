const slider = document.getElementById('slider');
const backgroundImage = document.querySelector('.background-image');

slider.addEventListener('mouseenter', () => {
    backgroundImage.style.filter = "none";
    slider.querySelectorAll('.slide').forEach(slide => {
        slide.style.filter = "blur(5px)";
    });
});

slider.addEventListener('mouseleave', () => {
    backgroundImage.style.filter = "blur(5px)"; 
    slider.querySelectorAll('.slide').forEach(slide => {
        slide.style.filter = "none"; 
    });
});

backgroundImage.addEventListener('mouseenter', () => {
    slider.querySelectorAll('.slide').forEach(slide => {
        slide.style.filter = "none"; 
    });
    backgroundImage.style.filter = "blur(5px)"; 
});

backgroundImage.addEventListener('mouseleave', () => {
    slider.querySelectorAll('.slide').forEach(slide => {
        slide.style.filter = "blur(5px)";
    });
    backgroundImage.style.filter = "none"; 
});