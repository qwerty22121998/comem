window.onload = function() {
  (function() {
    const myQuestions = [
      {
        question:
          "How often have you experienced fatigue and/ or struggle to fall or stay asleep ?"
      },
      {
        question:
          "How often have you felt that you were unable to cope with things you had to do?"
      },
      {
        question:
          "How often have you experienced any of these following symptoms: headaches, chest pain, muscle tension?"
      },
      {
        question:
          "How often have you struggle to focus on tasks or stay motivated?"
      },
      {
        question:
          "How often have you have little appetite or find that you are overeating?"
      },
      {
        question:
          "How often have you been unable to regulate how much caffeine, alcohol, or tobacco you use?"
      }
    ];

    function highlightCircle(questionNumber) {
      const output = [];

      for (let index = 0; index < 6; index++) {
        output.push(
          `<div class="col-md-2">
            <div class="circle ${
              questionNumber === index ? "circle-selected" : ""
            }">${index + 1}</div>
           </div>`
        );
      }
      circleContainer.innerHTML = output.join("");
    }

    function buildQuiz() {
      // we'll need a place to store the HTML output
      const output = [];

      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // we'll want to store the list of answer choices
        const answers = [];

        // and for each available answer...
        for (letter in currentQuestion.answers) {
          // ...add an HTML radio button
          answers.push(
            `<label>
               <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
             </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
             <div class="question"> ${currentQuestion.question} </div>
             <div class="answers"> ${answers.join("")} </div>
           </div>`
        );
      });

      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join("");
    }

    showResults = () => {
      summaryContainer.style.display = "inline-block";
      const output = [];

      const answerContainers = quizContainer.querySelectorAll(".answers");

      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // we'll want to store the list of answer choices
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {})
          .value;

        const answers = [];

        // and for each available answer...
        for (letter in currentQuestion.answers) {
          // ...add an HTML radio button
          answers.push(
            `<label 
                class="
                ${
                  letter === currentQuestion.correctAnswer
                    ? "correct-answer"
                    : ""
                } 
                ${
                  userAnswer === letter
                    ? userAnswer === currentQuestion.correctAnswer
                      ? ""
                      : "wrong-answer"
                    : ""
                }"
              >
               <input type="radio"
                  name="question${questionNumber}" 
                  value="${letter}"
                  ${userAnswer === letter ? "checked" : ""}
                  disabled
                >
                ${letter} :
                ${currentQuestion.answers[letter]}
             </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="summary-slide">
             <div class="question"> ${currentQuestion.question} </div>
             <div class="answers"> ${answers.join("")} </div>
           </div>`
        );
      });

      // finally combine our output list into one string of HTML and put it on the page
    };

    function showSlide(n, isReset = false) {
      if (isReset) {
        summaryContainer.style.display = "none";
        quizParentContainer.style.display = "block";
      }
      slides[currentSlide].classList.remove("active-slide");
      slides[n].classList.add("active-slide");
      currentSlide = n;

      if (currentSlide === 0) {
      } else {
        rarelyButton.style.display = "inline-block";
      }

      if (currentSlide === slides.length - 1) {
        veryButton.style.display = "inline-block";
      } else {
        oftenButton.style.display = "inline-block";
      }
    }

    function showNextSlide() {
      // number of question - 1
      if (currentSlide === 5) {
        quizParentContainer.style.display = "none";
        calculatingContainer.style.display = "block";
        setTimeout(() => {
          calculatingContainer.style.display = "none";
          showResults();
          $("#product-image").animate(
            {
              paddingLeft: "0px"
            },
            "slow"
          );
          // slideImage();
        }, 1500);

        veryButton.style.display = "none";
        rarelyButton.style.display = "none";
        oftenButton.style.display = "none";
        neverButton.style.display = "none";
      } else {
        showSlide(currentSlide + 1);
        highlightCircle(currentSlide);
      }
    }
    const calculatingContainer = document.getElementById(
      "calculating-container"
    );
    calculatingContainer.style.display = "none";

    const quizParentContainer = document.getElementById("quiz-container");
    const quizContainer = document.getElementById("quiz");
    const circleContainer = document.getElementById("circle");
    const summaryContainer = document.getElementById("summary-container");
    summaryContainer.style.display = "none";
    const veryButton = document.getElementById("very");
    const neverButton = document.getElementById("never");
    const productImage = document.getElementById("product-image");

    // display quiz right away
    buildQuiz();

    const rarelyButton = document.getElementById("rarely");
    const oftenButton = document.getElementById("often");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    showSlide(0);
    highlightCircle(0);

    // on submit, show results
    veryButton.addEventListener("click", showNextSlide);
    rarelyButton.addEventListener("click", showNextSlide);
    oftenButton.addEventListener("click", showNextSlide);
    neverButton.addEventListener("click", showNextSlide);
  })();
};
