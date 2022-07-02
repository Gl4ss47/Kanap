/** 1-afficher le bon cannapé */

// Variables et constantes
var str = window.location.href
var url = new URL(str);
var idProduct = url.searchParams.get("id");
let article = "";
const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");




getArticle();

// Récupération des articles de l'API
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
        .then((res) => {
            return res.json();
        })

        // Répartition des données de l'API dans le DOM
        .then(function (resultatAPI) {
            article = resultatAPI;
            if (article) {
                getPost(article);
            }
        })
        .catch((error) => {
            console.log("error");
        })
}

function getPost(article) {
    // Insertion de l'image
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Insertion du titre "h1"
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // Insertion du prix
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Insertion de la description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Insertion des options de couleurs
    for (let colors of article.colors) {
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
}
/** 2-ajouter un cannapé au panier */
function ajouterAuPanier(article) {

}


//bouton ajouter au panier
const btn_panier = document.querySelector("#addToCart");


//ecouter et envoyer le panier
btn_panier.addEventListener("click", (event) => {
    //empecher l'actualisation de la page au click sur ajouter au panier            
    event.preventDefault();
    //valide seulement si une quantité et une couleur sont selectionné
    if (quantityPicked.value > 0 && quantityPicked.value <= 100 && quantityPicked.value != 0 && colorPicked.value != 0) {
        //Selection de l'id des formulaires couleur et quantité
        let choixColor = colorPicked.value;
        let choixQuantity = quantityPicked.value;
        //recuperation des valeurs
        let valeurProduit = {
            idValeur: idProduct,
            nomProduit: article.name,
            colorProduit: choixColor,
            quantityProduit: choixQuantity,
            imgProduit: article.imageUrl,
            altProduit: article.altTxt,
            prixProduit: article.price
        }
        console.log(idProduct)
        console.log(valeurProduit)
        //--fenetre de popup--
        //fenetre de validation de l'ajout au panier + redirection vers le panier
        const popupValidation = () => {
            if (window.confirm(`Votre commande de ${choixQuantity} ${article.name} ${choixColor} a bien été ajoutée au panier.
            Pour acceder à votre panier, cliquez sur OK`)) {
                window.location.href = "cart.html";
            }
        }

        //-------LOCAL STORAGE-------
        // stocker les valeurs du formulaire ajouter au panier dans le local storage
        //verification des articles dans le local storage
        let articleDansLocalStorage = JSON.parse(localStorage.getItem("cart"));
        //ajout au local storage
        const ajouterArticleAuLocalStorage = () => {
            articleDansLocalStorage.push(valeurProduit);
            localStorage.setItem("cart", JSON.stringify(articleDansLocalStorage));
        }
        //S'il y a deja des articles
        if (articleDansLocalStorage) {
            const articleDejaPresant = articleDansLocalStorage.find(
                (element) => element.idValeur == idProduct && element.colorProduit == choixColor);
            //si il existe deja
            if (articleDejaPresant) {
                let nouvelleQuantité = parseInt(valeurProduit.quantityProduit) + parseInt(articleDejaPresant.quantityProduit);
                articleDejaPresant.quantityProduit = nouvelleQuantité;
                localStorage.setItem("cart", JSON.stringify(articleDansLocalStorage));
                popupValidation();
            }
            //si il n'existe pas
            else {
                ajouterArticleAuLocalStorage();
                popupValidation();
            }
            console.log(articleDansLocalStorage);
        }
        //s'il n'y a rien
        else {
            articleDansLocalStorage = [];
            ajouterArticleAuLocalStorage();
            popupValidation();
        }
    }
    //si couleur ou quantité non-selectioné
    else {
        //fenetre de notification qu'il faut selectionné une quantité et une couleur
        const popupInfo = () => {
            window.alert(`Veuillez selectionner une couleur et une quantité pour pouvoir ajouter ce canapé à votre panier`)
        }
        popupInfo();
    }
});





