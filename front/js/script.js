fillSection();

/**recup api */
async function getArticles() {
    var articlesCatch = await fetch("http://localhost:3000/api/products")
    return articlesCatch.json();
}

/**  Répartition des données de l'API dans le DOM **/
function fillSection() {
    getArticles()
        .then(function (resultatAPI) {
            const articles = resultatAPI;
            for (let article in articles) {

                /**recup du lien */
                let productLink = document.createElement("a");
                document.querySelector(".items").appendChild(productLink);
                productLink.href = `product.html?id=${resultatAPI[article]._id}`;

                /**recup de l'article */
                let productArticle = document.createElement("article");
                productLink.appendChild(productArticle);

                /**recup de l'image */
                let productImg = document.createElement("img");
                productArticle.appendChild(productImg);
                productImg.src = resultatAPI[article].imageUrl;
                productImg.alt = resultatAPI[article].altTxt;

                /**recup du titre **/
                let productName = document.createElement("h3");
                productArticle.appendChild(productName);
                productName.classList.add("productName");
                productName.innerHTML = resultatAPI[article].name;

                /**recup du paragraphe */
                let productDescription = document.createElement("p");
                productArticle.appendChild(productDescription);
                productDescription.classList.add("productName");
                productDescription.innerHTML = resultatAPI[article].description;
            }
        })
        .catch(function (error) {
            return error;
        });
}