const blogRenderArticles = function () {
    db.collection('articles').get().then((snapshot) => {
        
        // <div class="container grid">
        //     <div class="blog-card">
        //         <a href="article.html">
        //             <div class="Blog-info">
        //                 <img class="image" src="../images/profiles/faisal pp.JPG" alt="" ALIGN="left">
        //                 <h4>ATLP tenant @ Andele-Kigali</h4>
        //                 <i>Oct 25, 2020</i>
        //                 <h3 class="blog-tittle">The art of programming and productivity in web-developent</h3>
        //             </div>
        //         </a>
        //         <div class="some-content">
        //             <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
        //         </div>
        //     </div>
        // </div>
        snapshot.docs.forEach( (article) => {
            const blog = document.querySelector('.blogs');
            const articleCard = document.createElement('div');
            articleCard.setAttribute('class', 'container grid');
            const blogCard = document.createElement('div');
            blogCard.setAttribute('class', 'blog-card');
            const link = document.createElement('a');
            link.setAttribute('class', 'link');
            link.setAttribute('href', `article.html#${article.id}`);
            const info = document.createElement('div');
            info.setAttribute('class', 'Blog-info');
            
            const img = document.createElement('img');
            img.setAttribute('class', 'image');
            img.setAttribute('ALIGN', 'left');
            img.setAttribute('src', '../images/profiles/faisal pp.JPG')
            const h4 = document.createElement('h4');
            h4.textContent = 'ATLP tenant @ Andele-Kigali';
            const date = document.createElement('i');
            date.textContent = moment(article.data().timestamp).fromNow();
            const h3 = document.createElement('h3');
            h3.setAttribute('class', 'blog-tittle');
            h3.textContent = article.data().title;
            const content = document.createElement('div');
            content.setAttribute('class', 'some-content');
            const par = document.createElement('p');
            const readymore = document.createElement('a');
            readymore.textContent = 'Read more';
            readymore.setAttribute('href', `article.html#${article.id}`);
            readymore.setAttribute('class', 'read');
            par.textContent = article.data().content.slice(0,1000) + "......"; 
            par.appendChild(readymore);


            info.appendChild(img);
            info.appendChild(h4);
            info.appendChild(date);
            info.appendChild(h3);
            link.appendChild(info);
            content.appendChild(par);
            blogCard.appendChild(link);
            blogCard.appendChild(content);
            articleCard.appendChild(blogCard);
            blog.appendChild(articleCard);

            
        });

    })
    .catch((error) => {

    });
}
blogRenderArticles();