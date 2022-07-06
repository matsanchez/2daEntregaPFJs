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
                    <div class="msg_error mt-3 text-center"><span class="bg-danger p-2 rounded"><i class="bi bi-exclamation-triangle-fill"></i> Error: Todos los fields son Requeridos!</span></div>
                </div>

            </div>
        </div>
`;
const expReg = {user: /^[a-zA-Z0-9\_\-]{4,16}$/, email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, }

const inputs = {name: false, email: false, }

const DOMgetInfo = document.getElementById('getInfo').addEventListener('click', setUser);
const DOMinputs = document.querySelectorAll('input');

function validateForm(e){
    e.stopPropagation();
    switch (e.target.name) {
        case "user":
            validateInputs(expReg.user, e.target, 'name')
        break;
        case "email":
            validateInputs(expReg.email, e.target, 'email')
        break;
    }
}

function validateInputs(expression, input, field){
    if (expression.test(input.value)) {
        document.getElementById(`validate_${field}`).classList.remove('validate_error');
        document.getElementById(`validate_${field}`).classList.add('validate_confirm');
        document.querySelector(`#validate_${field} .msg_error`).classList.remove('msg_error_active');
        inputs[field] = true;
    }else{
        document.getElementById(`validate_${field}`).classList.add('validate_error');
        document.getElementById(`validate_${field}`).classList.remove('validate_confirm');
        document.querySelector(`#validate_${field} .msg_error`).classList.add('msg_error_active');
        inputs[field] = false
    }
}

DOMinputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
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
        welcomeTo(name)
    }else{
        document.querySelector(`#validate_submit .msg_error`).classList.add('msg_error_active');
        setTimeout(() =>{
            document.querySelector(`#validate_submit .msg_error`).classList.remove('msg_error_active');
        }, 3000);
    }
}

function welcomeTo (name){
    Swal.fire({
        title: `Bienvenido ${name}`,
        showClass: {
            popup: 'animate__animated animate__flipInX'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutRightBig'
          },
        html: 'Ingresando en <b></b> segundos',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = (Swal.getTimerLeft() / 1000)
            .toFixed(0)
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            setTimeout(()=> {
                window.location.replace("pages/home.html");
            },500);
        }
      })
}