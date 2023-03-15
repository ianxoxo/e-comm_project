import {closeCart, showCart} from './show-cart.js';
import { addProducts, deleteFromCart, showProducts, decrementQty, incrementQty} from './products.js';


document.addEventListener('DOMContentLoaded', (e) => {
    showCart()
    closeCart()
    showProducts()
    addProducts()
    deleteFromCart()
    decrementQty()
    incrementQty()
})


