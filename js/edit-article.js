const id = location.hash.slice(1);
        let imagePath = '';
        const renderUpdate = function (article) {
            const title = document.querySelector('.title');
            const content = document.querySelector('.content');
            title.value = article.title;
            content.textContent = article.content;
            imagePath = article.image;
        };
        
        const getArticle = function (id) {
            var docRef = db.collection("articles").doc(id);

            docRef.get().then(function(doc) {
                if (doc.exists) {
                    renderUpdate(doc.data());
                } else {   
                    alert("No such document in the collection!");
                }
            })
            .catch(function(error) {
                alert("Error getting document: " + error);
            });
        };

        getArticle(id);

        document.querySelector('.update-form').addEventListener('submit', function (e) {
            e.preventDefault();
            const title = e.target.elements.title.value;
            const image = e.target.elements.image.files;
            const content = e.target.elements.content.value;
            
            if(image.length === 0){
                const data = {
                    title: title,
                    content: content
                };
                db.collection("articles").doc(id).update(data).then(() => {
                    alert("Article updated successfully but the image is not");
                    location.assign(`article.html#${id}`);
                })
                .catch((error) => {
                    alert(`Update error: ${error}`);
                });
            }//END OF IF STATEMENT
            if (image.length === 1) {
                // DELETING THE FILE
                let httpsReference = firebase.storage().refFromURL(imagePath);
                httpsReference.delete().then(function() {
                    var storageRef = firebase.storage().ref().child(`articles/${image[0].name}`);
                            // UPLOADING NEW IMAGE 
                            storageRef.put(image[0]).then(function() {
                                // GETTING IT URL AFTER UPLOADING IT.
                                storageRef.getDownloadURL().then(url => {
                                    const newPath = url;
                                    // UPDATING ARTICLE IN FIRESTORE
                                    const data = {
                                        title: title,
                                        image: newPath,
                                        content: content
                                    };
                                    db.collection("articles").doc(id).update(data).then(() => {
                                        alert("Article updated successfully and the new image");
                                        location.assign(`article.html#${id}`);
                                    })
                                    .catch((error) => {
                                        alert(`Update error: ${error}`);
                                    });

                                })
                                .catch(error => {
                                    alert('Failed to get the URL');
                                });

                            })
                            .catch(function (error) {
                                alert("Failed to download image URL to be stored in firestore");
                            });
                })
                .catch(function(error) {
                    switch (error.code) {
                        case 'storage/object-not-found':
                            var storageRef = firebase.storage().ref().child(`articles/${image[0].name}`);
                            // UPLOADING NEW IMAGE 
                            storageRef.put(image[0]).then(function() {
                                // GETTING IT URL AFTER UPLOADING IT.
                                storageRef.getDownloadURL().then(url => {
                                    const newPath = url;
                                    // UPDATING ARTICLE IN FIRESTORE
                                    const data = {
                                        title: title,
                                        image: newPath,
                                        content: content
                                    };
                                    db.collection("articles").doc(id).update(data).then(() => {
                                        alert("Article updated successfully and the new image");
                                        location.assign(`article.html#${id}`);
                                    })
                                    .catch((error) => {
                                        alert(`Update error: ${error}`);
                                    });
                                })
                                .catch(error => {
                                    alert('Failed to get the URL');
                                });
                            })
                            .catch(function (error) {
                                alert("Failed to download image URL to be stored in firestore");
                            });
                        break;
                    }
                });

            }//END IF THE IF STATEMENT
        });