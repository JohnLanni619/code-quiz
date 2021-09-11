var questions = [
    {
        question: "Which Dragon Ball did Goku's grandfather give to him?",
        choices: ["3-Star Ball", "7-Star Ball", "1-Star Ball", "4-Star Ball"],
        answer: "4-Star Ball",
    },
    {
        question: "What's the name of the NVIDIA technology that using supersampling to maximize image quality and framerate?",
        choices: ["DLSS", "SUPER", "AMC+", "DRS"],
        answer: "DLSS",
    }
];

var questionEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");
var resultEl = document.querySelector("#result");
var timerEl = document.querySelector("#timer");
var startButtonEl = document.querySelector("#start-quiz");
var finalScoreEl = document.querySelector("#final-score");
var initialButton = document.createElement("button")
initialButton.textContent = 'Save'
initialButton.setAttribute("id", "save-button")

var questionIndex = 0;
var correctCount = 0;

var time = 99;
var intervalId;

function showResults() {
  var finalResult = document.createElement("p");
  finalResult.textContent = `Your final score is ${time}! Enter your initials and press the save button to save your score!`;
  finalScoreEl.append(finalResult);

  var initialForm = document.createElement("input")
  finalScoreEl.append(initialForm);
  initialForm.setAttribute("id", "initial-form")

  finalScoreEl.appendChild(initialButton)

  function test() {
    var x = document.getElementById("initial-form").value
    localStorage.setItem(x, time);
    console.log(x)
    console.log(time)
    document.location.assign("./high-score.html")
  }

  var saveButton = document.getElementById('save-button')
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
  
  if (time == 0) {
    updateTime();
    return;
  }

  intervalId = setInterval(updateTime, 1000);
  var button = document.getElementById('start-quiz')
  questionEl.textContent = questions[questionIndex].question;

  if (button) {
    button.remove();
  }

  choicesEl.innerHTML = "";
  resultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLength = choices.length;

  for (var i = 0; i < choicesLength; i++) {
    var questionListItem = document.createElement("button");
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
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      resultEl.textContent = "Correct";
      correctCount++;
    } else {
      resultEl.textContent = "Incorrect";
      time = time - 2;
      timerEl.textContent = 'Timer:' + time;
    }
  }
  setTimeout(nextQuestion, 2000);
}

choicesEl.addEventListener("click", checkAnswer);
startButtonEl.addEventListener("click", renderQuestion);