let merchanProducts = [
    {
        id: 01,
        name:"Bolsa Ecologica",
        price:50,
        img:"../img/merchandising/bolsaeco.png"
    },
    {
        id: 02,
        name:"Cuaderno",
        price:500,
        img:"../img/merchandising/cuaderno.png"
    },
    {
        id: 03,
        name:"Gorra",
        price:800,
        img:"../img/merchandising/gorra.png"
    },
    {
        id: 04,
        name:"Mate",
        price:500,
        img:"../img/merchandising/mate.png"
    },
    {
        id: 05,
        name:"Matera",
        price:1500,
        img:"../img/merchandising/matera.png"
    },
    {
        id: 06,
        name:"Mochila",
        price:2500,
        img:"../img/merchandising/mochila.png"
    },
    {
        id: 07,
        name:"Porta Notebook",
        price:1800,
        img:"../img/merchandising/portanotebook.png",
    
    },
    {
        id: 08,
        name:"Remera",
        price:3000,
        img:"../img/merchandising/remera.png"
    },
    {
        id: 09,
        name:"Termo",
        price:6000,
        img:"../img/merchandising/termo.png"
    },
    {
        id: 10,
        name:"Articulos de Oficina",
        price:1500,
        img:"../img/merchandising/varios.png"
    }
]

let users = [];
let cart = [];


const DOMcartCounter = document.getElementById('cartCounter');
const DOMbtn_quiz_game = document.getElementById('quiz_game').addEventListener('click', e => {
    window.open('quiz_game.html', '_self');
})
const DOMbtn_memory_game = document.getElementById('memory_game').addEventListener('click', e => {
    window.open('memory_game.html', '_self');
})

if(JSON.parse(localStorage.getItem('cart')) || JSON.parse(localStorage.getItem('users')))  {
    cart = JSON.parse(localStorage.getItem('cart'));
    users = JSON.parse(localStorage.getItem('users'))
} else {
    localStorage.setItem('cart', JSON.stringify([]))
    localStorage.setItem('users', JSON.stringify([]))
    cart = JSON.parse(localStorage.getItem('cart'))
    users = JSON.parse(localStorage.getItem('users'))
}

showProducts();

const DOMuserLogin = document.getElementById('user_login').textContent = `Hola ${users[0].name}`

if (cart.length === 0) {
    DOMcartCounter.innerHTML = cart.length + 0
}else{
    DOMcartCounter.innerHTML = cart.length
}
function showProducts (){
    for (let i = 0; i < merchanProducts.length; i++) {
        const element = merchanProducts[i];
        const { id, name, price, img } = element
            const card = `
                <div class="card text-center m-2" style="width: 18rem;">
                    <img src=${img} class="d-block imgProducts img-fluid" alt="${name}">
                    <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-price">$${price}</p>
                    <button id=${id} class="btn btn-warning">Agregar al Carrito</button>
                    </div>
                </div>
                `
            const containerProduct = document.getElementById('containerProduct')
            containerProduct.innerHTML += card
    }
}

const addBtn = document.getElementsByClassName('btn');

for (let i = 0; i < addBtn.length; i++) {
    const element = addBtn[i];
    element.addEventListener('click', addCart)
}

function addCart(e){
    const btn = e.target;
    const idBoton = btn.getAttribute('id')
    const idFound = merchanProducts.find(prod => prod.id == idBoton)
    const inCart = cart.find(prod => prod.id == idFound.id)
    if(!inCart) {
        cart.push({...idFound, cantidad: 1})
    } else {
        let cartFilter = cart.filter(id => id.id != inCart.id)
        cart = [...cartFilter, {...inCart, cantidad: inCart.cantidad + 1}]
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    DOMcartCounter.innerHTML = cart.length
}


/* function cargarJSON(){
    fetch('../js/shop_cart/products.json')
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        let card ='';
        data.forEach(function(products){
            card += `
            <div class="card text-center m-2" style="width: 18rem;">
                <img src=${products.img} class="d-block imgProducts img-fluid" alt="${products.name}">
                <div class="card-body">
                <h5 class="card-title">${products.name}</h5>
                <p class="card-price">$${products.price}</p>
                <button id=${products.id} class="btn btn-warning">Agregar al Carrito</button>
                </div>
            </div>
            `
        });
        const containerProduct = document.getElementById('containerProduct')
        containerProduct.innerHTML = card
    })
    .catch(function(error){
        console.log(error);
    })
}

document.addEventListener("click", (e)=>{
    if(e.target && e.target.matches("button.btn")){
        addCart(e.target.id);
    }
})

function addCart(e){
    const idFound = merchanProducts.find(prod => prod.id == e)
    const inCart = cart.find(prod => prod.id == idFound.id)
    if(!inCart) {
        cart.push({...idFound, cantidad: 1})
    } else {
        let cartFilter = cart.filter(id => id.id != inCart.id)
        cart = [...cartFilter, {...inCart, cantidad: inCart.cantidad + 1}]
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    DOMcartCounter.innerHTML = cart.length
} */