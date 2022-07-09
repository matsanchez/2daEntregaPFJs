let users=[];

if(JSON.parse(localStorage.getItem('users')))  {
    users = JSON.parse(localStorage.getItem('users'))
} else {
    localStorage.setItem('users', JSON.stringify([]))
    users = JSON.parse(localStorage.getItem('users'))
}

const DOMshowQuiz = document.getElementById('showQuiz');
const DOMtitleQuiz = document.querySelector('.titleQuiz');
const DOMtimerText = document.getElementById('timerText');
const DOMtimerNumber = document.getElementById('timerNumber');
const DOMquestion = document.getElementById('question');
const DOMscore = document.getElementById('score');
const DOMcount = document.getElementById('count');
const DOMoption_1 = document.getElementById('0');
const DOMoption_2 = document.getElementById('1');
const DOMoption_3 = document.getElementById('2');
const DOMoption_4 = document.getElementById('3');
const DOMbtnClose = document.getElementById('clouse_quiz').addEventListener('click', close =()=>{
    location.assign('./quiz_game.html');
})

const DOMrules = document.getElementById('rules').innerHTML = 
`<img src="../img/icons/icon_rules.png" class="icon_rules" alt="">
    <div class="mt-3">
        <p><i class="bi bi-check-square-fill me-3"></i>DISPONES DE 15 SEGUNDOS POR PREGUNTA PARA RESPONDER</p>
        <p><i class="bi bi-check-square-fill me-3"></i>PASADO LOS 15 SEGUNDOS Y NO SE SELECCIONO UNA RESPUESTA, ESTA SE MARCARA COMO INCORRECTA</p>
        <p><i class="bi bi-check-square-fill me-3"></i>AL FINALIZAR EL JUEGO, NO TENDRAS POSIBILIDAD DE VER LA RESPUESTA CORRECTA</p>
        <p><i class="bi bi-check-square-fill me-3"></i>SI ESTAS PREPARADO/A SELECCIONA UN TEMA PARA EMPEZAR A JUGAR</p>
    </div>
`;
const DOMthemes = document.getElementById('themes').innerHTML =
`   <img src="../img/themes_quiz/arte_literatura.jpg" alt="Arte y Literatura" id="3"class="btn_theme" name="arte_y_literatura">
    <img src="../img/themes_quiz/entretenimiento.jpg" alt="Entretenimiento" id="2" class="btn_theme" name="entretenimiento">
    <img src="../img/themes_quiz/geografia.jpg" alt="Geografia" id="4" class="btn_theme" name="geografia">
    <img src="../img/themes_quiz/historia.jpg" alt="Historia" id="0" class="btn_theme" name="historia">
    <img src="../img/themes_quiz/natur_ciencia.jpg" alt="Naturaleza y Ciencia" id="1" class="btn_theme" name="naturaleza_y_ciencia">
`;

const DOMbtnsThemes = document.querySelectorAll('.btn_theme');
DOMbtnsThemes.forEach((btn) => {
    btn.addEventListener('click', choiceTheme);
    btn.addEventListener('click', viewQuiz);
});

function viewQuiz (){
    let timerInterval;
    Swal.fire({
        title: 'Cargando preguntas...',
        html: 'En <b></b> segundos, comenzamos!!',
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
            DOMviewQuiz = document.querySelector('.view_quiz').setAttribute('class', 'view_active');
            DOMheaderThemes = document.getElementById('header_themes').setAttribute('class', 'view_desactive')
        }
      })
}

function choiceTheme(e){
    e.stopPropagation();
    switch (e.target.name) {
        case "arte_y_literatura":
            obtenerId(e.target.id)
            loadQuestion(indexQuestion, e.target.id)
            break;
        case "entretenimiento":
            obtenerId(e.target.id)
            loadQuestion(indexQuestion, e.target.id)
            break;    
        case "geografia":
            obtenerId(e.target.id)
            loadQuestion(indexQuestion, e.target.id)
            break;
        case "historia":
            obtenerId(e.target.id)
            loadQuestion(indexQuestion, e.target.id)
            break;
        case "naturaleza_y_ciencia":
            obtenerId(e.target.id)
            loadQuestion(indexQuestion, e.target.id)
            break;
}
}

let timeValue =  15;
let timeRest = timeValue;
let timeScore = 0;
let userScore = null;
let answerCorrect = 0;
let answerWrong = 0;
let count;
let countLine;
let indexQuestion = 0;
let themesTitle = [
    "Historia", "Naturaleza y Ciencia", "Entretenimiento", "Arte y Literatura", "Geografia"
]
let themes = [
    "historia", "naturaleza_y_ciencia", "entretenimiento", "arte_y_literatura", "geografia"
]
themes[0] = historia;
themes[1] = naturaleza_y_ciencia;
themes[2] = entretenimiento;
themes[3] = arte_y_literatura;
themes[4] = geografia;

function obtenerId(id){
    idBtnChoice = id
    return {idBtnChoice}
}

function loadQuestion(indexQuestion, i){
    DOMtitleQuiz.innerHTML = `Quiz de ${themesTitle[i]}`
    clearInterval(count)
    starTimer(15)
    question = themes[i][indexQuestion];
    for (let i = 0; i < 4; i++) {
        question.options.sort(()=>Math.random() - 0.5);   
    }
    DOMquestion.innerHTML = `${question.id}<i class="bi bi-caret-right-fill"></i>${question.question}`;
    DOMoption_1.innerHTML = question.options[0];
    DOMoption_2.innerHTML = question.options[1];
    DOMoption_3.innerHTML = question.options[2];
    DOMoption_4.innerHTML = question.options[3];
    
    DOMcount.innerHTML =`Pregunta ${indexQuestion + 1} de ${themes[i].length}`
}

const DOMbtnsOptions = document.querySelectorAll('.option').forEach((btn) =>{
    btn.addEventListener('click', e=>{
        idChoice = e.target.id
        selectChoice(idChoice, `${idBtnChoice}`)
    })
})

function selectChoice(idChoice, idBtnChoice){
    clearInterval(count)
    let validate = question.options[idChoice] == question.answer;
    validate == true ? (loadAnswer(true), loadScore(true)) : (loadAnswer(false), loadScore(false));
    indexQuestion++;
    if (indexQuestion >= themes[idBtnChoice].length){
        DOMshowQuiz.innerHTML = '';
        showScore();
        Swal.fire({
            title: '<strong>FIN DE LA PARTIDA!</strong>',
            imageUrl: '../img/icons/icon_win.png',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            html:
              'Vamos a ver tus resultados',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<a class="links" href="home.html">Ver Resultados</a>',
          })
    }else{
        DOMcount.innerHTML =`Pregunta ${indexQuestion + 1} de ${themes[idBtnChoice].length}`
        clearInterval(count)
        starTimer(timeValue)
        loadQuestion(indexQuestion, idBtnChoice)
    }
}

function loadAnswer(bolean){
    bolean == true ? (indicator = document.createElement('DIV'), indicator.classList.add('indice', 'true'), DOMscore.appendChild(indicator)) : (indicator = document.createElement('DIV'), indicator.classList.add('indice', 'false'), DOMscore.appendChild(indicator))
}

function loadScore(dataChoice){
    (dataChoice == true) ? ((userScore += 10), answerCorrect++) : answerWrong++;
}

function showScore(){
    users[0].score = users[0].score + userScore;
    localStorage.setItem('users', JSON.stringify(users))
}

function starTimer(timeValue){
    count = setInterval(timer,1000);
    function timer(){
        DOMtimerNumber.textContent = timeValue;
        timeValue--;
        timeValue < 0 && (clearInterval(count), selectChoice(5, idBtnChoice));
    }
}