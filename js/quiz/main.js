let users=[];

if(JSON.parse(localStorage.getItem('users')))  {
    users = JSON.parse(localStorage.getItem('users'))
} else {
    localStorage.setItem('users', JSON.stringify([]))
    users = JSON.parse(localStorage.getItem('users'))
}
const DOMshowQuiz = document.getElementById('showQuiz');
const DOMtimerText = document.getElementById('timerText');
const DOMtimerNumber = document.getElementById('timerNumber');
const DOMquestion = document.getElementById('question');
const DOMscore = document.getElementById('score');
const DOMcount = document.getElementById('count');
const DOMoption_1 = document.getElementById('option_1')
const DOMoption_2 = document.getElementById('option_2')
const DOMoption_3 = document.getElementById('option_3')
const DOMoption_4 = document.getElementById('option_4')

let timeValue =  15;
let timeRest = timeValue;
let timeScore = 0;
let userScore = null;
let answerCorrect = 0;
let answerWrong = 0;
let count;
let countLine;
let indexQuestion = 0;

function loadQuestion(indexQuestion, tema){
    clearInterval(count)
    starTimer(15)
    question = history[indexQuestion];
    for (let i = 0; i < 4; i++) {
        question.options.sort(()=>Math.random() - 0.5);   
    }
    DOMquestion.innerHTML = question.question;
    option_1.innerHTML = question.options[0];
    option_2.innerHTML = question.options[1];
    option_3.innerHTML = question.options[2];
    option_4.innerHTML = question.options[3];

    DOMcount.innerHTML =`Pregunta ${indexQuestion + 1} de ${history.length}`
}
option_1.addEventListener("click", function (e){
    selectChoice(0);
});
option_2.addEventListener("click", function (e){
    selectChoice(1);
});
option_3.addEventListener("click", function (e){
    selectChoice(2);
});
option_4.addEventListener("click", function (e){
    selectChoice(3);
});

function selectChoice(id){
    clearInterval(count)
    let validate = question.options[id] == question.answer;
    validate == true ? (loadAnswer(true), loadScore(true)) : (loadAnswer(false), loadScore(false));
    indexQuestion++;
    console.log(users);
    if (indexQuestion >= history.length){
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
        DOMcount.innerHTML =`Pregunta ${indexQuestion + 1} de ${history.length}`
        clearInterval(count)
        starTimer(timeValue)
        loadQuestion(indexQuestion)
    }
}

function loadAnswer(bolean){
    if (bolean == true) {
        const indicator = document.createElement('DIV');
        indicator.classList.add("indice", "true")
        DOMscore.appendChild(indicator)
        
    }else{
        const indicator = document.createElement('DIV');
        indicator.classList.add("indice", "false")
        DOMscore.appendChild(indicator)
    }
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
        if (timeValue < 0) {
            clearInterval(count)
        }
    }
}

loadQuestion(indexQuestion);


























/* let timeValue =  15;
let timeRest = timeValue;
let timeScore = 0;
let userScore = null;
let answerCorrect = 0;
let answerWrong = 0;
let count;
let countLine;
let indexQuestion = 0;

let indice= 0;

function loadQuestion(indexQuestion, tema){
    clearInterval(count)
    starTimer(15)
    question = history[indexQuestion];
    for (let i = 0; i < 4; i++) {
        question.options.sort(()=>Math.random() - 0.5);   
    }
    DOMquestion.innerHTML = question.question;
    option_1.innerHTML = question.options[0];
    option_2.innerHTML = question.options[1];
    option_3.innerHTML = question.options[2];
    option_4.innerHTML = question.options[3];

    DOMcount.innerHTML =`Pregunta ${indexQuestion + 1} de ${history.length}`
}
option_1.addEventListener("click", function (e){
    selectChoice(0);
});
option_2.addEventListener("click", function (e){
    selectChoice(1);
});
option_3.addEventListener("click", function (e){
    selectChoice(2);
});
option_4.addEventListener("click", function (e){
    selectChoice(3);
});

function selectChoice(id){
    let validate = question.options[id] == question.answer;
    validate == true ? (loadAnswer(true), loadScore(true)) : (loadAnswer(false), loadScore(false));
    indexQuestion++;
    if (indexQuestion >= history.length){
        console.log(userScore);
        console.log(answerCorrect);
        console.log(answerWrong);
    }else{
        DOMcount.innerHTML =`Pregunta ${indexQuestion + 1} de ${history.length}`
        clearInterval(count)
        starTimer(timeValue)
        loadQuestion(indexQuestion)
    }
}

function loadAnswer(bolean){
    if (bolean == true) {
        const indicator = document.createElement('DIV');
        indicator.classList.add("indice", "true")
        DOMscore.appendChild(indicator)
        
    }else{
        const indicator = document.createElement('DIV');
        indicator.classList.add("indice", "false")
        DOMscore.appendChild(indicator)
    }
}

function loadScore(dataChoice){
    (dataChoice == true) ? ((userScore += 10), answerCorrect++) : answerWrong++;
}

function starTimer(timeValue){
    count = setInterval(timer,1000);
    function timer(){
        DOMtimerNumber.textContent = timeValue;
        timeValue--;
        if (timeValue < 0) {
            clearInterval(count)
            selectChoice(5);
        }
    }
}
/* function starTimerLine(timeValue){
    countLine = setInterval(timer,30);
    function timer(){
        timeValue +=1;
        DOMtimeProgress.style.width = timeValue + "px";
        if (timeValue > 560) {
            clearInterval(countLine)
        }
    }
} 
loadQuestion(indexQuestion);
console.log(timeScore); */