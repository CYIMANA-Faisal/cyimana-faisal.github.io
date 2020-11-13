document.querySelector('.sign-in-form').addEventListener('submit', function (e) {
    e.preventDefault()
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value

    const auth = firebase.auth();

    auth.signInWithEmailAndPassword(email, password).then(function (params) {
        location.assign(`dashboard.html`)
    }).catch(function(error) {
        document.querySelector('.error').textContent = 'Oooops! Username and Password are incorrect';
    });
})
