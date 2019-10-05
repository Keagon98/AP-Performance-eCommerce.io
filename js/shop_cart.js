if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-outline-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem) 
}

    var quantityInputs = document.getElementsByClassName('form-control')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
}

    var addToCartbuttons  = document.getElementsByClassName('red_button add_to_cart_button')
    for (var i = 0; i < addToCartbuttons.length; i++) {
        var button = addToCartbuttons[i]
        button.addEventListener('click', addToCartClicked)
    }
}

function removeCartItem(event) {
      var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
            updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('product_name')[0].innerText
    var price = shopItem.getElementsByClassName('product_price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('product-image')[0].src
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.innerText = title
    var cartItems = document.getElementsByClassName('product-item')[0]
    cartItems.append(cartRow)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('product-item')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
   for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('form-control text-center')[0]
        var price = parseFloat(priceElement.innerText.replace('R', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'R' + total
}

function myFunction() {
    alert("Item added to cart");
  }














