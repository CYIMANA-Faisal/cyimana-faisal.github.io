const renderArticlesToDashboard = function (doc) {
    const list = document.querySelector('.list');
    const item = document.createElement('div');
    item.setAttribute('class','item');

    const firstDiv = document.createElement('div');
    const h4 = document.createElement('h2');
    h4.textContent = doc.data().title;
    const i = document.createElement('i');
    i.textContent = moment(doc.data().timestamp).fromNow(); 
    firstDiv.appendChild(h4);
    firstDiv.appendChild(i);

    const secondDiv = document.createElement('div');
    secondDiv.setAttribute('class', 'actions')
    const edit = document.createElement('button');
    edit.setAttribute('class', 'btn')
    edit.setAttribute('value', doc.id);
    edit.textContent = 'Edit';
    const view = document.createElement('button');
    view.setAttribute('class', 'btn');
    const viewIcon = document.createElement("i");
    viewIcon.setAttribute('class', "fas fa-eye");
    view.appendChild(viewIcon);


    const deletebtn = document.createElement('button');
    deletebtn.setAttribute('class', 'btn');
    deletebtn.setAttribute('value', doc.id);
    deletebtn.textContent = 'Delete';
    secondDiv.appendChild(view);
    secondDiv.appendChild(edit);
    secondDiv.appendChild(deletebtn);

    item.appendChild(firstDiv);
    item.appendChild(secondDiv);
    list.appendChild(item);

    view.addEventListener('click', e => {
        location.assign(`article.html#${doc.id}`);
    });

    edit.addEventListener('click', function (e) {
        location.assign(`edit-article.html#${doc.id}`);
    });

    deletebtn.addEventListener('click', function (e) {
        
        if (confirm(`You are about to delete an article named \n ${doc.data().title}`)) {
            var docRef = db.collection("articles").doc(doc.id);
            docRef.delete().then(function() {
                alert("Document successfully deleted!");
                location.reload();
            }).catch(function(error) {
                alert("Error removing document: ", error);
            });
        }
    });
};


const getArticles = function () {
    db.collection('articles').get().then(spanshot => {
        spanshot.docs.forEach(doc => {
            renderArticlesToDashboard(doc);
        });
    });
};



const renderArticle = function (article) {
    const title = document.querySelector('#title');
    const article_content = document.querySelector('#article-content');
    const article_image = document.querySelector('#article-image');
    const timestamp = document.querySelector('.timestamp');
    title.textContent = article.title;
    article_image.src = article.image;
    article_content.textContent = article.content;
    timestamp.textContent = moment(article.timestamp).fromNow();
}
const getArticle = function (id) {
    var docRef = db.collection("articles").doc(id);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            renderArticle(doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
};
const create_article = function () {
    const form = document.querySelector('.create-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        // GETTING ALL THE VALUE FROM INPUTS
        const articleID = uuidv4();
        const title = e.target.elements.title.value;
        const image = e.target.elements.image.files[0];
        const content = e.target.elements.content.value;
        const timestamp = Date.parse(new Date());

        // CREATING IMAGE FIREBASE STORAGE REFERENCE
        const path = `articles/${image.name}`; // articles/image.ext
        
        let storageRef = firebase.storage().ref(path);
        
        // UPLOAD IMAGE FILE TO FIREBASE STORAGE
        storageRef.put(image).then( () => {
            // GET THE PATH TO THE FIREBASE STORAGE 

            storageRef.getDownloadURL().then(function(url) {
                let fullPath = url;
                // ARTICLE OBJECT

                const article = {
                    title,
                    image: fullPath,
                    content,
                    timestamp
                };  
                // ADD OBJECT TO DATABASE

                db.collection('articles').doc(articleID).set(article).then(function (){
                    alert('The article was created successfully');
                    e.target.elements.title.value = '';
                    e.target.elements.image.files[0] = '';
                    e.target.elements.content.value = '';
                    location.assign(`article.html#${articleID}`);
                }).catch(function (error) {
                    alert(`Error writing document: ${ error}`);
                });
            }).catch(function (error) {
                alert(`no image found: ${error}`);
            });
        }).catch( error => {
            alert(`Opppps error ${error} occured during file upload`);
        });     
    });
};



