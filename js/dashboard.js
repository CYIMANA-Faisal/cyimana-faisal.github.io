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

// ABOUT ME HANDLES

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
});

// PROJECT HANDLES
const renderProjects = function () {
    // <div class="project-item">
    //     <img src="../images/projects/mflix.jpg" alt="" class="project-image">
    //     <button class="btn">Remove</button>
    // </div>


    db.collection('projects').get().then(function (snapshot) {
        snapshot.docs.forEach(function (project) {
            const containter = document.querySelector('.project-wraper')
            const div = document.createElement('div')
            div.setAttribute('class', 'project-item')

            const img = document.createElement('img')
            img.setAttribute('class', 'project-image')
            img.setAttribute('src', project.data().imageUrl)

            const btn = document.createElement('button')
            btn.setAttribute('class', 'btn')
            btn.textContent = 'Remove'

            div.appendChild(img)
            div.appendChild(btn)
            containter.appendChild(div)

            btn.addEventListener('click', function (e) {
                db.collection('projects').doc(project.id).delete().then(function () {
                    alert("project removed from the database")
                })
            })
        })
    })
    .catch(function (error) {
        console.log(error)
    })

}

renderProjects()

document.querySelector('.add-project-modal').addEventListener('submit', function(e){
    e.preventDefault();
    const image = e.target.elements.projectImage.files[0];
    const description = e.target.elements.description.value;

    var storageRef = firebase.storage().ref(`projects/${image.name}`)
    storageRef.put(image).then(function () {
        
        storageRef.getDownloadURL().then(function (url) {
            const urlPath = url
            const data = {
                imageUrl:urlPath,
                description: description
            }
            db.collection('projects').doc().set(data).then(function () {
                console.log('Project created well');
                location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
        })
        .catch(function (error) {
            console.log('failed to get image url' + error)
        });
    })
    .catch(function (error) {
        console.log(error);
    })

    

})





