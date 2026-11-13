const questions = [
    {
        question: "Which language is used to structure a webpage?",
        answers: ["CSS", "HTML", "JavaScript", "Python"],
        correctAnswer: 1
    },
    {
        question: "Which language is used to style a webpage?",
        answers: ["HTML", "JavaScript", "CSS", "C++"],
        correctAnswer: 2
    },
    {
        question: "Which language makes a webpage interactive?",
        answers: ["JavaScript", "HTML", "CSS", "SQL"],
        correctAnswer: 0
    },
    {
        question: "Which HTML tag is used for the largest heading?",
        answers: ["h6", "head", "h1", "p"],
        correctAnswer: 2
    },
    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        answers: ["<!-- -->", "//", "**", "##"],
        correctAnswer: 1
    },
    {
        question: "Which keyword is used to declare a variable?",
        answers: ["var", "print", "style", "html"],
        correctAnswer: 0
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;



function startQuiz() {
    localStorage.setItem("quizScore", 0);
    localStorage.setItem("totalQuestions", questions.length);
    window.location.href = "quiz.html";
}

function displayQuestion() {
    let current = questions[currentQuestion];

    document.getElementById("question").innerText = current.question;
    document.getElementById("question-number").innerText =
        "Question " + (currentQuestion + 1) + " of " + questions.length;

    let answerBox = document.getElementById("answer-buttons");
    answerBox.innerHTML = "";

    document.getElementById("feedback").innerText = "";
    document.getElementById("next-btn").disabled = true;

    answered = false;

    for (let i = 0; i < current.answers.length; i++) {
        let button = document.createElement("button");

        button.innerText = current.answers[i];
        button.classList.add("answer-btn");

        button.addEventListener("click", function() {
            selectAnswer(i);
        });

        answerBox.appendChild(button);
    }
}


function selectAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    let current = questions[currentQuestion];
    let buttons = document.querySelectorAll(".answer-btn");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;

        if (i === selectedIndex) {
            buttons[i].classList.add("correct");
        }
    }

    if (selectedIndex === current.correctAnswer) {
        score++;
        document.getElementById("feedback").innerText = "Correct Answer!";
    } else {
        document.getElementById("feedback").innerText = "Wrong Answer!";
    }

    document.getElementById("next-btn").disabled = false;
}


function nextQuestion() {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        localStorage.setItem("quizScore", score);
        window.location.href = "results.html";
    }
}

function showResults() {
    let finalScore = localStorage.getItem("quizScore");
    let total = localStorage.getItem("totalQuestions");

    if (finalScore === null) {
        document.getElementById("final-score").innerText =
            "Please start the quiz first!";
    } else {
        document.getElementById("final-score").innerText =
            "You scored " + finalScore + " out of " + total + "!";
    }
}


function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    localStorage.removeItem("quizScore");
    localStorage.removeItem("totalQuestions");

    window.location.href = "index.html";
}

if (document.getElementById("question")) {
    displayQuestion();
}

if (document.getElementById("final-score")) {
    showResults();
}


