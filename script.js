'use strict';
const quizData = [
  {
   question: '1.Javascript is a _______ language.',
   options: ['Programming', 'Application', 'Scripting', 'None of the above'],
   answer: 'Scripting',
  },
   {
     question: '2.How do you write "Hello W3docs" in an alert box?',
     options: ['alertBox("Hello W3docs");','alert("Hello W3docs");', 'msg("Hello W3docs");', 'modal("Hello W3docs");'],
     answer: 'alert("Hello W3docs");',
   },
   {
     question: '3.Which one of the following is correct?',
     options: ['i =+ 1;', '+i+;', 'i = i++1;', 'i += 1;'],
     answer: 'i += 1;',
   },
   {
     question: '4.Javascript code is written inside file having extension?',
     options: ['.jvs', '.js', '.jsc', '.javascript'],
     answer: '.js',
   },
   {
     question: '5.which one is a ternary operator?',
     options: ['+',':','-','?',],
     answer: '?',
   },
   {
     question: '6.Which of the following is not javascript data types?',
     options: ['Null type', 'Undefined type', 'Number type', 'All of the above'],
     answer: 'All of the above',
   },
   {
     question: '7. Which is correct about JavaScript?',
     options: ['JavaScript is an Object-Based language','JavaScript is Assembly-language','JavaScript is an Object-Oriented language','JavaScript is a High-level language',],
     answer: 'JavaScript is an Object-Based language',
   },
   {
     question: '8.The script tag must be placed in _____?',
     options: ['the head tag', 'the head or body', 'the title or head', 'after the body tag'],
     answer: 'the head or body',
   },
   {
     question: '9.Which of the following Attribute is used to include External JS code inside your HTML Document ?',
     options: ['link','script','ext','src',],
     answer: 'src',
   },
   {
     question: '10.A proper scripting language is a ________?',
     options: ['High level programming language', 'Assembly level programming language', 'Machine level programming language', 'Low level programming language'],
     answer: 'High level programming language',
   },
 ];
 
 const quizContainer = document.getElementById('quiz');
 const resultContainer = document.getElementById('result');
 const submitButton = document.getElementById('submit');
 const retryButton = document.getElementById('retry');
 const previousButton=document.getElementById('previous');
 
 let currentQuestion = 0;
 let score = 0;
 let incorrectAnswers = [];
 
 function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
     const j = Math.floor(Math.random() * (i + 1));
     [array[i], array[j]] = [array[j], array[i]];
   }
 }
 
 function displayQuestion() {
   const questionData = quizData[currentQuestion];
 
   const questionElement = document.createElement('div');
   questionElement.className = 'question';
   questionElement.innerHTML = questionData.question;
 
   const optionsElement = document.createElement('div');
   optionsElement.className = 'options';
 
   const shuffledOptions = [...questionData.options];
   shuffleArray(shuffledOptions);
 
   for (let i = 0; i < shuffledOptions.length; i++) {
     const option = document.createElement('label');
     option.className = 'option';
 
     const radio = document.createElement('input');
     radio.type = 'radio';
     radio.name = 'quiz';
     radio.value = shuffledOptions[i];
 
     const optionText = document.createTextNode(shuffledOptions[i]);
 
     option.appendChild(radio);
     option.appendChild(optionText);
     optionsElement.appendChild(option);
   }
 
   quizContainer.innerHTML = '';
   quizContainer.appendChild(questionElement);
   quizContainer.appendChild(optionsElement);
 }
 
 function checkAnswer() {
   const selectedOption = document.querySelector('input[name="quiz"]:checked');
   if (selectedOption) {
     const answer = selectedOption.value;
     if (answer === quizData[currentQuestion].answer) {
       score++;
     } else {
       incorrectAnswers.push({
         question: quizData[currentQuestion].question,
         incorrectAnswer: answer,
         correctAnswer: quizData[currentQuestion].answer,
       });
     }
     currentQuestion++;
     selectedOption.checked = false;
     if (currentQuestion < quizData.length) {
       displayQuestion();
     } else {
       displayResult();
     }
   }
 }
  function previousQuestion()
  {
    if(currentQuestion>0)
    {
      currentQuestion--;
      displayQuestion();
    }
  }
 function displayResult() {
   quizContainer.style.display = 'none';
   submitButton.style.display = 'none';
   previousButton.style.display='none';
   retryButton.style.display = 'inline-block';
   resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
 }
 
 function retryQuiz() {
   currentQuestion = 0;
   score = 0;
   incorrectAnswers = [];
   quizContainer.style.display = 'block';
   submitButton.style.display = 'inline-block';
   previousButton.style.display='inline-block';
   retryButton.style.display = 'none';
   resultContainer.innerHTML = '';
   displayQuestion();
 }
 previousButton.addEventListener('click',previousQuestion);
 submitButton.addEventListener('click', checkAnswer);
 retryButton.addEventListener('click', retryQuiz);
 displayQuestion();