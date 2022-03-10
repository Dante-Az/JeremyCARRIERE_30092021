let storedProduct = JSON.parse(localStorage.getItem("produit"));

// calcul du total
function totalPriceDisplay() {
    let totalPrice = 0;
    storedProduct.forEach(product => totalPrice += product.price * product.quantity);
    return totalPrice;
}
function totalQuantityDisplay() {
    let totalQuantity = 0
    storedProduct.forEach(product => totalQuantity += parseInt(product.quantity));
    return totalQuantity;
}

for (product of storedProduct) {
    const price = convertPrice(product.price);
    let cartItem = document.getElementById("cart__items")

    let productArticle = document.createElement("article");
    cartItem.appendChild(productArticle);
    productArticle.classList.add("cart__item");
    productArticle.setAttribute("data-id", `${product._id}`);
    

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
    productName.innerHTML = `${product.name}` + '(' + (`${product.color}`) + ')';

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


    let totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.innerHTML = totalQuantityDisplay();

    let totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML = `${convertPrice(totalPriceDisplay())}`;

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
    let deletedName = storedProduct[i].name;
    let deletedColor = storedProduct[i].color;
    console.log("deletedName");
    console.log(deletedName);
    function delItm(){
        // Méthode "filter" pour supprimer l'élément du tableau
        storedProduct = storedProduct.filter( obj => obj.name !== deletedName || obj.color !== deletedColor);
        console.log(storedProduct);
       
        // Mise à jour du local storage
        localStorage.setItem("produit", JSON.stringify(storedProduct));
        location.reload();
        alert("Vous avez supprimé ce produit")
        }
}
// Ecoute du changement de quantité de produit

let quantityChange = document.querySelectorAll(".itemQuantity");

for (let j = 0; j < quantityChange.length; j ++){
    quantityChange[j].addEventListener("change", () =>{
        
        storedProduct[j].quantity = quantityChange[j].value;
        
        if(quantityChange[j].value == 0){
            let deletedName = storedProduct[j].name;
            let deletedColor = storedProduct[j].color;
            // Méthode "filter" pour supprimer l'élément du tableau
            storedProduct = storedProduct.filter( obj => obj.name !== deletedName || obj.color !== deletedColor);
            // Mise à jour du local storage
            localStorage.setItem("produit", JSON.stringify(storedProduct));
            location.reload();
            alert("Vous avez supprimé ce produit")
        }else{
        localStorage.setItem("produit", JSON.stringify(storedProduct));
        location.reload();
    }
    })
}
console.log(storedProduct);

// Mise en place des RegEx
const order = document.getElementById("order");
console.log(order);

//Validation du formulaire
const firstNameRegEx =/^([a-zA-Z'\-àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+)$/gmi;
const lastNameRegEx = /^((?:[ ]?[a-zA-Z'\-àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+)+)$/gmi;
//const addressRegEx =
//const cityRegEx =
//const emailRegEx =

order.addEventListener("click", (event) => {
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
        (cityRegEx.test(contact.city) == true) &
        (email.test(contact.email) == true) 
        ){
        // Empêcher le rechargement de la page
        event.preventDefault();

        let products = [];
        for (listId of storedProduct) {
            products.push(listId.id)
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
