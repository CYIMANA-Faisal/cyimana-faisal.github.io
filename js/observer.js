firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // 
    } else {
      location.assign(`signin.html`)
    }
});