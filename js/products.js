import { getData } from "./api.js";

let dolarBlue;


class Product {
    constructor(title, price, img) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.id = ++Product.counter;
    }

    static counter = -1;
}

const d = document,
    $products = d.getElementById("products_container"),
    $fragmentMain = d.createDocumentFragment(),
    $cart = d.getElementById("list"),
    $none = d.getElementById("none"),
    $total = d.getElementById("total");

const PRODUCT_LIST = [];

async function validateDolar() {
    dolarBlue = await getData();
    if (dolarBlue === 1) {
        PRODUCT_LIST.push(
            new Product(
                "A3B PIXEL HOODIE",
                "Error",
                "../assets/a3b-pixel-hoodie.jpg"
            ),
            new Product(
                "A3B PUFFER", 
                "Error", 
                "../assets/a3b-puffer.jpg"),
            new Product(
                "A3B JACKET", 
                "Error", 
                "../assets/a3b-trap-logo.jpg"),
            new Product(
                "A3B SOCIETY", 
                "Error", 
                "../assets/a3bsociety.jpg"),
            new Product(
                "VLONE SHIRT", 
                "Error", 
                "../assets/vlone-shirt.jpg")
        );
    } else {
        PRODUCT_LIST.push(
            new Product(
                "A3B PIXEL HOODIE",
                Math.round(200 * dolarBlue),
                "../assets/a3b-pixel-hoodie.jpg"
            ),
            new Product(
                "A3B PUFFER",
                Math.round(200 * dolarBlue),
                "../assets/a3b-puffer.jpg"
            ),
            new Product(
                "A3B JACKET",
                Math.round(150 * dolarBlue),
                "../assets/a3b-trap-logo.jpg"
            ),
            new Product(
                "A3B SOCIETY",
                Math.round(100 * dolarBlue),
                "../assets/a3bsociety.jpg"
            ),
            new Product(
                "VLONE SHIRT",
                Math.round(230 * dolarBlue),
                "../assets/vlone-shirt.jpg"
            )
        );
    }
}



async function showProducts(){
        await validateDolar();
        PRODUCT_LIST.forEach((product) => {
            if (typeof product.price === "string") {
                const $div = d.createElement("div");
                $div.classList.add("card");
                $div.id = product.id;
                $div.innerHTML += `
                                <img src="${product.img}" alt="${product.title}">
                                <h4>${product.title}</h4>
                                <p>${product.price}</p>
                                <button class="add disabled" id="add${product.id}">Add</button>
                `;
                $fragmentMain.appendChild($div);
            } else {
                const $div = d.createElement("div");
                $div.classList.add("card");
                $div.id = product.id;
                $div.innerHTML += `
                                <img src="${product.img}" alt="${product.title}">
                                <h4>${product.title}</h4>
                                <p>${product.price} ARS</p>
                                <button class="add" id="add${product.id}">Add</button>
                `;
                $fragmentMain.appendChild($div);
            }
        });
        $products.appendChild($fragmentMain);
};

const CURRENT_CART = JSON.parse(localStorage.getItem("cart")) || [];

updateCart();

const validateAsyncErr = (e) => {
    if (e.target.matches(".disabled")) {
        CURRENT_CART = [];
        updateCart();
    }
};

const addProducts = () => {
    d.addEventListener("click", (e) => {
        validateAsyncErr(e);
        if (e.target.matches(".add")) {

            Toastify({
                text: "An item has been added to the cart",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "left",
                stopOnFocus: true,
                style: {
                    background: "#773344",
                    fontSize: ".9rem",
                    borderRadius: "56px",
                    padding: "1em",
                },
                onClick: function () { },
            }).showToast();

            let parent = e.target.parentNode;
            validateCart(parent);
            updateCart();
        }
    });
};

const validateCart = (parent) => {
    let added = PRODUCT_LIST.find((el) => parent.id.includes(el.id));

    let bool = CURRENT_CART.some((el) => parent.id.includes(el.id));

    if (!bool) {
        added.qty = 1;
        CURRENT_CART.push(added);
    }
    if (bool) {
        let existentProduct = CURRENT_CART.findLastIndex((el) =>
            parent.id.includes(el.id)
        );
        CURRENT_CART[existentProduct].qty++;
    }
};

const deleteFromCart = () => {
    d.addEventListener("click", (e) => {
        if (e.target.matches(".delete")) {
            let parent = e.target.parentNode;
            deleteProducts(parent);
            updateCart();
        }
    });
};

const deleteProducts = (parent) => {
    let existentProduct = CURRENT_CART.findLastIndex((el) =>
        parent.id.includes(el.id)
    );

    CURRENT_CART.splice(existentProduct, 1);
};

const decrementQty = () => {
    d.addEventListener("click", (e) => {
        if (e.target.matches(".decrement")) {
            let parent = e.target.parentNode.parentNode;
            decrementProducts(parent);
            updateCart();
        }
    });
};

const incrementQty = () => {
    d.addEventListener("click", (e) => {
        if (e.target.matches(".increment")) {
            let parent = e.target.parentNode.parentNode;
            incrementProducts(parent);
            updateCart();
        }
    });
};

const incrementProducts = (parent) => {
    let existentProduct = CURRENT_CART.findIndex((el) =>
        parent.id.includes(el.id)
    );

    CURRENT_CART[existentProduct].qty++;
};

const decrementProducts = (parent) => {
    let existentProduct = CURRENT_CART.findIndex((el) =>
        parent.id.includes(el.id)
    );

    CURRENT_CART[existentProduct].qty--;

    if (CURRENT_CART[existentProduct].qty === 0) {
        CURRENT_CART.splice(existentProduct, 1);
    }
};

function updateCart() {
    $cart.innerHTML = "";
    if (CURRENT_CART.length >= 1) {
        CURRENT_CART.forEach((el) => {
            $cart.innerHTML += `<li class="cart-item" id="cart${el.id}">
                                    <img src="${el.img}" alt="${el.title}">
                                    <p>${el.title}</p>
                                    <p class="price">${el.price * el.qty}</p>
                                    <div class="qty">
                                        <button class="decrement">-</button>
                                        <p class="number">${el.qty}</p>
                                        <button class="increment">+</button>
                                    </div>
                                    <img class="delete" src="./assets/trash.png" alt="Delete" id="delete${el.id
                }"/>
                                </li>`;
        });
    } else {
        $cart.insertAdjacentElement("afterbegin", $none);
    }

    localStorage.setItem("cart", JSON.stringify(CURRENT_CART));

    calculateTotal();
}

function calculateTotal() {
    $total.textContent = "";

    if (CURRENT_CART.length === 0) return;
    else {
        let $price = d.querySelectorAll(".price");
        let counter = 0;

        $price.forEach((el) => {
            counter += parseFloat(el.textContent);
        });

        $total.innerHTML = `Your total is $${counter}`;
    }
}

export {
    showProducts,
    addProducts,
    deleteFromCart,
    decrementQty,
    incrementQty,
    validateDolar,
};
