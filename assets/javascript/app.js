$(".startOver").hide();

// Beginning jQuery library
$(document).ready(function() {

    // questions
    var triviaQuestions = [{
        question: "Which individual(s) first purchased the land?",
        answerList: ["A. John Muir", "B. The Peralta Family", "C. Elizabeth Thacher & William Kent", "D. Phoebe & George Hearst"],
        answer: 2
    },{
        question: "There is a wooden statue at the Muir Woods National Monument depicting:",
        answerList: ["A. John Muir", "B. Elizabeth Thacher & William Kent", "C. St. Francis", "D. Big Foot"],
        answer: 0
    },{
        question: "Muir Woods is a:",
        answerList: ["A. National Park", "B. State Park", "C. National Monument", "D. None of the above"],
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
    var pngArray = ["question1", "question2", "question3"];


    // this hides the start button slides and begins the game
    $(".btn-light").on("click", function() {
        $(".start").hide();
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
        $(".png").html("<img src = 'assets/images/" + pngArray[questionNumber] + ".png' width = '500px'>");
        //checks to see correct, incorrect, or unanswered
        if ((userSelect == rightAnswerIndex) && (answered == true)){
            correctAnswer++;
            $(".message").html(messages.correct);
            $(".correctedAnswer").html("The correct answer was: " + rightAnswerText);
        } else if ((userSelect != rightAnswerIndex) && (answered == true)){
            incorrectAnswer++;
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

