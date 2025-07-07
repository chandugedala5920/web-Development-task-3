// Multi-Step Quiz Logic
const questions = [
  {
    question: "What is 2 + 2?",
    options: [3, 4, 5],
    answer: 4
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Link", "Hyper Text Markup Language", "Hyper Text Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets"],
    answer: "Cascading Style Sheets"
  }
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("questionText");
const answersDiv = document.getElementById("answers");
const resultText = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  answersDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkQuizAnswer(option);
    answersDiv.appendChild(btn);
  });

  resultText.textContent = "";
  nextBtn.style.display = "none";
}

function checkQuizAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
    resultText.textContent = "✅ Correct!";
    resultText.style.color = "green";
    score++;
  } else {
    resultText.textContent = `❌ Wrong! Correct answer: ${correct}`;
    resultText.style.color = "red";
  }
  // Disable all buttons
  Array.from(answersDiv.children).forEach(btn => btn.disabled = true);
  nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    // Quiz completed
    questionText.textContent = "🎉 Quiz Completed!";
    answersDiv.innerHTML = `You scored ${score} out of ${questions.length}`;
    resultText.textContent = "";
    nextBtn.style.display = "none";
  }
}

// Load the first question on page load
window.onload = function () {
  loadQuestion();
  getJoke(); // optional — load a joke on start if needed
};



// Joke API Function
function getJoke() {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(response => response.json())
    .then(data => {
      document.getElementById("joke").innerText = `${data.setup} 🤔 ${data.punchline}`;
    })
    .catch(error => {
      document.getElementById("joke").innerText = "⚠️ Oops! Couldn’t fetch a joke.";
    });
}
// Carousel Logic
const images = [
  "https://picsum.photos/id/237/600/300",
  "https://picsum.photos/id/238/600/300",
  "https://picsum.photos/id/239/600/300",
  "https://picsum.photos/id/240/600/300"
];

let currentIndex = 0;
const carouselImage = document.getElementById("carouselImage");

function showImage(index) {
  carouselImage.src = images[index];
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}
