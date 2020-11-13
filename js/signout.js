document.querySelector('.sign-out').addEventListener('click', function () {
    firebase.auth().signOut().then(function() {
        location.assign(`signin.html`)
      }).catch(function(error) {
        alert(error.message)
    });
})
