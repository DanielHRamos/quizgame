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

    //test