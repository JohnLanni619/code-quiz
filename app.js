import { questions } from './questions.js';

const correctAnswer = new Audio("assets/correct.wav");
const wrongAnswer = new Audio("assets/incorrect.wav");

const questionEl = document.querySelector("#question");
const choicesEl = document.querySelector("#choices");
const resultEl = document.querySelector("#result");
const timerEl = document.querySelector("#timer");
const startButtonEl = document.querySelector("#start-quiz");
const finalScoreEl = document.querySelector("#final-score");
const initialButton = document.createElement("button")
initialButton.textContent = 'Save'
initialButton.setAttribute("id", "save-button")

let questionIndex = 0;
let correctCount = 0;

let time = 60;
var intervalId;

function showResults() {
  const finalResult = document.createElement("p");
  finalResult.textContent = `Your final score is ${time}! Enter your initials and press the save button to save your score!`;
  finalScoreEl.append(finalResult);

  const initialForm = document.createElement("input")
  finalScoreEl.append(initialForm);
  initialForm.setAttribute("id", "initial-form")

  finalScoreEl.appendChild(initialButton)

  function test() {
    const x = document.getElementById("initial-form").value
    localStorage.setItem(x, time);

    document.location.assign("./high-score.html")
  }

  const saveButton = document.getElementById('save-button')
  saveButton.addEventListener("click", test);
  
}

function endQuiz() {
  clearInterval(intervalId);
  questionEl.remove();
  choicesEl.remove();
  resultEl.remove();
  showResults();
}

function updateTime() {
  timerEl.textContent = 'Timer:' + time;

  if (questionIndex < questions.length) {
    time--;
  }
  
  if (time <= 0) {
    endQuiz();
  }
}

function renderQuestion() {
  const quizContainer = document.querySelector('#quiz-container')
  quizContainer.style.opacity = 1;
  
  if (time == 0) {
    updateTime();
    return;
  }

  intervalId = setInterval(updateTime, 1000);
  const button = document.getElementById('start-quiz')
  questionEl.textContent = questions[questionIndex].question;

  if (button) {
    button.remove();
  }

  choicesEl.innerHTML = "";
  resultEl.innerHTML = "";

  const choices = questions[questionIndex].choices;
  const choicesLength = choices.length;

  for (let i = 0; i < choicesLength; i++) {
    const questionListItem = document.createElement("button");
    questionListItem.textContent = choices[i];
    choicesEl.append(questionListItem);
  }
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    endQuiz();
  }
  renderQuestion();
}

function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("button")) {
    let answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      resultEl.textContent = "Correct";
      correctCount++;
      correctAnswer.play();
    } else {
      resultEl.textContent = "Incorrect";
      time = time - 2;
      timerEl.textContent = 'Timer:' + time;
      wrongAnswer.play();
    }
  }
  const quizContainer = document.querySelector('#quiz-container')
  
  setTimeout( () => {
    quizContainer.style.opacity = 0;
  }, 1000)
  setTimeout(nextQuestion, 2000);
}

choicesEl.addEventListener("click", checkAnswer);
startButtonEl.addEventListener("click", renderQuestion);