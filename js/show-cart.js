const d = document,
    $cartBtn = d.getElementById('cart-btn'),
    $cart = d.querySelector('.cart'),
    $overlay = d.getElementById('overlay'),
    $close = d.getElementById('close');

const showCart = () => {
    d.addEventListener('click', (e) => {
        if(e.target === $cartBtn){
            $cart.classList.add('show-cart');
            $cart.classList.remove('hide');
            $overlay.classList.remove('hide');
        }
    })
}

const closeCart = () => {
    d.addEventListener('click', (e) => {
        if(e.target === $close || e.target.matches('#close > *')){
            $cart.classList.remove('show-cart');
            $cart.classList.add('hide');
            $overlay.classList.add('hide');
        }
    })
}

export {closeCart, showCart};