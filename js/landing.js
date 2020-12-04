db.collection('aboutMe').get().then(function (snapshot) {
    snapshot.docs.forEach(aboutme => {
        document.querySelector('.aboutme-content').textContent = aboutme.data().bio;
    });
});


db.collection('projects').get().then(function (snapshot) {
    snapshot.docs.forEach(function (project) {
        const projectCard = document.querySelector('.project-cards')
        const card = document.createElement('div')
        card.setAttribute('class', 'card')
        const img = document.createElement('img')
        img.setAttribute('class', 'project-image')
        img.src = project.data().imageUrl
        card.appendChild(img)
        projectCard.appendChild(card)
    })
})