// Landing page
let signinBtn = document.querySelector("#signin-btn");

if (signinBtn) {
  signinBtn.addEventListener("click", () => {
    window.location.href = "./other-pages/register.html";
  });
  if (localStorage.getItem("users")) {
    window.location.href = "./other-pages/dashboard.html";
  } else {
    console.log("no user");
  }
} else {
  console.log("Not Find!");
}

// Form
const registerForm = document.querySelector("#register-form");
const loginForm = document.querySelector("#login-form");

window.addEventListener("DOMContentLoaded", function () {
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.querySelector("#username").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = users.some((user) => user.email === email);
      console.log(userExists);

      if (userExists) {
        alert(
          "This email is already registered. Please use a different email or log in."
        );
        window.location.href = "login.html";
      } else {
        let user = { username, email, password };
        users.push(user);

        localStorage.setItem("users", JSON.stringify(users));
        registerForm.reset();

        alert("User registered successfully");
        window.location.href = "login.html";
      }
    });
  }
});

// login
if (loginForm) {
  loginForm.addEventListener("submit", function logged(event) {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if (localStorage.getItem("users") == null) {
      alert("Please register first");
      window.location.href = "register.html";
    }

    const users = JSON.parse(localStorage.getItem("users"));

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "./dashboard.html";
      console.log("pass");
    } else {
      alert("Invalid email or password");
    }
  });
}

// Dashboard
let startBtn = document.querySelector("#btn-start");

if (startBtn) {
  startBtn.addEventListener("click", () => {
    window.location.href = "./quiz.html";
  });
}

// Quiz Logic
const questions = [
  {
    question: "Which language is primarily used for web development?",
    answers: [
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true },
      { text: "C++", correct: false },
      { text: "Java", correct: false },
    ],
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Saturn", correct: false },
      { text: "Mars", correct: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Pablo Picasso", correct: false },
      { text: "Claude Monet", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
      { text: "Pb", correct: false },
      { text: "Pt", correct: false },
    ],
  },
  {
    question: "What is the square root of 64?",
    answers: [
      { text: "6", correct: false },
      { text: "7", correct: false },
      { text: "8", correct: true },
      { text: "9", correct: false },
    ],
  },
  {
    question: "Who wrote 'Pride and Prejudice'?",
    answers: [
      { text: "Charlotte Brontë", correct: false },
      { text: "Mark Twain", correct: false },
      { text: "Jane Austen", correct: true },
      { text: "Charles Dickens", correct: false },
    ],
  },
  {
    question: "In which year did the Titanic sink?",
    answers: [
      { text: "1905", correct: false },
      { text: "1912", correct: true },
      { text: "1918", correct: false },
      { text: "1923", correct: false },
    ],
  },
  {
    question: "What is the longest river in the world?",
    answers: [
      { text: "Amazon River", correct: false },
      { text: "Nile River", correct: true },
      { text: "Yangtze River", correct: false },
      { text: "Mississippi River", correct: false },
    ],
  },
  {
    question: "Which element is represented by the symbol 'O'?",
    answers: [
      { text: "Oxygen", correct: true },
      { text: "Osmium", correct: false },
      { text: "Oganesson", correct: false },
      { text: "Oxygenium", correct: false },
    ],
  },
  {
    question: "Who is the author of the Harry Potter series?",
    answers: [
      { text: "J.R.R. Tolkien", correct: false },
      { text: "George R.R. Martin", correct: false },
      { text: "J.K. Rowling", correct: true },
      { text: "Stephen King", correct: false },
    ],
  },
];

const questionElement = document.querySelector("#question");
const answerBtn = document.querySelector("#answer-btn");
let currentQuestionIndex = 0;
let correctAnswersCount = 0;

if (questionElement || answerBtn) {
  const showQuiz = () => {
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    showQuestion(questions[currentQuestionIndex]);
  };

  const showQuestion = (question) => {
    questionElement.innerHTML = question.question;
    answerBtn.innerHTML = "";
    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
        console.log(answer.text, answer.correct);
      }
      answerBtn.addEventListener("click", selectAnswer);
      answerBtn.appendChild(button);
    });
  };
  const selectAnswer = (e) => {
    let selectBtn = e.target;
    console.log(selectBtn);
    let correct = selectBtn.dataset.correct;
    console.log(correct);
    if (correct) {
      alert("Correct!");
      correctAnswersCount++;
    } else {
      const correctAnswer = questions[currentQuestionIndex].answers.find(
        (answer) => {
          return answer.correct;
        }
      );
      alert(`Wrong! The correct answer is ${correctAnswer.text}`);
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(questions[currentQuestionIndex]);
    } else {
      alert(`Your score is ${correctAnswersCount}/${questions.length}`);

      window.location.href = "../index.html";
    }
  };

  showQuiz();

  let u = localStorage.getItem(JSON.stringify("users"))
  console.log(u)
}
