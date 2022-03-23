let storedProduct = JSON.parse(localStorage.getItem("produit"));

addCartCards();

function addCartCards(){
    for (product of storedProduct) {
        const price = convertPrice(product.price);
        let cartItem = document.getElementById("cart__items")

        let productArticle = document.createElement("article");
        cartItem.appendChild(productArticle);
        productArticle.classList.add("cart__item");
        productArticle.setAttribute("data-id", `${product._id}`);
        productArticle.setAttribute("data-color", `${product.color}`);
    

        let productCartImg = document.createElement("div");
        productArticle.appendChild(productCartImg);
        productCartImg.classList.add("cart__item__img");

        let productImg = document.createElement("img");
        productCartImg.appendChild(productImg);
        productImg.src = `${product.image}`;
        productImg.alt = `${product.alt}`;

        console.log(product.name)

        let productCartContent = document.createElement("div");
        productArticle.appendChild(productCartContent);
        productCartContent.classList.add("cart__item__content");

        let productCartContentPrice = document.createElement("div");
        productCartContent.appendChild(productCartContentPrice);
        productCartContentPrice.classList.add("cart__item__content__titlePrice");

        let productName = document.createElement("h2");
        productCartContentPrice.appendChild(productName);
        productName.innerHTML = `${product.name}`;

        let productColor = document.createElement("p");
        productName.appendChild(productColor);
        productColor.innerHTML = `(${product.color})`

        let productPrice = document.createElement("p");
        productCartContentPrice.appendChild(productPrice);
        productPrice.innerHTML = `${price}`;

        let productCartContentSettings = document.createElement("div");
        productCartContent.appendChild(productCartContentSettings);
        productCartContentSettings.classList.add("cart__item__content__settings");

        let productCartContentSettingsQuantity = document.createElement("div");
        productCartContentSettings.appendChild(productCartContentSettingsQuantity);
        productCartContentSettingsQuantity.classList.add("cart__item__content__settings__quantity"); 

        let productCartContentSettingsQuantityP = document.createElement("p");
        productCartContentSettingsQuantity.appendChild(productCartContentSettingsQuantityP);
        productCartContentSettingsQuantityP.innerHTML = "Qté : ";

        let productCartContentSettingsQuantityInput = document.createElement("input");
        productCartContentSettingsQuantity.appendChild(productCartContentSettingsQuantityInput);
        productCartContentSettingsQuantityInput.setAttribute("type", "number");
        productCartContentSettingsQuantityInput.setAttribute("class", "itemQuantity");
        productCartContentSettingsQuantityInput.setAttribute("name", "itemQuantity");
        productCartContentSettingsQuantityInput.setAttribute("min", "1");
        productCartContentSettingsQuantityInput.setAttribute("max", "100");
        productCartContentSettingsQuantityInput.setAttribute("value", `${product.quantity}`);

        let productCartContentSettingsDelete = document.createElement("div");
        productCartContentSettings.appendChild(productCartContentSettingsDelete);
        productCartContentSettingsDelete.classList.add("cart__item__content__settings__delete");

        let productCartContentSettingsDeleteP = document.createElement("p");
        productCartContentSettingsDelete.appendChild(productCartContentSettingsDeleteP);
        productCartContentSettingsDeleteP.classList.add("deleteItem");
        productCartContentSettingsDeleteP.innerHTML = "Supprimer";      
    }
}
//Affichage du total
let totalQuantity = document.getElementById("totalQuantity");
totalQuantity.innerHTML = totalQuantityDisplay();

let totalPrice = document.getElementById("totalPrice");
totalPrice.innerHTML = `${convertPrice(totalPriceDisplay())}`;  
//Calcul du prix
function totalPriceDisplay() {
    let totalPrice = 0;
    storedProduct.forEach(product => totalPrice += product.price * product.quantity); 
    return totalPrice;
}
//Calcul de la quantité
function totalQuantityDisplay() {
    let totalQuantity = 0
    storedProduct.forEach(product => totalQuantity += parseInt(product.quantity)); 
    return totalQuantity;
}
//Fonction pour actualiser le prix et le nombre d'articles
function actuTotal() {
    totalPriceDisplay();
    totalQuantityDisplay();
    document.getElementById("totalQuantity").innerHTML = totalQuantityDisplay();
    document.getElementById("totalPrice").innerHTML = `${convertPrice(totalPriceDisplay())}`;
}
// Gestion du bouton de suppression

let deleteItem = document.querySelectorAll(".deleteItem");
console.log(deleteItem);

for (let i = 0; i < deleteItem.length; i++){
    deleteItem[i].addEventListener("click", (event) =>{
        event.preventDefault();
        delItm();
    })

    // on sélectionne l'id et la couleur du produit qui va être supprimé en appuyant sur le bouton
    let deletedId = storedProduct[i]._id;
    let deletedColor = storedProduct[i].color;

    function delItm(){
        // Méthode "filter" pour supprimer l'élément du tableau
        storedProduct = storedProduct.filter( obj => obj._id !== deletedId || obj.color !== deletedColor);
        console.log(storedProduct);
       
        // Mise à jour du local storage
        document.querySelector(`[data-id='${deletedId}']` && `[data-color='${deletedColor}']`).remove();
        localStorage.setItem("produit", JSON.stringify(storedProduct));
        actuTotal();
        new Swal({
            title: "Le produit a bien été supprimé",
            icon: "success",
            iconColor: "#3498db",
            showConfirmButton: false,
            timer: 2000,
          });
        }
}
// Ecoute du changement de quantité de produit

let quantityChange = document.querySelectorAll(".itemQuantity");

for (let j = 0; j < quantityChange.length; j ++){
    quantityChange[j].addEventListener("change", () =>{
        
        storedProduct[j].quantity = quantityChange[j].value;
        
        if(quantityChange[j].value == 0){
            let deletedId = storedProduct[j].name;
            let deletedColor = storedProduct[j].color;
            // Méthode "filter" pour supprimer l'élément du tableau
            storedProduct = storedProduct.filter( obj => obj.name !== deletedId || obj.color !== deletedColor);
            console.log(storedProduct);
            // Mise à jour du local storage
            document.querySelector(`[data-id='${deletedId}']` && `[data-color='${deletedColor}']`).remove();
            localStorage.setItem("produit", JSON.stringify(storedProduct));
            actuTotal();
            new Swal({
                title: "Le produit a bien été supprimé",
                icon: "success",
                iconColor: "#3498db",
                showConfirmButton: false,
                timer: 2000,
              });
        }else{
        localStorage.setItem("produit", JSON.stringify(storedProduct));
        actuTotal();
    }
    })
}
console.log(storedProduct);
console.log(totalPrice);
console.log(totalQuantity);

// Mise en place des RegEx
const order = document.getElementById("order");
console.log(order);

//Validation du formulaire
const firstNameRegEx =/^([a-zA-Z'\-àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+)$/gmi;
const lastNameRegEx = /^(([a-zA-Z'\-àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+)+)$/gmi;
const addressRegEx = /^[a-zA-Z0-9\s,.'-]{3,}$/gmi;
const cityRegEx = /^([a-zA-Z\àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+(?:. |-| |'))*[a-zA-Z\àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]*$/gmi
const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

order.addEventListener("click", (event) => {
    // Empêcher le rechargement de la page
    event.preventDefault();

    // Infos à envoyer en POST
    let contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
    };
    // Vérification des informations saisies
    if (
        (firstNameRegEx.test(contact.firstName) == true) &
        (lastNameRegEx.test(contact.lastName) == true) &
        (addressRegEx.test(contact.address) == true) &
        (cityRegEx.test(contact.city) == true)  &
        (emailRegEx.test(contact.email) == true)
        ){
        
        let products = [];
        for (listId of storedProduct) {
            products.push(listId._id)
        }

        // Envoi en POST les produits sélectionnés et le formulaire
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                contact,
                products
            }),
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("order", JSON.stringify(data));
            document.location.href = "confirmation.html";
        })
        .catch(erreur => console.log("erreur : " + erreur));
    }else{
        alert("Certaines informations saisies ne sont pas conformes");
    }
})
