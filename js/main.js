// /*####################################
//     project carousel js
// ####################################*/
// const projecSlider = document.querySelector(".project-slider")
// const projectLeftArrow = document.querySelector(".project-left")
// const projectRightArrow = document.querySelector(".project-right")

// let projectSectionIndex = 0

// projectLeftArrow.addEventListener('click', function(){
//     projectSectionIndex = ( projectSectionIndex > 0 ) ? projectSectionIndex -1 : 0
//     projecSlider.style.transform = "translate(" + (projectSectionIndex) * -25 + "%)"
// })

// projectRightArrow.addEventListener('click', function(){
//     projectSectionIndex = ( projectSectionIndex < 3 ) ? projectSectionIndex +1 : 3
//     projecSlider.style.transform = "translate(" + (projectSectionIndex) * -25 + "%)"
// })

// /*####################################
//     Testimonial carousel js
// ####################################*/
// const slider = document.querySelector(".slider")
// const leftArrow = document.querySelector(".left")
// const rightArrow = document.querySelector(".right")

// let sectionIndex = 0

// leftArrow.addEventListener('click', function(){
//     sectionIndex = ( sectionIndex > 0 ) ? sectionIndex -1 : 0
//     slider.style.transform = "translate(" + (sectionIndex) * -25 + "%)"
// })

// rightArrow.addEventListener('click', function(){
//     sectionIndex = ( sectionIndex < 3 ) ? sectionIndex +1 : 3
//     slider.style.transform = "translate(" + (sectionIndex) * -25 + "%)"
// })



const bugger = document.querySelector('.bugger')
const navigation = document.querySelector('.navigation')
bugger.addEventListener('click', function () {
    navigation.classList.toggle('hide');
})
