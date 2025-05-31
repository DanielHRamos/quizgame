let currentUser = {
    username: "",
    score: "0",
    date: "",
}

const screens = {
    mainScreen: document.getElementById("main-screen"),
    usernameScreen: document.getElementById("username-screen"),
    quizScreen: document.getElementById("quiz-screen"),
}

const forms = {
    usernameForm: document.getElementById("username-form"),
}

const buttons = {
    newGame: document.getElementById("new-game-btn"),
    scoreBoard: document.getElementById("score-btn"),
    startGame: document.getElementById("submit-btn"),
}

function showScreen(screenName) {
    Object.values(screens).forEach((screen) => {
        screen.classList.remove("active");
    });
    screens[screenName].classList.add("active");
}

showScreen("mainScreen");

function startNewGame() {
    currentUser = {
        username: "",               
    };
    showScreen("usernameScreen");
}

function handleSubmitUsername(event) {
    event.preventDefault();
    const username = document.getElementById("username");
    console.log(username.value);

}

document.addEventListener("DOMContentLoaded", () => {
    //Forms

    forms.usernameForm.addEventListener("submit", handleSubmitUsername);




    //Botones
    buttons.newGame.addEventListener("click", startNewGame);
});
