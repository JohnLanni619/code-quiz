var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["<javascript>", "<scripting>", "<script>", "<js>"],
        answer: "<script>",
    },
    {
        question: "What's the file extension for a JavaScript file?",
        choices: [".env", ".css", ".js", ".png"],
        answer: ".js",
    },
    {
      question: "var numbers = [1,2,3,4] is an example of:",
      choices: ["Object", "Array", "Function", "Argument"],
      answer: "Array",
    },
  {
    question: "JavaScript can do all of the following except:",
    choices: ["Change HTML attribute values", "Change HTML text", "Create HTML elements", "Read information from an opened web page that came from another server"],
    answer: "Read information from an opened web page that came from another server",
  },
  {
    question: "What is a block of JavaScript code that can be executed when 'called' for?",
    choices: ["Object", "Method", "Function", "Property"],
    answer: "Function",
  },
  {
    question: "Where in an HTML document can scripts be placed?",
    choices: ["body", "head", "neither body or head", "both body and head"],
    answer: "both body and head",
  },
  {
    question: "What are the advantages of placing JavaScript in external files?",
    choices: ["It separates HTML and code", "It's more performant", "It makes HTML and .js easier to read and maintain", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "What can you use to generate information in the console?",
    choices: ["document.write()", "window.print()", "console.log()", "console.print()"],
    answer: "console.log()",
  },
  {
    question: "What is used to separate JavaScript statements?",
    choices: [";", ":", "}", "|"],
    answer: ";",
  },
  {
    question: "Which of the following is the spread operator?",
    choices: ["||", "...", "&&", "==="],
    answer: "...",
  },
];

var correctSound;

function preload() {
  correctSound = loadSound("./correct.wav")
}

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
      snd.play();
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