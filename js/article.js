const id = location.hash.slice(1);
getArticle(id);
const renderComments = function (id) {
    db.collection('comments').orderBy("timestamp", 'desc').where('articleID', '==', id).get().then( (snapshot) => {
        snapshot.forEach((doc) => {
            
            // RENDER STARTS FROM HERE
            const container = document.querySelector('.comment-wraper');
            const commentDiv = document.createElement('div');
            commentDiv.setAttribute('class', 'comment');
            const commentor = document.createElement('div');
            commentor.setAttribute('class', 'commentor');
            const avatar = document.createElement('img');
            avatar.setAttribute('src', '../images/profiles/avatar.png');
            const span = document.createElement('span')
            span.textContent = doc.data().name;
            const br = document.createElement('br');
            const time = document.createElement('i');
            time.textContent = moment(doc.data().timestamp).fromNow();
            const content = document.createElement('p');
            content.textContent = doc.data().comment;

            span.appendChild(br);
            span.appendChild(time);
            commentor.appendChild(avatar);
            commentor.appendChild(span);
            commentDiv.appendChild(commentor);
            commentDiv.appendChild(content);
            
            container.appendChild(commentDiv);
        });
    }).catch( error => {
        console.log(`opps an error: ${error}` );
    })
}
renderComments(id);
// CREATE COMMENT
const commentForm = document.querySelector('.comment-form');
commentForm.addEventListener('submit', e => {
    e.preventDefault();
    const articleID = id;
    const name = e.target.elements.name.value;
    const comment = e.target.elements.comment.value;
    const timestamp = Date.parse(new Date());

    const data = {
        articleID, 
        name,
        comment,
        timestamp
    };
    e.target.elements.name.value = '';
    e.target.elements.comment.value = '';

    db.collection('comments').doc(uuidv4()).set(data).then( () => {
        document.querySelector('.comment-wraper').innerHTML = '';
        renderComments(id);
    }).catch(error => {
        alert(`Ooops the error: ${error}`);
    });
});