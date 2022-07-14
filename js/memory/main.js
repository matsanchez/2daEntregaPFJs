let cart = JSON.parse(localStorage.getItem('cart')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];

const DOMcartCounter = document.getElementById('cartCounter');
cart.length === 0 ? DOMcartCounter.innerHTML = cart.length + 0 : DOMcartCounter.innerHTML = cart.length;
const DOMboxGame = document.getElementById('boxGame');
const DOMmovements = document.getElementById('movements');
const DOMhits = document.getElementById('hits');
const DOMtime_left = document.getElementById('time_left');

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

////// ARRAY CARPETAS IMAGENES ////////
let imgThemes = ["card_beach", "card_covid_19", "card_fast_food", "card_halloween", "card_magic", "card_random", "card_social_media", "card_web_design"];
imgThemes = imgThemes.sort(()=> {return Math.random()-0.5});

showTable();

function showmTable(){
    for (let i = 0; i < ids.length; i++) {
        const element = document.getElementById(i);
        element.innerHTML = `<img src="../img/cards_game_memory/${imgThemes[0]}/${cards[i]}.png" alt="Card" class="cards_game_memory">`
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
        element.classList.remove('bg_card_memory')
        element.innerHTML = `<img src="../img/cards_game_memory/${imgThemes[0]}/${cards[i]}.png" alt="Card" class="cards_game_memory">`
        element.disabled = true;
    }
}

function showTable (){

    for (let i = 0; i < ids.length; i++) {
            const card = `
                    <button id=${[i]} class="btn_memory m-1 me-0 bg_card_memory"></button>
                    `
            DOMboxGame.innerHTML += card
    }
}
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
        selectCard1.classList.remove('bg_card_memory');
        firstShow = cards[idBtn];
        selectCard1.innerHTML = `<img src="../img/cards_game_memory/${imgThemes[0]}/${firstShow}.png" alt="Card" class="cards_game_memory">`

        selectCard1.disabled = true;
    }else if(showSelect == 2){
        selectCard2 = document.getElementById(idBtn);
        selectCard2.classList.remove('bg_card_memory');
        secondShow = cards[idBtn];
        selectCard2.innerHTML = `<img src="../img/cards_game_memory/${imgThemes[0]}/${secondShow}.png" alt="Card" class="cards_game_memory">`

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
                selectCard1.classList.add('bg_card_memory');
                selectCard2.classList.add('bg_card_memory');
            },700)
        }
    }
}
