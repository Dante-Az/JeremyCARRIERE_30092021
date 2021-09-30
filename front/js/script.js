// convertir le prix
function convertPrice(productPrice) {
    let price = `${productPrice}`;
    // constructor pour formater des nombres en fonction de la locale (fr).
    price = Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        // minimumFractionDigits indique le nombre minimum de chiffres de fraction à utiliser
        minimumFractionDigits: 2,
    }).format(price / 100);
    return price;
};
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

            //insérer le HTML dans le document
            card.innerHTML += `
            <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`
        }
    }    
}
 
    