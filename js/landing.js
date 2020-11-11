db.collection('aboutMe').get().then(function (snapshot) {
    snapshot.docs.forEach(aboutme => {
        document.querySelector('.aboutme-content').textContent = aboutme.data().bio;
    });
});
