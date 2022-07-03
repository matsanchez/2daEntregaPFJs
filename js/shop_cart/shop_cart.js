let cart;
if(JSON.parse(localStorage.getItem('cart')))  {
    cart = JSON.parse(localStorage.getItem('cart'))
} else {
    localStorage.setItem('cart', JSON.stringify([]))
    cart = JSON.parse(localStorage.getItem('cart'))
}
const totalCart=() =>{
    return cart.reduce((search, id) => search + id.price * id.cantidad, 0)
}

showCart();

function showCart(){
const cartSection = document.getElementById('cartSection');
if(cart.length == 0){
    const tableEmpty =`
        <div class="cartTitle p-5 bg-warning position-absolute top-50 start-50 translate-middle">
            <h1><b>Tu carrito esta vacio</b></h1>
            <br>
            <h2>Te invito a que pases por nuestra seccion de Merchandising<br> y lleves algo para ti o para regalar</h2>
            <br>
            <a href="home.html">
            <button id="" class="btn btn-light">IR A COMPRAR</button>
            </a>
        </div>
        `

cartSection.innerHTML += tableEmpty;
} else {
    const cartTitle = `
            <div class="cartTitle bg-warning">
                <h1>EN SU CARRITO DE COMPRAS</h1>
                <h2>Hay ${cart.length} producto/s seleccionado/s</h2>
            </div>
            `;
    cartSection.innerHTML += cartTitle;
    const cartContainer = `
            <table class="table table-warning text-center">
                <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">FOTO</th>
                    <th scope="col">NOMBRE PRODUCTO</th>
                    <th scope="col">CANTIDAD</th>
                    <th scope="col">PRECIO($)</th>
                    <th scope="col">SUBTOTAL($)</th>
                </tr>
                </thead>
                <tbody id="cartContent" class="align-middle">
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row"></th>
                        <td colspan="3"></td>
                        <td><b class="fs-4">TOTAL:</b></td>
                        <td><b class="fs-4">$${totalCart().toLocaleString()}</b></td>
                    </tr>
                </tfoot>
            </table>
            <div class="text-center">
            <button id="buyBtn" class="btn btn-success m-4">CONFIRMAR COMPRA</button><button id="emptyBtn" class="btn btn-danger">VACIAR CARRITO</button>
            </div>
            `;
            cartSection.innerHTML += cartContainer;
            const cartContent = document.getElementById('cartContent')
            for (let i = 0; i < cart.length; i++) {
                const element = cart[i];
                const { id, name, img, price, cantidad } = element;
                const cartItem = `
                    <tr>
                        <th scope="row"><button id="trashItemBtn" data-producto="${id}" class="trashItem"></button></th>
                        <td><img src=${img} class="imgProductsCart" alt="${name}"></td>
                        <td>${name}</td>
                        <td><button id="addItem" class="btn btn-success btnItems m-3 p-1" data-producto="${id}">+</button>${cantidad}<button id="subtractItem" class="btn btn-danger btnItems m-3 p-1" data-producto="${id}">--</button></td>
                        <td>$${price.toLocaleString()}</td>
                        <td>$${(cantidad * price).toLocaleString()}</td>
                        </tr>
                    `;
                cartContent.innerHTML += cartItem
            }
}
}
let removeBtn = document.getElementsByClassName('trashItem');

for (let i = 0; i < removeBtn.length; i++) {
    const element = removeBtn[i];
    element.addEventListener('click', function(e){
        if(e.target.id === "trashItemBtn"){
            deleteItem(e.target.dataset.producto)
        }
    });   
}

function deleteItem(item){
    for(i in cart){
        if(cart[i].id == item){
            cart.splice(i,1)
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload();
        }
    }
}

const emptyBtn = document.getElementById('emptyBtn')
emptyBtn.addEventListener('click', e =>{
    e.preventDefault();
    localStorage.clear('cart');
    cartSection.innerHTML = `
    <div class="cartTitle p-5 bg-warning position-absolute top-50 start-50 translate-middle">
        <h1><b>Tu carrito esta vacio</b></h1>
        <br>
        <h2>Te invito a que pases por nuestra seccion de Merchandising<br> y lleves algo para ti o para regalar</h2>
        <br>
        <a href="home.html">
        <button id="" class="btn btn-light">IR A COMPRAR</button>
        </a>
    </div>
    `;
});

let btnItems = document.getElementsByClassName('btnItems');

for (let i = 0; i < btnItems.length; i++) {
    const element = btnItems[i];
    element.addEventListener('click', function(e){
        if(e.target.id === "addItem"){
            addItem(e.target.dataset.producto)
        }
        else{
            subtractItem(e.target.dataset.producto)
        }
    });   
}

function addItem(item){
    cart.forEach(element =>{
        if(element.id == item){
            const items = element
            element.cantidad++
            element = {...items}
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload()
        }
    })
}

function subtractItem(item){
    cart.forEach(element =>{
        if(element.id == item){
            const items = element
            element.cantidad--
            if(element.cantidad === 0){
                deleteItem(item);
            }
            element = {...items}
            localStorage.setItem('cart', JSON.stringify(cart))
            location.reload();  
        }
    })
}

let buyBtn = document.getElementById('buyBtn');
buyBtn.addEventListener('click', e =>{
        buyBtn.setAttribute('data-toggle', "modal")
        buyBtn.setAttribute('data-bs-toggle',"modal")
        buyBtn.setAttribute('data-bs-target', "#miModal")
        let mostrarModal = document.getElementById('mostrarModal');
        const showModal = `
        <div class="modal fade" id="miModal" tabindex="-1" role="dialog" aria-labelledby="tituloVentana" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 id="tituloVentana" class="modal-title">DETALLE DE TU COMPRA:</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <table class="table text-center">
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">IMAGEN PRODUCTO</th>
                        <th scope="col">NOMBRE PRODUCTO</th>
                        <th scope="col">CANTIDAD</th>
                        <th scope="col">PRECIO($)</th>
                        <th scope="col">SUBTOTAL($)</th>
                    </tr>
                    </thead>
                    <tbody id="cartContent" class="align-middle">
                    </tbody>
                    <tfoot>
                        <tr class="bg-success">
                            <th scope="row"></th>
                            <td colspan="2"></td>
                            <td colspan="2"><b class="fs-4">TOTAL A PAGAR:</b></td>
                            <td><b class="fs-4">$${totalCart().toLocaleString()}</b></td>
                        </tr>
                    </tfoot>
                </table>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                  <button type="button" class="btn btn-success" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Pagar</button>
                </div>
              </div>
            </div>
          </div>
        <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalToggleLabel2">Complete los datos de envio</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              <form>
              <div class="form-group">
                  <label for="full_name_id" class="control-label">Nombre completo:</label>
                  <input type="text" class="form-control" id="full_name_id" name="full_name" placeholder="Ingrese un nombre">
              </div>    
          
              <div class="form-group">
                  <label for="street1_id" class="control-label">Direccion:</label>
                  <input type="text" class="form-control" id="street1_id" name="street1" placeholder="Ej: Direccion, numeracion, piso, departamento, timbre">
              </div>                       
          
              <div class="form-group">
                  <label for="city_id" class="control-label">Ciudad:</label>
                  <input type="text" class="form-control" id="city_id" name="city" placeholder="Ciudad donde vive">
              </div>                                                           
                  
              <div class="form-group">
                  <label for="zip_id" class="control-label">Codigo Postal:</label>
                  <input type="text" class="form-control" id="zip_id" name="zip" placeholder="#####">
              </div>
              <div class="form-group">
                <label for="email" class="control-label">Correo Electronico:</label>
                <input type="text" class="form-control" id="email" name="email" placeholder="correo@correo.com" >
             </div>
            <div class="form-group">
                <label for="phone" class="control-label">Telefono:</label>
                <input type="text" class="form-control" id="phone" name="phone" placeholder="+00 (011) - 0000-0000" >
            </div>
      
          </form>
          <h3 class="text-center m-3">Complete los datos del pago</h3>
          <form action="#" class="m-2">
            <div>
             <div>
                  <div class="row ">
                          <div class="col-md-12">
                              <input type="text" class="form-control" placeholder="0000-0000-0000-0000" />
                          </div>
                      </div>
                 <div class="row ">
                          <div class="col-md-3 col-sm-3 col-xs-3">
                              <span class="help-block text-muted small-font" >MES VENC.</span>
                              <input type="text" class="form-control" placeholder="MM" />
                          </div>
                     <div class="col-md-3 col-sm-3 col-xs-3">
                              <span class="help-block text-muted small-font" >AÑO VENC.</span>
                              <input type="text" class="form-control" placeholder="YY" />
                          </div>
                    <div class="col-md-3 col-sm-3 col-xs-3">
                              <span class="help-block text-muted small-font" >CCV</span>
                              <input type="text" class="form-control" placeholder="CCV" />
                          </div>
                     <div class="col-md-3 col-sm-3 col-xs-3">
            <img src="../img/icons/credit_car_icon.png" class="iconCreditCard" />
                     </div>
                      </div>
                 <div class="row ">
                          <div class="col-md-12">
                              <input type="text" class="form-control" placeholder="Nombre titular tal cual figura en la tarjeta" />
                          </div>
                      </div>
                 <div class="row">
            <div class="col-md-12 m-3">
                <div class="checkbox">
                <label>
                  <input type="checkbox" checked class="text-muted">Eh leido y acepto los terminos<a href="#">Terminos y condiciones</a>
                </label>
              </div>
            </div>
                 </div>
                   <div class="row m-3 text-center">
                        <div class="col-md-6 col-sm-6 col-xs-6">
                             <input type="submit" class="btn btn-danger" data-bs-dismiss="modal" value="CANCELAR"/>
                          </div>
                          <div class="col-md-6 col-sm-6 col-xs-6">
                              <input type="submit"  class="btn btn-success btn-block" value="PAGAR" />
                          </div>
                      </div>
                </div>
              </div>
            </form>
              </div>
              <div class="modal-footer">
                <button class="btn btn-primary" data-bs-target="#miModal" data-bs-toggle="modal">VOLVER AL DETALLE</button>
              </div>
            </div>
          </div>
        </div>
        `
        mostrarModal.innerHTML = showModal
        for (let i = 0; i < cart.length; i++) {
            const element = cart[i];
            const { id, name, img, price, cantidad } = element;
            const itemModal = `
                                <tr>
                                    <th scope="row"></th>
                                    <td><img src=${img} class="imgProductsCartBuy" alt="${name}"></td>
                                    <td>${name}</td>
                                    <td>${cantidad}</td>
                                    <td>$${price.toLocaleString()}</td>
                                    <td>$${(cantidad * price).toLocaleString()}</td>
                                </tr>
                                    `;
            cartContent.innerHTML += itemModal
        }
});


