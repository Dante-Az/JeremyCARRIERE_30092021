let storedProduct = JSON.parse(localStorage.getItem("produit"));

addCartCards();

// Fonction qui crée les éléments du panier
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
    document.querySelector(`[data-id='${deletedId}'][data-color='${deletedColor}']`).remove();
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

for (let j = 0; j < quantityChange.length; j++){
    quantityChange[j].addEventListener("change", () =>{
        
        storedProduct[j].quantity = quantityChange[j].value;
        
        if(quantityChange[j].value == 0){
            let deletedId = storedProduct[j].name;
            let deletedColor = storedProduct[j].color;
            // Méthode "filter" pour supprimer l'élément du tableau
            storedProduct = storedProduct.filter( obj => obj.name !== deletedId || obj.color !== deletedColor);
            console.log(storedProduct);
            // Mise à jour du local storage
            document.querySelector(`[data-id='${deletedId}'][data-color='${deletedColor}']`).remove();
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

// Mise en place des RegEx
const order = document.getElementById("order");
console.log(order);

// Validation du formulaire

// On définit les regEX que l'utilisateur va devoir respecter pour valider le formulaire
const firstNameRegEx =/^(?!-)(?!')(?!.*-$)(?!.*'$)([a-zA-Z'\-àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+){2,}$/i;
const lastNameRegEx = /^(?!-)(?!')(?!.*-$)(?!.*'$)((?:[ ]?[a-zA-Z'\-àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+)+){2,}$/i;
const addressRegEx = /^[a-zA-Z0-9\s,.'-]{3,}$/i;
const cityRegEx = /^(?!-)(?!')(?!.*-$)(?!.*'$)([a-zA-Z\àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+(?:. |-| |'))*[a-zA-Z\àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]*$/i
const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,6}$/;

// On récupère nos balises d'input du formulaire
let inputFirstName = document.querySelectorAll(
    ".cart__order__form__question input"
  )[0];
let inputLastName = document.querySelectorAll(
    ".cart__order__form__question input"
  )[1];
let inputAddress = document.querySelectorAll(
    ".cart__order__form__question input"
  )[2];
let inputCity = document.querySelectorAll(
    ".cart__order__form__question input"
  )[3];
let inputEmail = document.querySelectorAll(
    ".cart__order__form__question input"
  )[4];

// EventListener qui surveille le changement du prénom
inputFirstName.addEventListener("change", (e) => {
    validFirstName(e.target.value);
    contact.firstName = e.target.value;
  });
  // EventListener qui surveille le changement du nom de famille
  inputLastName.addEventListener("change", (e) => {
    validLastName(e.target.value);
    contact.lastName = e.target.value;
  });
  // EventListener qui surveille le changement de l'adresse
  inputAddress.addEventListener("change", (e) => {
    validAddress(e.target.value);
    contact.address = e.target.value;
  });
  // EventListener qui surveille le changement de la ville
  inputCity.addEventListener("change", (e) => {
    validCity(e.target.value);
    contact.city = e.target.value;
  });
  // EventListener qui surveille le changement de l'email
  inputEmail.addEventListener("change", (e) => {
    validEmail(e.target.value);
    contact.email = e.target.value;
  });

// On récupère les balises d'erreurs
let firstNameErr = document.getElementById("firstNameErrorMsg");
let lastNameErr = document.getElementById("lastNameErrorMsg");
let addressErr = document.getElementById("addressErrorMsg");
let cityErr = document.getElementById("cityErrorMsg");
let emailErr = document.getElementById("emailErrorMsg");

validForm = false;

// Fonction pour afficher les messages d'erreur
function validFirstName(firstName){
    if(firstName.length == 0){
        firstNameErr.innerHTML = "Votre prénom n'est pas renseigné";
        validForm = false;
    }else if (firstNameRegEx.test(firstName)) {
        firstNameErr.innerText = "";
        validForm = true;
      }else{
        firstNameErr.innerText = "Votre prénom ne doit pas commencer ou finir par un symbole et doit contenir au moins 2 lettres";
        validForm = false;  
    }
}
function validLastName(lastName){
    if(lastName.length == 0){
        lastNameErr.innerHTML = "Votre nom n'est pas renseigné";
        validForm = false;
    }else if (lastNameRegEx.test(lastName)) {
        lastNameErr.innerText = "";
        validForm = true;
      }else{
        lastNameErr.innerText = "Votre nom ne doit pas commencer ou finir par un symbole et doit contenir au moins 2 lettres";
        validForm = false;  
    }
}
function validAddress(address){
    if(address.length == 0){
        addressErr.innerHTML = "Votre adresse n'est pas renseignée";
        validForm = false;
    }else if(addressRegEx.test(address)) {
        addressErr.innerText = "";
        validForm = true;
    }else{
        addressErr.innerText = "Cette adresse n'est pas valide";
        validForm = false;  
    }
}
function validCity(city){
    if(city.length == 0){
        cityErr.innerHTML = "Votre ville n'est pas renseignée";
        validForm = false;
    }else if(cityRegEx.test(city)) {
        cityErr.innerText = "";
        validForm = true;
    }else{
        cityErr.innerText = "Ce nom de ville n'est pas valide";
        validForm = false;  
    }
}
function validEmail(email){
    if(email.length == 0){
        emailErr.innerHTML = "Votre email n'est pas renseigné";
        validForm = false;
    }else if(emailRegEx.test(email)) {
        emailErr.innerText = "";
        validForm = true;
    }else{
        emailErr.innerText = "Votre email n'est pas valide";
        validForm = false;  
    }
}
    // Infos à envoyer en POST
    let contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
    };
order.addEventListener("click", (event) => {
    // Empêcher le rechargement de la page
    event.preventDefault();


    // Vérification des informations saisies
    if ((validForm) &
    (firstNameRegEx.test(contact.firstName) == true) &
    (lastNameRegEx.test(contact.lastName) == true) &
    (addressRegEx.test(contact.address) == true) &
    (cityRegEx.test(contact.city) == true)  &
    (emailRegEx.test(contact.email) == true)){
        
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
            document.location.href = `confirmation.html?orderId=${data.orderId}`;
        })
        .catch(erreur => console.log("erreur : " + erreur));       
    }else{
        // On revérifie les champs
        validFirstName(inputFirstName.value);
        validLastName(inputLastName.value);
        validAddress(inputAddress.value);
        validCity(inputCity.value);
        validEmail(inputEmail.value);
    }
})
