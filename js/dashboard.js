document.querySelector("#edit-about-me").addEventListener('click', function(){
    document.querySelector('.edit-about-modal').style.display = 'flex';
})
document.querySelector(".close").addEventListener('click', function(){
    document.querySelector('.edit-about-modal').style.display = 'none';
})


document.querySelector("#add-project").addEventListener('click', function(){
    document.querySelector('.add-project-modal').style.display = 'flex';
})
document.querySelector(".project-close").addEventListener('click', function(){
    document.querySelector('.add-project-modal').style.display = 'none';
})
