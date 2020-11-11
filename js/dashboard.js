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


let aboutMeId = '';

db.collection('aboutMe').get().then(function (snapshot) {
    snapshot.docs.forEach(aboutme => {
        aboutMeId = aboutme.id;
        const wraper = document.querySelector('.wraper');
        wraper.textContent = aboutme.data().bio;
        const aboutContent = document.querySelector('.about-update');
        aboutContent.textContent = aboutme.data().bio;
    });
    document.querySelector('.aboutMe').addEventListener('submit', function (e) {
        e.preventDefault();

        const data = {
            bio: e.target.elements.aboutmecontent.value
        }

        db.collection('aboutMe').doc(aboutMeId).update(data).then( () => {
            alert('ABOUT ME WAS UPDATED SUCCESSFULLY');
            location.reload();
        })
        .catch( error => {
            alert('Opps: ' + error );
        });

    });
})

