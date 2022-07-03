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
                <h2 class="fw-bold text-center py-4">BIENVENIDO</h2>
                <form>
                    <div id="validate_name" class="mb-4">
                        <label for="user" class="form-label">Ingresa tu nombre</label>
                        <input type="user" class="form-control" name="user" id="name">
                        <div class="msg_error">El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros, letras y guion bajo</div>
                    </div>
                    <div id="validate_email" class="mb-4">
                        <label for="email" class="form-label">Correo Electronico</label>
                        <input type="email" class="form-control" name="email" id="email">
                        <div class="msg_error">El correo solo puede contener letras, numeros, puntos, guiones y guion bajo, incluido el @</div>
                    </div>
                </form>
                <div id="validate_submit" class="d-grid">
                    <button type="button" id="getInfo" class="btn btn-info">Iniciar Sesion</button>
                    <div class="msg_error mt-3 text-center"><span class="bg-danger p-2 rounded"><i class="bi bi-exclamation-triangle-fill"></i> Error: Todos los campos son Requeridos!</span></div>
                </div>

            </div>
        </div>
`;
const expReg = {user: /^[a-zA-Z0-9\_\-]{4,16}$/, email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, }

const inputs = {name: false, email: false, }

const DOMgetInfo = document.getElementById('getInfo').addEventListener('click', setUser);
const DOMinputs = document.querySelectorAll('input');

function validarFormulario(e){
    e.stopPropagation();
    switch (e.target.name) {
        case "user":
            validarCampos(expReg.user, e.target, 'name')
        break;
        case "email":
            validarCampos(expReg.email, e.target, 'email')
        break;
    }
}

function validarCampos(expresion, input, campo){
    if (expresion.test(input.value)) {
        document.getElementById(`validate_${campo}`).classList.remove('validate_error');
        document.getElementById(`validate_${campo}`).classList.add('validate_confirm');
        document.querySelector(`#validate_${campo} .msg_error`).classList.remove('msg_error_active');
        inputs[campo] = true;
    }else{
        document.getElementById(`validate_${campo}`).classList.add('validate_error');
        document.getElementById(`validate_${campo}`).classList.remove('validate_confirm');
        document.querySelector(`#validate_${campo} .msg_error`).classList.add('msg_error_active');
        inputs[campo] = false
    }
}

DOMinputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});


class GetUser {
  constructor(name, email, score) {
    this.name = name;
    this.email = email;
    this.score = score;
  }

}

function setUser(){
    if (inputs.name && inputs.email) {    
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let score = 0;      
        let user = new GetUser(name, email, score);      
        users.push(user);      
        localStorage.setItem('users', JSON.stringify(users));
        window.location.replace("pages/home.html");
    }else{
        document.querySelector(`#validate_submit .msg_error`).classList.add('msg_error_active');
        setTimeout(() =>{
            document.querySelector(`#validate_submit .msg_error`).classList.remove('msg_error_active');
        }, 3000);
    }
}