const questions = [
  {
      question: "What does the abbreviation HTML stand for?",
      answers: [
          {text: "HighText Markup Language.", correct: false},
          {text: "HyperText Markdown Language.", correct: false},
          {text: "HyperText Markup Language.", correct: true},
          {text: "None of the above.", correct: false},

      ]
  },

  {
      question: "How many sizes of headers are available in HTML by default?",
      answers: [
          {text: "6", correct: true},
          {text: "5", correct: false},
          {text: "4", correct: false},
          {text: "1", correct: false},

      ]
  },

  {
      question: "What is the smallest header in HTML by default?",
      answers: [
          {text: "h1", correct: false},
          {text: "h6", correct: true},
          {text: "h2", correct: false},
          {text: "h3", correct: false},

      ]
  },

  {
      question: "How to create an ordered list in HTML?",
      answers: [
          {text: "href", correct: false},
          {text: "b", correct: false},
          {text: "ul", correct: false},
          {text: "ol", correct: true},

      ] 
  },

  {
      question: "HTML files are saved by default with the extension?",
      answers: [
          {text: ".h", correct: false},
          {text: ".html", correct: true},
          {text: ".ht", correct: false},
          {text: "None of the above", correct: false},

      ] 
  }
];

const questionList = document.getElementById("questions")
const optionList = document.getElementById("options")
const nextButton = document.getElementById("next-btn")
const gif1 = document.getElementsByClassName('gif1');
const gif2 = document.getElementsByClassName('gif2');
const gif3 = document.getElementsByClassName('gif3');
const gifs = document.getElementsByClassName("gifs");

let questionIndex = 0;
let score = 0;

function mainscreen() {
  resetQuestion();
  questionList.innerHTML = "Press Start to begin the quiz!";
  questionList.classList.add("welcome-line")
  const beginquiz = document.createElement("button");
  beginquiz.innerHTML = "Start";
  beginquiz.classList.add("begin-button");
  questionList.appendChild(beginquiz);

  beginquiz.addEventListener("click", () => {
    quizStart();
    questionList.removeChild(beginquiz);
  });
}


function quizStart(){
  questionIndex = 0;
  score = 0;
  nextButton.innerHTML = "next";
  showQuestion();
}

function showQuestion(){
  resetQuestion();
  let currentQuestion = questions[questionIndex];
  let questionNo = questionIndex + 1;
  questionList.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer=>{
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      optionList.appendChild(button);
      if(answer.correct){
          button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", chooseAnswer)
  })
}

function chooseAnswer(e){
  const choice = e.target;
  const choiceCorrect = choice.dataset.correct === "true";
  if(choiceCorrect){
      choice.classList.add("correct");
      score++;
  }
  else{
      choice.classList.add("wrong");
  }

  Array.from(optionList.children).forEach(button =>{
      if(button.dataset.choice === "true"){
          button.classList.add("correct")
      }
      button.disabled = true;
  })
  nextButton.style.display = "block"
}

function finalScore() {
  resetQuestion();
  let gif;
  if (score <= 2) {
      questionList.innerHTML = ` Your score: ${score}/${questions.length} 🙁`;
      gif = '<img src = "https://media.giphy.com/media/l49JZa00JZm8UAHAY/giphy.gif" alt=gif1>';
  } else if (score === 3) {
      questionList.innerHTML = ` Your score: ${score}/${questions.length} 👍`;
      gif = '<img src="https://media.giphy.com/media/26xBKqeFFspRZjDTW/giphy.gif" alt="gif2">';
  } else if (score === 4 || score === 5) {
      questionList.innerHTML = `Great Job! 😃, your score: ${score}/${questions.length}`
      gif = '<img src="https://media.giphy.com/media/mGK1g88HZRa2FlKGbz/giphy.gif" alt="gif3">';
  }

  const gifContainer = document.createElement('div');
  gifContainer.innerHTML = gif;
  gifContainer.classList.add('giflist')
  questionList.appendChild(gifContainer);

  const playAgainButton = document.createElement('button');
  playAgainButton.innerHTML = 'Play Again';
  playAgainButton.classList.add('playagain');
  questionList.appendChild(playAgainButton);

  playAgainButton.addEventListener('click', mainscreen);

}


function nextQuestion(){
  questionIndex++;
  if(questionIndex<questions.length){
      showQuestion();
  }
  else{
      finalScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(questionIndex < questions.length){
      nextQuestion();
  }
  else{
      quizStart();
  }
})


function resetQuestion(){
  nextButton.style.display = "none";
  while(optionList.firstChild){
      optionList.removeChild(optionList.firstChild);
  }
}

mainscreen();