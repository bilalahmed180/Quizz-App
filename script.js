const startbtn = document.getElementById("startbtn");
const quizForm = document.getElementById("quizForm");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");


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
    }
];


localStorage.setItem("Quizz", JSON.stringify(quizzData));

startbtn.addEventListener("click", () => {
    startbtn.classList.add("hidden");
    quizForm.classList.remove("hidden");
    loadQuestion();
});

function loadQuestion() {
    const currentQuestion = quizzData[0];
    questionEl.textContent = currentQuestion.question;

    optionsEl.innerHTML = "";
    currentQuestion.answers.forEach(ans => {
        const div = document.createElement("label");
        div.classList.add("option");

        div.innerHTML = `
            <input type="radio" name="answer" value="${ans.id}">
            ${ans.option}
        `;
        optionsEl.appendChild(div);
    });
}

