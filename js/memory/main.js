if(JSON.parse(localStorage.getItem('users')))  {
    users = JSON.parse(localStorage.getItem('users'))
} else {
    localStorage.setItem('users', JSON.stringify([]))
    users = JSON.parse(localStorage.getItem('users'))
}
const DOMcartCounter = document.getElementById('cartCounter');
const DOMuserLogin = document.getElementById('user_login').textContent = `Hola ${users[0].name}`
const DOMboxGame = document.getElementById('boxGame');
const DOMmovements = document.getElementById('movements')
const DOMhits = document.getElementById('hits');
const DOMtime_left = document.getElementById('time_left')
//// VARIABLES ////
let showSelect = 0;
let selectCard1;
let selectCard2;
let firstShow;
let secondShow;
let movements = 0;
let hits = 0;
let timer = false;
let timerTime = 30;
let initTime = timerTime;
let countDown;

/////// ARRAY CON ID DE LOS BOTONES ///////
let ids = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
/////// ARRAY DE TARJETAS Y SU COMPAÑERA /////////
let cards = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
cards = cards.sort(()=> {return Math.random()-0.5});

function showmTable(){
    for (let i = 0; i < ids.length; i++) {
        const element = document.getElementById(i);
        element.innerHTML = `<img src="../img/cards_game_memory/card_magic/${cards[i]}.png" alt="Card" class="cards_game_memory">`
        element.disabled = true;
    }
}


function countTime(){
    countDown = setInterval(()=>{
        timerTime--;
        DOMtime_left.innerHTML = `TIEMPO<br>${timerTime} segundos`;
        timerTime == 0 && (clearInterval(countDown), blockTable(), DOMtime_left.innerHTML = `<h5><b>SE ACABO EL TIEMPO<b></h5>`);
    },1000)
}

function blockTable(){
    for (let i = 0; i < ids.length; i++) {
        const element = document.getElementById(i);
        element.innerHTML = `<img src="../img/cards_game_memory/card_magic/${cards[i]}.png" alt="Card" class="cards_game_memory">`
        element.disabled = true;
    }
}

function showTable (){

    for (let i = 0; i < ids.length; i++) {
            const card = `
                    <button id=${[i]} class="btn_memory m-1 me-0"></button>
                    `
            DOMboxGame.innerHTML += card
    }
}
showTable();
const btnPrueba = document.getElementsByClassName('btn_memory');

for (let i = 0; i < btnPrueba.length; i++) {
    let element = btnPrueba[i];
    element.addEventListener('click', loadId)    
}

function loadId(e){
        const btn = e.target;
        const idBtn = btn.getAttribute('id')
        selectOption(idBtn)
}

function selectOption(idBtn){

    if (timer == false) {
        countTime();
        timer = true;
    }
        showSelect++
    if (showSelect == 1) {
        selectCard1 = document.getElementById(idBtn);
        firstShow = cards[idBtn];
        selectCard1.innerHTML = `<img src="../img/cards_game_memory/card_magic/${firstShow}.png" alt="Card" class="cards_game_memory">`

        selectCard1.disabled = true;
    }else if(showSelect == 2){
        selectCard2 = document.getElementById(idBtn);
        secondShow = cards[idBtn];
        selectCard2.innerHTML = `<img src="../img/cards_game_memory/card_magic/${secondShow}.png" alt="Card" class="cards_game_memory">`

        selectCard2.disabled = true;
        movements++
        DOMmovements.innerHTML = `MOVIMIENTOS<br>${movements}`;
        
        if (firstShow == secondShow) {
            showSelect = 0;

            hits++
            DOMhits.innerHTML = `ACIERTOS<br>${hits}`;

            if (hits == 8) {
                clearInterval(countDown);
                DOMhits.innerHTML = `Lo hiciste en <b>${hits}</b> aciertos!`
                DOMtime_left.innerHTML = `WoW! lo hiciste en <b>${initTime - timerTime}</b> segundos`
                DOMmovements.innerHTML = `Logrado en <b>${movements}</b> movimientos`;
            }
        }else{
            setTimeout(()=>{
                selectCard1.innerHTML = "";
                selectCard2.innerHTML = "";
                selectCard1.disabled = false;
                selectCard2.disabled = false;
                showSelect = 0;
            },800)
        }
    }
}
