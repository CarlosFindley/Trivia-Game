$(".startOver").hide();

// Beginning jQuery library
$(document).ready(function() {

    // questions
    var triviaQuestions = [{
        question: "Which individual(s) first purchased the land that is now called Muir Woods?",
        answerList: ["A. John Muir", "B. The Peralta Family", "C. Elizabeth Thacher & William Kent", "D. Phoebe & George Hearst"],
        answer: 2
    },{
        question: "Muir Woods was named after:",
        answerList: ["A. John Muir", "B. Jamie Muir", "C. Norrie Muir", "D. Lewis F. Muir"],
        answer: 0
    },{
        question: "There is a wooden statue at the Muir Woods National Monument depicting:",
        answerList: ["A. John Muir", "B. Elizabeth Thacher & William Kent", "C. St. Francis", "D. Big Foot"],
        answer: 0
    },{
        question: "Muir Woods is a:",
        answerList: ["A. National Park", "B. State Park", "C. National Monument", "D. None of the above"],
        answer: 2
    },{
        question: "President Theodore Roosevelt established Muir Woods National Monument in:",
        answerList: ["A. 1930", "B. 1898", "C. 2000", "D. 1908"],
        answer: 3
    },{
        question: "The first name suggested for the national monument was:",
        answerList: ["A. Roosevelt Woods National Monument", "B. Kent Woods National Monument", "C. Muir Woods National Monument", "D. Joaquin Miller Woods National Monument"],
        answer: 1
    },{
        question: "Muir Woods is located in what state?",
        answerList: ["A. Oregon", "B. California", "C. Washington", "D. New York"],
        answer: 1
    },{
        question: "Which people first inhabited the area that now comprises Muir Woods?",
        answerList: ["A. Miwoks", "B. The Spanish", "C. United States Settlers", "D. The Aztecs"],
        answer: 0
    },{
        question: "What is Muir Woods known for?",
        answerList: ["A. Coastal Pine trees", "B. Oak trees", "C. Whomping Willow", "D. Redwood trees"],
        answer: 3
    },{
        question: "The tallest redwood tree in Muir Woods is about:",
        answerList: ["A. 150ft", "B. 310ft", "C. 258ft", "D. 120ft"],
        answer: 2
    }];


    
    var questionNumber; 
    var correctAnswer; 
    var incorrectAnswer; 
    var unanswered; 
    var seconds; 
    var time; 
    var answered; 
    var userSelect;
    var messages = {
        correct: "Correct!",
        incorrect: "Wrong choice...",
        endTime: "Time's up!",
        finished: "Trivia Results"
    }
    var pngArray = ["question1", "question2", "question3", "question4", "question5", "question6", "question7", "question8", "question9", "question10"];

    var gameSound = new Audio("./assets/audio/cathedral.mp3"); // resource www.soundcloud.com/user7860487/cathedral-grove-dawn-may
    var winSound = new Audio("./assets/audio/owl.mp3"); // source www.soundwhich.com/free-sound-effects
    var loseSound = new Audio("./assets/audio/bearGrunt.mp3"); // resource www.zapsplat.com/sound-effect-category/bears/


    // this hides the start button slides and begins the game
    $(".btn-light").on("click", function() {
        $(".start").hide();
        gameSound.play();
        gameSound.loop= true;
        newGame();
    });
    
    $(".startOver").on("click", function() {
        $(this).hide();
        newGame();
    });

    // game session
    function newGame() {
        $(".finalMessage").empty();
        $(".correctAnswers").empty();
        $(".incorrectAnswers").empty();
        $(".unanswered").empty();
        questionNumber = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        unanswered = 0;
        $(".content").css({"padding": "5em 0"});
        newQuestion();
    }

    // selects question
    function newQuestion() {
        $(".message").empty();
        $(".correctedAnswer").empty();
        $(".png").empty();
        answered = true;
        
        //sets up new questions & answerList
        $(".questionTracker").html("<span>" + "Question " + (questionNumber+1) + " of " +triviaQuestions.length + "</span>");
        $(".question").html("<span>" + triviaQuestions[questionNumber].question + "</span>");
            
            for (var i = 0; i < 4; i++){
                var choices = $("<div>");
                choices.text(triviaQuestions[questionNumber].answerList[i]);
                choices.attr({"data-index": i });
                choices.addClass("thisChoice");
                $(".answerList").append(choices);
            }

            countdown();
            //clicking an answer will pause the time and setup slideResponse
            $(".thisChoice").on("click", function() {
                userSelect = $(this).data("index");
                clearInterval(time);
                slideResponse();
            });
    }


    function countdown() {
        seconds = 15;
        $("#timeRemaining").html("<span>Time Remaining: " + seconds + "</span>");
        answered = true;
        //sets timer to go down
        time = setInterval(showCountdown, 1000);
    }

    function showCountdown() {
        seconds--;
        $("#timeRemaining").html("<span>Time Remaining: " + seconds + "</span>");
        if (seconds < 1){
            clearInterval(time);
            answered = false;
            slideResponse();
        }
    }

    function slideResponse() {
        $(".questionTracker").empty();
        $(".thisChoice").empty(); //Clears question page
        $(".question").empty();
    
        var rightAnswerText = triviaQuestions[questionNumber].answerList[triviaQuestions[questionNumber].answer];
        var rightAnswerIndex = triviaQuestions[questionNumber].answer;
        $(".png").html("<img src = 'assets/images/" + pngArray[questionNumber] + ".png' width = '460px'>");
        //checks to see correct, incorrect, or unanswered
        if ((userSelect == rightAnswerIndex) && (answered == true)){
            correctAnswer++;
            winSound.play();
            $(".message").html(messages.correct);
            $(".correctedAnswer").html("The correct answer was: " + rightAnswerText);
        } else if ((userSelect != rightAnswerIndex) && (answered == true)){
            incorrectAnswer++;
            loseSound.play();
            $(".message").html(messages.incorrect);
            $(".correctedAnswer").html("The correct answer was: " + rightAnswerText);
        } else {
            unanswered++;
            $(".message").html(messages.endTime);
            $(".correctedAnswer").html("The correct answer was: " + rightAnswerText);
            answered = true;
        }
        
        if (questionNumber == (triviaQuestions.length-1)){
            setTimeout(scoreboard, 5000)
        } else{
            questionNumber++;
            setTimeout(newQuestion, 5000);
        }
        
        function scoreboard(){
            $(".content").css({"padding": "2.5em 0"});
            $("#timeRemaining").empty();
            $(".message").empty();
            $(".correctedAnswer").empty();
            $(".png").empty();
        
            $(".finalMessage").html(messages.finished);
            $(".correctAnswers").html("Correct Answers: " + correctAnswer);
            $(".incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
            $(".unanswered").html("Unanswered: " + unanswered);
            $(".startOver").addClass("reset");
            $(".startOver").show();
            $(".startOver").html("Play Again");
        }
    }

    

});

