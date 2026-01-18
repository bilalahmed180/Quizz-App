const startbtn = document.getElementById("startbtn");

const quizModal = document.getElementById("quizModal");
const closeModal = document.getElementById("closeModal");

const quizForm = document.getElementById("quizForm");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");

const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("scoreText");
const totalMcqsText = document.getElementById("totalMcqsText");

const resultBox = document.getElementById("resultBox");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");
const closeResultBtn = document.getElementById("closeResultBtn");

let currentIndex = 0;
let score = 0;

const quizzData = [
    {
        question: "What does HTML stand for?",
        answers: [
            { id: 1, option: "Hyper Text Markup Language" },
            { id: 2, option: "High Text Machine Language" },
            { id: 3, option: "Hyperlink and Text Markup Language" },
            { id: 4, option: "Home Tool Markup Language" }
        ],
        correctAnswer: 1
    },
    {
        question: "Which tag is used for the largest heading in HTML?",
        answers: [
            { id: 1, option: "<h6>" },
            { id: 2, option: "<head>" },
            { id: 3, option: "<h1>" },
            { id: 4, option: "<header>" }
        ],
        correctAnswer: 3
    },
    {
        question: "Which tag is used to create a line break?",
        answers: [
            { id: 1, option: "<br>" },
            { id: 2, option: "<hr>" },
            { id: 3, option: "<p>" },
            { id: 4, option: "<b>" }
        ],
        correctAnswer: 1
    },
    {
        question: "Which tag is used to create a hyperlink?",
        answers: [
            { id: 1, option: "<link>" },
            { id: 2, option: "<a>" },
            { id: 3, option: "<href>" },
            { id: 4, option: "<url>" }
        ],
        correctAnswer: 2
    },
    {
        question: "Which attribute is used to specify the URL of a link?",
        answers: [
            { id: 1, option: "src" },
            { id: 2, option: "href" },
            { id: 3, option: "link" },
            { id: 4, option: "url" }
        ],
        correctAnswer: 2
    },
    {
        question: "Which tag is used to insert an image?",
        answers: [
            { id: 1, option: "<image>" },
            { id: 2, option: "<img>" },
            { id: 3, option: "<pic>" },
            { id: 4, option: "<src>" }
        ],
        correctAnswer: 2
    },
    {
        question: "Which attribute is used to provide alternate text for an image?",
        answers: [
            { id: 1, option: "title" },
            { id: 2, option: "alt" },
            { id: 3, option: "name" },
            { id: 4, option: "placeholder" }
        ],
        correctAnswer: 2
    },
    {
        question: "Which tag is used to create an unordered list?",
        answers: [
            { id: 1, option: "<ol>" },
            { id: 2, option: "<ul>" },
            { id: 3, option: "<li>" },
            { id: 4, option: "<list>" }
        ],
        correctAnswer: 2
    },
    {
        question: "Which tag is used to create an ordered list?",
        answers: [
            { id: 1, option: "<ul>" },
            { id: 2, option: "<li>" },
            { id: 3, option: "<ol>" },
            { id: 4, option: "<order>" }
        ],
        correctAnswer: 3
    },
    {
        question: "Which tag is used for list items?",
        answers: [
            { id: 1, option: "<item>" },
            { id: 2, option: "<li>" },
            { id: 3, option: "<ul>" },
            { id: 4, option: "<ol>" }
        ],
        correctAnswer: 2
    },
    {
        question: "Which tag is used to make text bold?",
        answers: [
            { id: 1, option: "<bold>" },
            { id: 2, option: "<b>" },
            { id: 3, option: "<strong>" },
            { id: 4, option: "<br>" }
        ],
        correctAnswer: 2
    },
    {
        question: "Which tag is used to make text italic?",
        answers: [
            { id: 1, option: "<i>" },
            { id: 2, option: "<italic>" },
            { id: 3, option: "<em>" },
            { id: 4, option: "<it>" }
        ],
        correctAnswer: 1
    },
    {
        question: "Which tag is used to create a table?",
        answers: [
            { id: 1, option: "<table>" },
            { id: 2, option: "<tab>" },
            { id: 3, option: "<tr>" },
            { id: 4, option: "<td>" }
        ],
        correctAnswer: 1
    },
    {
        question: "Which tag is used to create a table row?",
        answers: [
            { id: 1, option: "<td>" },
            { id: 2, option: "<th>" },
            { id: 3, option: "<tr>" },
            { id: 4, option: "<row>" }
        ],
        correctAnswer: 3
    },
    {
        question: "Which tag is used to create a table cell?",
        answers: [
            { id: 1, option: "<tr>" },
            { id: 2, option: "<td>" },
            { id: 3, option: "<th>" },
            { id: 4, option: "<cell>" }
        ],
        correctAnswer: 2
    },
    {
        question: "Which tag is used for table headings?",
        answers: [
            { id: 1, option: "<td>" },
            { id: 2, option: "<tr>" },
            { id: 3, option: "<th>" },
            { id: 4, option: "<head>" }
        ],
        correctAnswer: 3
    },
    {
        question: "Which tag is used to create a form?",
        answers: [
            { id: 1, option: "<input>" },
            { id: 2, option: "<form>" },
            { id: 3, option: "<fieldset>" },
            { id: 4, option: "<label>" }
        ],
        correctAnswer: 2
    },
    {
        question: "Which input type is used for passwords?",
        answers: [
            { id: 1, option: "text" },
            { id: 2, option: "email" },
            { id: 3, option: "password" },
            { id: 4, option: "hidden" }
        ],
        correctAnswer: 3
    },
    {
        question: "Which attribute is required for input fields to send data?",
        answers: [
            { id: 1, option: "id" },
            { id: 2, option: "class" },
            { id: 3, option: "name" },
            { id: 4, option: "type" }
        ],
        correctAnswer: 3
    },
    {
        question: "Which tag is used to add a video in HTML?",
        answers: [
            { id: 1, option: "<media>" },
            { id: 2, option: "<movie>" },
            { id: 3, option: "<video>" },
            { id: 4, option: "<mp4>" }
        ],
        correctAnswer: 3
    }
];

localStorage.setItem("Quizz", JSON.stringify(quizzData));

totalMcqsText.textContent = `Total MCQs: ${quizzData.length}`;

function loadQuestion() {
    const currentQuestion = quizzData[currentIndex];

    progressText.textContent = `${currentIndex + 1}/${quizzData.length}`;
    questionEl.textContent = currentQuestion.question;

    optionsEl.innerHTML = "";

    currentQuestion.answers.forEach((ans) => {
        const label = document.createElement("label");
        label.classList.add("option");

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = ans.id;

        label.appendChild(radio);
        label.append(" " + ans.option);

        optionsEl.appendChild(label);
    });

    const nextBtn = document.querySelector(".next-btn");
    nextBtn.textContent = (currentIndex === quizzData.length - 1) ? "Finish" : "Next";
}

function openModal() {
    quizModal.classList.remove("hidden");
}

function closeModalFunc() {
    quizModal.classList.add("hidden");
}

function resetQuiz() {
    currentIndex = 0;
    score = 0;

    resultBox.classList.add("hidden");
    quizForm.classList.remove("hidden");

    const nextBtn = document.querySelector(".next-btn");
    nextBtn.classList.remove("hidden");

    loadQuestion();
}

startbtn.addEventListener("click", () => {
    openModal();
    resetQuiz();
});

closeModal.addEventListener("click", () => {
    closeModalFunc();
});

closeResultBtn.addEventListener("click", () => {
    closeModalFunc();
});

restartBtn.addEventListener("click", () => {
    resetQuiz();
});

quizForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const selected = document.querySelector('input[name="answer"]:checked');

    if (!selected) {
        alert("Select one option!");
        return;
    }

    const selectedAnswer = Number(selected.value);
    const correctAnswer = quizzData[currentIndex].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        score++;
        scoreText.textContent = `Score: ${score}`;
    }

    currentIndex++;

    if (currentIndex < quizzData.length) {
        loadQuestion();
    } else {
        quizForm.classList.add("hidden");
        resultBox.classList.remove("hidden");
        finalScore.textContent = `You scored ${score} out of ${quizzData.length}.`;
    }
});
