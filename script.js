const questions = [
    {
        question: "Which animal is largest in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which country the biggest in the world?",
        answers: [
            { text: "England", correct: false },
            { text: "America", correct: false },
            { text: "Russia", correct: true },
            { text: "Uzbekistan", correct: false },
        ]
    },
    {
        question: "Who creat 'Facebook'",
        answers: [
            { text: "Mark Suckerberk", correct: true },
            { text: "Steve Jobs", correct: false },
            { text: "Bill Gates", correct: false },
            { text: "Elon Musk", correct: false },
        ]
    },
    {
        question: "When first computer created",
        answers: [
            { text: "1981", correct: false },
            { text: "1891", correct: false },
            { text: "1837", correct: true },
            { text: "1898", correct: false },
        ]
    },
    {
        question: "What is the tallest mountain in the world?",
        answers: [
            { text: "Kangchenjunga", correct: false },
            { text: "Denali", correct: false },
            { text: "Kilimanjaro", correct: false },
            { text: "Mount Everest", correct: true }
        ]
    }
]
const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    let currentQuestionIndex = 0;
    let score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;
    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click" , selectAnswer)
    })
}
function resetState(){
    nextButton.style.display= "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}
function selectAnswer(e){
    const selectedBtn = e.target
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct")
        score++
    }
    else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true
    });
    nextButton.style.display = 'block'
}
function showScore(){
    resetState();
    questionElement.innerHTML = `Your score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore()
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
})
startQuiz()





