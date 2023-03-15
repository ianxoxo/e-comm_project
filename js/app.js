import {closeCart, showCart} from './show-cart.js';
import { addProducts, deleteFromCart, showProducts, decrementQty, incrementQty, validateDolar} from './products.js';


document.addEventListener('DOMContentLoaded', (e) => {
    showCart()
    closeCart()
    validateDolar()
    showProducts()
    addProducts()
    deleteFromCart()
    decrementQty()
    incrementQty()
})


