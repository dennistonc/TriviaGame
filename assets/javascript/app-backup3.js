$( document ).ready(function() {
    console.log( "Ready!" );
});

    var quizContainer = $("#quiz")[0];
    var resultsContainer = $("#results")[0];
    var submitButton = $("#submitBtn")[0];

    var numCorrect = 0;
    var numWrong = 0;

    var questionList = [
        {
            q: "What name was Voldemort born with?",
            answers: {
              a: "Newt Scamander",
              b: "Atlas Albatross",
              c: "Tom Riddle",
              d: "Quirinus Quirrell"
        },
            correctAnswer: "c"
        },
        {
            q: "Which of these Hogwarts professors teaches Transfiguration?",
            answers: {
              a: "Professor Sprout",
              b: "Professor McGonagall",
              c: "Professor Snape",
              d: "Professor Trelawney"
        },
            correctAnswer: "b"
        },
        {
            q: "What are the three Unforgivable Curses?",
            answers: {
              a: "Impedimenta, Incarcerous, and Incendio",
              b: "Avada Kedavra, Crucio, and Imperio",
              c: "Expelliarmus, Expecto Patronum, and Diffindo",
              d: "Alohamora, Lumos, and Leviosa"
        },
            correctAnswer: "b"
        },
        {
            q: "What is the name of Hagrid's three-headed dog?",
            answers: {
              a: "Frargoss",
              b: "Diablo",
              c: "Gorrorth",
              d: "Fluffy"
        },
            correctAnswer: "d"
        },
        {
            q: "What other language does Harry Potter speak?",
            answers: {
              a: "Parseltongue",
              b: "Esperanto",
              c: "Beelzebub",
              d: "Kapampangan"
        },
            correctAnswer: "a"
        },
        {
            q: "Which animal is on the emblem for Hufflepuff house?",
            answers: {
              a: "Opossum",
              b: "Raccoon",
              c: "Porcupine",
              d: "Badger"
        },
            correctAnswer: "d"
        },
        {
            q: "What is the name of Ron Weasley's pet rat?",
            answers: {
              a: "Mickey",
              b: "Squeakers",
              c: "Scabbers",
              d: "Remy"
        },
            correctAnswer: "c"
        },
        {
            q: "What is the name of the sweet shop in Hogsmeade?",
            answers: {
              a: "Sweetums",
              b: "Honeydukes",
              c: "Daisydukes",
              d: "Nestle"
        },
            correctAnswer: "b"
        },
        {
            q: "Who does Ron Weaseley's dad work for?",
            answers: {
              a: "FedEx",
              b: "Order of the Phoenix",
              c: "Marauders of Magic",
              d: "Ministry of Magic"
        },
            correctAnswer: "d"
        },
        {
            q: "What is the name of the notorious wizarding prison?",
            answers: {
              a: "Azkaban",
              b: "Alcatraz",
              c: "Azuremyst",
              d: "Archaeopteryx"
        },
            correctAnswer: "a"
        },
    ];

    $("#startBtn").on('click', function(){
        $("#startBtn").hide();
        $("#quiz").toggle();
        $("#quiz").attr("style", "font-family: Girassol;")
        $("#remaining-time").attr("style", "display: show;");
        $("#remaining-time").attr("style", "font-family: Girassol;")
        $("#submitBtn").attr("style", "display: show;");
        newGame();
        startTimer();
    });

    function newGame(){
      // variable to store the HTML output
      var quizHere = [];
  
      // for each question
      questionList.forEach(
        (currentQuestion, questionNumber) => {
  
          // a variable to store the list of possible answers
          var answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // adding HTML radio buttons with expressions in text, also called template strings, which allows to appear on multiple lines in html (keeps it ALL a string and includes vars)
            answers.push(`<label><input type="radio" name="q${questionNumber}" value="${letter}">${currentQuestion.answers[letter]}</label>`);
          }
  
          // pushes the questions and their answers to the quizHere var
          quizHere.push(
            `<div class="question"> ${currentQuestion.q} </div>
            <div class="answers"> ${answers.join(' ')} </div>
            <br>`
          );
        }
      );
  
      // finally combine our quizHere list into one string of HTML and put it on the page
      quizContainer.innerHTML = quizHere.join('');
    }
  
    function showResults(){
      numCorrect = 0;
      numWrong = 0;
      // numEmpty = 10;

      // gather answer containers from our quiz
      var answerContainers = quizContainer.querySelectorAll('.answers'); // grabbed ALL .answers made from line 144
  
      // for each question,
      questionList.forEach( (currentQuestion, questionNumber) => {
  
        // find the selected answer
        var answerContainer = answerContainers[questionNumber];
        var selector = `input[name=q${questionNumber}]:checked`;
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
        }
        // if answer is wrong
        else{
          numWrong++;
        }
        // if answer is unanswered
        // couldn't figure yet
      });
    }

    newGame();
  

    submitButton.addEventListener('click', showResults); // on.click will overwrite any past on.click events

  $("#submitBtn").on('click', function(){
    stop();
    $("#submitBtn").attr("style", "display: none;");
    $("#try-again").attr("style", "display: show;");
    $("#results").attr("style", "display: show;");
    $("#quiz").attr("style", "display: none;");
    $("#results").html("Correct: " + numCorrect + "<br><br>");
    $("#results").attr("style", "font-family: Girassol;")
    $("#results").append("Incorrect: " + numWrong);
    $("#results").attr("style", "font-family: Girassol;")
    // $("#results").append("Unanswered: " + numEmpty);
  });

  $("#try-again").on('click', function(){
    $("#try-again").attr("style", "display: none;");
    $("#submitBtn").attr("style", "display: show;");
    $("#results").attr("style", "display: none;");
    $("#quiz").attr("style", "display: show;");
    $("#quiz").attr("style", "font-family: Girassol;")
    newGame();
    resetTimer();
  });







///////////////// TIMER //////////////////////

stop();

var time = 120;
var intervalId;

window.clearTimeout(intervalId)
$("#startBtn").on("click", startTimer);
$("#remaining-time").html("Remaining Time: " + time);

function resetTimer() {
  time = 120;
  $("#remaining-time").html("Remaining Time: " + time);
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000);
}

function startTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
  }

  function decrement() {
    time--;
    $("#remaining-time").html("Remaining Time: " + time);
    if (time === 0) {
      stop();
      alert("You Ran Out of Time!");
      $("#quiz").attr("style", "display: none;");
      $("#results").html("Better Luck Next Time! ✨");
      $("#results").attr("style", "font-family: Girassol;")
      $("#try-again").attr("style", "display: show;");
      $("#submitBtn").attr("style", "display: none;");
    }
  }

  function stop() {
    clearInterval(intervalId);
  }


//////////////////////////////////////////////////