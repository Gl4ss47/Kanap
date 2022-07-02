//récuperer les produit dans le local storage
let articleDansLocalStorage = JSON.parse(localStorage.getItem("cart"));
console.log(articleDansLocalStorage)
//selection de l'id dans l'html pour y inserer l'affichage dynamique
const positionPanier = document.querySelector("#cart__items");
//----------affichage des produits du panier-------
//Si le panier est vide
if (articleDansLocalStorage === null) {
  //affichage panier vide
    const panierVide = `<p>Le panier est vide</p>`;
    positionPanier.innerHTML = panierVide;
}
//insertion des nouveaux produits ajouter au panier
else {
    let structurePanier = [];
    //boucle pour recuperer un à un les article present dans le local storage et les afficher
    for (i = 0; i < articleDansLocalStorage.length; i++) {
        console.log(articleDansLocalStorage.length);
        positionPanier.innerHTML += `<article class="cart__item" data-id=${articleDansLocalStorage[i].idValeur} data-color=${articleDansLocalStorage[i].colorProduit}>
        <div class="cart__item__img">
          <img src=${articleDansLocalStorage[i].imgProduit} alt=${articleDansLocalStorage[i].altProduit}>
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${articleDansLocalStorage[i].nomProduit}</h2>
            <p>${articleDansLocalStorage[i].colorProduit}</p>
            <p>${articleDansLocalStorage[i].prixProduit}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${articleDansLocalStorage[i].quantityProduit}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
    }

}
//---supprimer un article du panier---

//selection du bouton supprimer
let suppBtn = document.querySelectorAll(".deleteItem")
console.log(suppBtn)
for (let j = 0; j < suppBtn.length; j++){
    suppBtn[j].addEventListener("click" , (event) => {
        //empecher l'actualisation de la page au click
        event.preventDefault();
        let all = articleDansLocalStorage[j].quantityProduit;
        console.log(all);
        //selection des produit via id et couleur
        let suppIdSelect = articleDansLocalStorage[j].idValeur;
        let suppColorSelect = articleDansLocalStorage[j].colorProduit;
        //nom du produit pour l'alerte
        let suppName = articleDansLocalStorage[j].nomProduit;
        console.log(suppIdSelect)
        console.log(suppColorSelect)
        console.log(j)
        //utilisation de filter pour choisir les produits à garder
        articleDansLocalStorage = articleDansLocalStorage.filter(item => item.idValeur !== suppIdSelect || item.colorProduit !== suppColorSelect);
        console.log(articleDansLocalStorage);
        //envoi de la liste de produit mise a jour dans le local storage
        localStorage.setItem("cart", JSON.stringify(articleDansLocalStorage));
        // message de rappel (confirm)
        //window.confirm("êtes-vous sur de vouloir supprimer ${nombre}${nom}${couleur} de votre panier")
        //actualisation de la page pour ne plus afficher le produit supprimé
        
        //message de confirmation de supp produit
        window.alert(`l'article ${suppName} ${suppColorSelect} a bien été supprimer du panier`)
    }) 
}

//------------------------Modifier La quantité--------------------------

function changeQuantité (){
  //selection des zones de modif de la quantité 
  let quantité = document.querySelectorAll(".itemQuantity")

  for (let k = 0; k < quantité.length; k++){
    quantité[k].addEventListener("change" , (event) => {
      event.preventDefault();
      //variable pour l'id et la couleur
      let suppIdSelect = articleDansLocalStorage[k].idValeur;
      let suppColorSelect = articleDansLocalStorage[k].colorProduit;
      // sélection du produit au quel appliquer la modification via id et couleur
      const resultat = articleDansLocalStorage.find(item => item.idValeur == suppIdSelect && item.colorProduit == suppColorSelect);
      console.log(resultat)
      //modification de la valeur
      resultat.quantityProduit = quantité[k].value;
      articleDansLocalStorage[k] = resultat;
      //envoi de la modification dans le local storage
      localStorage.setItem("cart", JSON.stringify(articleDansLocalStorage));
      //actualisation de la page 
      window.location.reload();

    })
  }
}

changeQuantité ();