let users=[];

if(JSON.parse(localStorage.getItem('users')))  {
    users = JSON.parse(localStorage.getItem('users'))
} else {
    localStorage.setItem('users', JSON.stringify([]))
    users = JSON.parse(localStorage.getItem('users'))
}

const DOMlogin = document.getElementById('domLogin');
DOMlogin.innerHTML = `
        <div class="row align-items-stretch">
            <div class="col bgHome_left d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded"></div>
                <div class="col bgHome_right p-5 rounded-end">
                    <div class="text-end">
                        <img src="./img/logomenu.png" width="300" alt=""> 
                    </div>
                <h2 class="fw-bold text-center py-5">BIENVENIDO</h2>
                <form>
                    <div class="mb-4">
                        <label for="user" class="form-label">Ingresa tu nombre</label>
                        <input type="user" class="form-control" name="user" id="name">
                    </div>
                    <div class="mb-4">
                        <label for="email" class="form-label">Correo Electronico</label>
                        <input type="email" class="form-control" name="email" id="email">
                    </div>
                </form>
                <div class="d-grid">
                    <button type="button" id="getInfo" class="btn btn-info">Iniciar Sesion</button>
                </div>
            </div>
        </div>
`;

const DOMgetInfo = document.getElementById('getInfo');
DOMgetInfo.addEventListener('click',setUser)

class GetUser {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

}

function setUser() {

  let name = document.getElementById('name').value;

  let email = document.getElementById('email').value

  let user = new GetUser(name, email);

  users.push(user);

  localStorage.setItem('users', JSON.stringify(users));

  window.location.replace("home.html");
}



