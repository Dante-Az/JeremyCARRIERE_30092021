// On récupère les informations du localStorage
const order = JSON.parse(localStorage.getItem("order")) || [];
let produit = JSON.parse(localStorage.getItem("produit")) || [];
console.log(order)


let infos = document.getElementById("orderId")
infos.innerHTML = `${order.orderId}`
console.log(produit)

// Fonction pour effacer le panier
let clearCart = document.querySelectorAll(".limitedWidthBlock a");

for (let k = 0 ;k < clearCart.length; k++){
    clearCart[k].addEventListener("click", () =>{
    localStorage.clear();
    })
}
console.log(clearCart)