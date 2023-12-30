const startBtn = document.getElementById("start-btn");

const questionConEl = document.getElementById("questionContainer");
const questionElement = document.getElementById("question");
const answerButtonsEl = document.getElementById("answer-btns");
const modal = document.getElementById('modal')
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const scoreInput = document.getElementById("score");
const modalSubmit = document.getElementById('submit')
var timer;
var timerEle = document.getElementById('timer')
let sec = 60;



let shuffledQuestions, currentQuestionIndex;

startBtn.addEventListener("click", startGame);

function startTime() {
// console.log('hello')

timer = setInterval(() => {
  timerEle.textContent = sec;
  sec--;

  if(sec < 0) {
    clearInterval(timer);
    endGame()
    //add modal to enter name and save to local storage
  }
}, 1000)
 
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  startBtn.classList.add("hide");

  shuffledQuestions = shuffle(questions);
  currentQuestionIndex = 0;
  questionConEl.classList.remove("hide");
  nextQuestion();

  startTime()
}

function nextQuestion() {
  showQuestion(questions);
}

function showQuestion() {
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  answerButtonsEl.innerHTML = "";
  const correctAnswerIndex = currentQuestion.answers.findIndex(
    (answer) => answer.right === true
  );

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");

    if (index === correctAnswerIndex) {
      button.dataset.right = true;
    }

    button.addEventListener("click", () => chooseAnswer(answer.right));
    answerButtonsEl.appendChild(button);
  });
}

function chooseAnswer(isRight) {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.disabled = true;
    if (button.dataset.right === "true") {
      button.classList.add("right");
    } else {
      button.classList.add("wrong");
    }if(!isRight) {
      subtractTime()
    }
  });

  setTimeout(() => {
    buttons.forEach((button) => {
      button.disabled = false;
      button.classList.remove("right", "wrong");
    });

    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
      showQuestion();
    } else {
      endGame();
    }
  }, 1000);
}

function subtractTime() {
  sec -= 1
  if (sec < 0) {
    sec = 0;
  }

  timerEle.textContent = sec;
}

function endGame() {
    modal.style.display = 'block'
}

modalSubmit.addEventListener('click' , function() {
  store()
})




function store() {
  const userData = {
    name: nameInput.value,
    email: emailInput.value,
    score: scoreInput.value,
  }
    localStorage.setItem('userData', JSON.stringify(userData))
}

const questions = [
  {
    question: 'What does the "===" operator do in JavaScript?',
    answers: [
      { text: "Checks equality without type coercion", right: true },
      { text: "Checks equality with type coercion", right: false },
      { text: "Assigns a value", right: false },
      { text: "Compares values for less than or equal to", right: false },
    ],
  },
  {
    question:
      "Which function is used to execute a block of code after a specified time interval in JavaScript?",
    answers: [
      {
        text: "setInterval()",
        right: false,
      },
      { text: "setTimeout()", right: true },
      { text: "setImmediate()", right: false },
      { text: "executeAfter()", right: false },
    ],
  },
  {
    question:
      'What is the purpose of the "querySelector" method in JavaScript?',
    answers: [
      {
        text: "Selects the first element with a specified class",
        right: false,
      },
      { text: "Selects all elements with a specified class", right: false },
      {
        text: "Selects the first element that matches a specified CSS selector",
        right: true,
      },
      {
        text: "Selects all elements that match a specified CSS selector",
        right: false,
      },
    ],
  },
  {
    question: 'In JavaScript, what is the purpose of the "this" keyword?',
    answers: [
      { text: " Refers to the current function", right: false },
      { text: "Refers to the global object", right: false },
      {
        text: "Refers to the object on which the current method was called",
        right: true,
      },
      { text: " Refers to the prototype object", right: false },
    ],
  },
  {
    question: 'What is the difference between "let" and "const" in JavaScript?',
    answers: [
      {
        text: '"let" is used for constant values, while "const" is used for variables.',
        right: false,
      },
      {
        text: '"let" allows reassignment, while "const" does not',
        right: true,
      },
      {
        text: '"const" is used for block-scoped variables, while "let" is used for function-scoped variables.',
        right: false,
      },
      {
        text: 'Both "let" and "const" are used interchangeably for variable declaration.',
        right: false,
      },
    ],
  },
  {
    question: "What does the Array.prototype.map() method do in JavaScript?",
    answers: [
      {
        text: "Modifies the original array by applying a function to each element",
        right: false,
      },
      {
        text: "Creates a new array with the results of calling a provided function on every element in the original array",
        right: true,
      },
      { text: "Removes the last element from the array", right: false },
      { text: "Concatenates two arrays", right: false },
    ],
  },
  {
    question:
      "What is the purpose of the JSON.stringify() method in JavaScript?",
    answers: [
      {
        text: "Parses a JSON string and returns a JavaScript object",
        right: false,
      },
      {
        text: "Converts a JavaScript object or value to a JSON string",
        right: true,
      },
      { text: " Compares two JSON objects for equality", right: false },
      {
        text: "Retrieves a specific property from a JSON object",
        right: false,
      },
    ],
  },
];
