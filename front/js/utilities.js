// Variables globales

// convertir le prix
function convertPrice(productPrice) {
    let price = `${productPrice}`;
    // constructor pour formater des nombres en fonction de la locale (fr).
    price = Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        // minimumFractionDigits indique le nombre minimum de chiffres de fraction à utiliser
        minimumFractionDigits: 2,
    }).format(price);
    return price;
};

// supprimer le Panier grace à la méthode clear()
function clearPanier() {
    localStorage.clear();
}