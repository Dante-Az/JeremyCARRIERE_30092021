// On recupere l'url de l'api grâce à fetch
// Le 1er then transforme la réponse en json
// Le 2ème affiche les données dans la fonction addCards
getArticles();

function getArticles()  {
    fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(data => addCards(data))
    .catch((erreur) => {
        console.log("erreur : " + erreur)
        alert("Les produits ne sont pas accessibles actuellement")
    });

    // fonction pour la création des cards de la page d'accueil
    function addCards(data) {
        //boucle pour afficher chaque produit contenue dans l'API dans une carte 
        for (product of data) {
            // recupere l'élément list dans le HTML
            const card = document.getElementById("items");
            // convertit le prix
            const price = convertPrice(product.price);

            let productLink = document.createElement("a");
            document.getElementById("items").appendChild(productLink);
            productLink.href = `./product.html?id=${product._id}`;

            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);
            
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = `${product.imageUrl}`;
            productImg.alt = `${product.altTxt}`;

            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = `${product.name}`;

            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productDescription");
            productDescription.innerHTML = `${product.description}`;

            let productPrice = document.createElement("span");
            productArticle.appendChild(productPrice);
            productPrice.innerHTML = `${price}`;
        }
    }    
}

    