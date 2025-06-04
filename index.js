let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 300;
let selectedQuestions = [];
let currentUser = {
    username: "",
    score: 0,
    date: new Date().toLocaleString(),
    timeLeft: 0
    };
const questions = [
    {
        question: "Qué es un bucle for en programación?",
        options: ["Una condicion falsa", "Una funcion", "Repetir codigo", "Un operador"],
        answer: "Repetir codigo",
    },


    {
        question: "¿Cuál de estos NO es un tipo de dato primitivo en Java?",
        options: ["int", "boolean", "string", "double"],
        answer: "string"
    },


    {
        question: "¿Qué lenguaje se usa principalmente para desarrollo web frontend?",
        options: ["Python", "JavaScript", "C++", "Java"],
        answer: "JavaScript"
    },
   
    {
        question: "¿Qué significa HTML?",
        options: ["Hyper Transfer", "HyperText Markup", "High-Level Text", "Hyperlink Text"],
        answer: "HyperText Markup"
    },


    {
        question: "¿Qué operador se usa para comparar igualdad en JavaScript?",
        options: ["=", "==", "===", "!="],
        answer: "=="
    },


    {
        question: "¿Qué estructura de datos es FIFO (First-In, First-Out)?",
        options: ["Pila", "Cola", "Árbol", "Grafo"],
        answer: "Cola"
    },


    {
        question: "¿Cuál es la salida de `print(3 + '2')` en Python?",
        options: ["5", "'32'", "Error", "'5'"],
        answer: "Error"
    },


    {
        question: "¿Qué método añade un elemento al final de un array en JavaScript?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: "push()"
    },


    {
        question: "¿Qué es Git?",
        options: ["Un lenguaje", "Control de versiones", "Un framework", "Una base de datos"],
        answer: "Control de versiones"
    },


    {
        question: "¿Qué imprime `console.log(typeof null)` en JavaScript?",
        options: ["'undefined'", "'object'", "'null'", "'string'"],
        answer: "'object'"
    },


    {
        question: "¿Cuál es la complejidad de una búsqueda binaria?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        answer: "O(log n)"
    },


    {
        question: "¿Qué palabra clave define una constante en JavaScript?",
        options: ["var", "let", "const", "static"],
        answer: "const"
    },


    {
        question: "¿Qué paradigma usa clases y objetos?",
        options: ["Funcional", "Procedural", "Orientado a Objetos", "Lógico"],
        answer: "Orientado a Objetos"
    },


    {
        question: "¿Qué hace el método `map()` en JavaScript?",
        options: ["Filtra elementos", "Transforma elementos", "Ordena", "Elimina duplicados"],
        answer: "Transforma elementos"
    },


    {
        question: "¿Qué es un 'callback' en JavaScript?",
        options: ["Una variable", "Un bucle", "Una función", "Un error"],
        answer: "Una función"
    }
]
   
const screens = {
    mainScreen: document.getElementById("main-screen"),
    usernameScreen: document.getElementById("username-screen"),
    quizScreen: document.getElementById("quiz-screen"),
    resultsScreen: document.getElementById("results-screen"),
}


const forms = {
    usernameForm: document.getElementById("username-form"),
}


const buttons = {
    newGame: document.getElementById("new-game-btn"),
    scoreBoard: document.getElementById("score-btn"),
    startGame: document.getElementById("submit-btn"),
    newQuiz: document.getElementById("new-quiz-btn"),
    backMenu: document.getElementById("back-menu-btn"),
    continueBtn: document.getElementById("continue-btn"),
}

function selectRandomQuestions() {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    selectedQuestions = shuffled.slice(0, 10);
}


function showScreen(screenName) {
    Object.values(screens).forEach((screen) => {
        screen.classList.remove("active");
    });
    screens[screenName].classList.add("active");
}


showScreen("mainScreen");




function startNewGame() {
    resetQuiz();
    document.getElementById("username").value = "";
    showScreen("usernameScreen");
}


function startQuiz() {
    resetQuiz();


    if (timer) {
        clearInterval(timer);
    }
   
    startTimer();
    updateTimerDisplay();
    loadQuestion();
    showScreen("quizScreen");
}


function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 300;
    selectedQuestions = [];
   
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
   
    selectRandomQuestions();
    }
   
    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach(button => {
        button.style.backgroundColor = "#FFFAFA";
        button.disabled = false;
    });
   
    document.getElementById("continue-btn").style.display = "none";

function startTimer() {
   
    if (timer) clearInterval(timer);
   
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
       
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}


function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").textContent = `⏱ ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}




function handleSubmitUsername(event) {
    event.preventDefault();
    const username = document.getElementById("username");
}


function loadQuestion() {
    const questionData = selectedQuestions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;
    document.getElementById("question-number").textContent = `${currentQuestionIndex + 1}/10`;


    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach((button, index) => {
        button.textContent = questionData.options[index];
        button.dataset.answer = questionData.options[index];
        button.style.backgroundColor = "#FFFAFA";
        button.disabled = false;
    });


    buttons.continueBtn.style.display = "none";
}


function checkAnswer(selectedOption) {
    const selectedButton = document.querySelector(`[onclick="checkAnswer('${selectedOption}')"]`);
    const questionData = selectedQuestions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll(".option-btn");
   
   
    optionButtons.forEach(button => {
        button.disabled = true;
    });
   
   
    buttons.continueBtn.style.display = "block";
   
   
    optionButtons.forEach(button => {
        if (button.textContent === questionData.answer) {
            button.style.backgroundColor = "#4CAF50";
        } else if (button === selectedButton && button.textContent !== questionData.answer) {
            button.style.backgroundColor = "#F44336";
        }
    });
   
   
    if (selectedButton.textContent === questionData.answer) {
        score++;
    }
}


function nextQuestion() {
    currentQuestionIndex++;
   
    if (currentQuestionIndex < selectedQuestions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}


function endQuiz() {
    clearInterval(timer);
   
   
    currentUser.score = score;
    currentUser.timeLeft = timeLeft;
    currentUser.date = new Date().toLocaleString();
   
   
    saveGameResult();
   
   
    showResults();
    showScreen("resultsScreen");
}


function showScoreboard() {
    const gameResults = JSON.parse(localStorage.getItem('quizResults')) || [];
   
    if (gameResults.length === 0) {
        alert("Aún no hay puntuaciones guardadas.");
        return;
    }
   
   
    let scoreboardHTML = `
        <div class="scoreboard-screen">
            <h2>🏆 Mejores Puntuaciones 🏆</h2>
            <table>
                <tr>
                    <th>Posición</th>
                    <th>Nombre</th>
                    <th>Puntuación</th>
                    <th>Tiempo Restante</th>
                    <th>Fecha</th>
                </tr>
    `;
   
    gameResults.forEach((result, index) => {
        scoreboardHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${result.username}</td>
                <td>${result.score}/10</td>
                <td>${formatTime(result.timeLeft)}</td>
                <td>${result.date}</td>
            </tr>
        `;
    });
   
    scoreboardHTML += `</table></div>`;
   
   
    document.querySelector(".results-section").innerHTML = scoreboardHTML;
    showScreen("resultsScreen");
}


function saveGameResult() {
   
    const gameResults = JSON.parse(localStorage.getItem('quizResults')) || [];
   
   
    gameResults.push({
        username: currentUser.username,
        score: currentUser.score,
        date: currentUser.date,
        timeLeft: currentUser.timeLeft
    });
   
   
    gameResults.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return b.timeLeft - a.timeLeft;
    });
   
   
    const topResults = gameResults.slice(0, 10);
   
   
    localStorage.setItem('quizResults', JSON.stringify(topResults));
}


function showResults() {
    const resultsSection = document.querySelector(".results-section");
   
   
    const gameResults = JSON.parse(localStorage.getItem('quizResults')) || [];
   
   
    let resultsHTML = `
        <h2>${currentUser.username}, tu puntuación: ${score}/10</h2>
        <p>Tiempo restante: ${formatTime(timeLeft)}</p>
        <p>Fecha: ${currentUser.date}</p>
    `;
   
   
    if (gameResults.length > 0) {
        resultsHTML += `
            <div class="scoreboard">
                <h3>🏆 Mejores Puntuaciones 🏆</h3>
                <table>
                    <tr>
                        <th>Posición</th>
                        <th>Nombre</th>
                        <th>Puntuación</th>
                        <th>Tiempo</th>
                        <th>Fecha</th>
                    </tr>
        `;
       
        gameResults.forEach((result, index) => {
            resultsHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${result.username}</td>
                    <td>${result.score}/10</td>
                    <td>${formatTime(result.timeLeft)}</td>
                    <td>${result.date}</td>
                </tr>
            `;
        });
       
        resultsHTML += `</table></div>`;
    }
   
    resultsSection.innerHTML = resultsHTML;
}


function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}


document.addEventListener("DOMContentLoaded", () => {
    const lastUsername = localStorage.getItem('lastUsername');
    if (lastUsername) {
        document.getElementById("username").value = lastUsername;
    }


    //Form


    forms.usernameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById("username");
    currentUser.username = usernameInput.value.trim();
   
    if (currentUser.username) {
        localStorage.setItem('lastUsername', currentUser.username);
        startQuiz();
    } else {
        alert("Por favor, ingresa un nombre de usuario.");
    }
    });




    //Botones        
    buttons.newGame.addEventListener("click", startNewGame);
    buttons.startGame.addEventListener("click", () => {
        currentUser.username = document.getElementById("username").value;
        if (currentUser.username) {
            showScreen("quizScreen");
        } else {
            alert("Por favor, ingresa un nombre de usuario.");
        }    
    });
   
    buttons.newQuiz.addEventListener("click", () => {
   
    const lastUsername = localStorage.getItem('lastUsername');
    if (lastUsername) {
        currentUser.username = lastUsername;
        startQuiz();
    } else {
        showScreen("usernameScreen");
    }
    });
   
    buttons.backMenu.addEventListener("click", () => {
        resetQuiz();
        showScreen("mainScreen");
    });
});




selectRandomQuestions();
loadQuestion();