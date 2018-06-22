
$(document).ready(function(){
  
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);


// TRIVIA GAME     
  })
  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 60,
    timerOn: false,
    timerId : '',
    // questions
    questions: {
      q1: "June 2018's debut album from Kids See Ghosts features an old ______ song from the 1930s.",
      q2: "Rapper 6ix9ine, formerly known as Tekashi69, is known for having what number tattooed multiple times all over his body?",
      q3: "What artist currently holds the record for single most streamed song within 24 hours (with over 10 million streams)?",
      q4: "What rapper responded with 'Bitch, I might be' when asked by a judge if he was guilty?",
      q5: "Which rapper famously led the cops on a week long manhunt after bailing on his house arrest, in which during produced a song and recorded a music video?",
      q6: "Who was the first rapper to win an Academy Award?",
      q7: "Who made  the score for the video game 'Kingpin: life of crime'?",
      q8: "What rapper was featured in Gears of War 3?",
      q9: "Which rapper is noted for creating ad slogans such as 'ba-da-buh-buh- bah I'm lovin' it' for McDonald's and 'We Got The Meats' for Arby's?",
      q10: "What rapper pops up in Leprechaun in da Hood?"

    },
    // options will appear in order, options are arrays
    options: {
      q1: ["Halloween", "Chinese", "Christmas", "Propaganda"],
      q2: ["17", "69", "400", "6"],
      q3: ["Kanye West", "Drake", "Post Malone", "XXXtentacion"],
      q4: ["Lil Wayne", "Tupac", "Gucci Mane", "Meek Mill"],
      q5: ["Tay-K", "Gucci Mane", "Chief Keef", "T.I."],
      q6: ["Jay Z", "Kanye West", "Juicy J", "Pharrell" ],
      q7: ["Method Man and Red Man", "Cypress Hill", "Mobb Deep", "Smif-n-Wessun"],
      q8: ["Ice T", "Drake", "Snoop Dogg", "Run The Jewels"],
      q9: ["Pusha T", "Busta Rhymes", "Ice Cube", "Jadakiss"],
      q10: ["Doctor Dre", "Post Master P", "Coolio", "Snoop Dogg"]
    },
    // answers, obv
    answers: {
      q1: "Christmas",
      q2: "69",
      q3: "XXXtentacion",
      q4: "Gucci Mane",
      q5: "Tay-K",
      q6: "Juicy J",
      q7: "Cypress Hill",
      q8: "Ice T",
      q9: "Pusha T",
      q10: "Coolio"
    },
    // trivia functions
    // startup function
    startGame: function(){
      // reset and game results
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      // show game section
      $('#game').show();
      
      //  empty last results
      $('#results').html('');
      
      // show timer
      $('#timer').text(trivia.timer);
      
      // remove start button
      $('#start').hide();
  
      $('#remaining-time').show();
      
      // ask first question, move on to next question
      trivia.nextQuestion();
      
    },
    // function that allows you to move on to the next question
    nextQuestion : function(){
      
      // SET QUESTION TIMER HERE
      trivia.timer = 15;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      // prevents timer speed up
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      // gets all the questions then indexes the current questions
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      // an array of all the user options for the current question
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      // creates all the trivia guess options in the html
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    // method to decrement counter and count unanswered if timer runs out
    timerRunning : function(){
      // if timer still has time left and there are still questions left to ask
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      // the time has run out and increment unanswered, run result
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        // maybe where we can change stuff, NOPE, YES OTHERS MARKE 11
        resultId = setTimeout(trivia.guessResult, 5000);
        $('#results').html('<h3>Where ya at, dawg!?! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      // if all the questions have been shown end the game, show results
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        // adds results of game (correct, incorrect, unanswered) to the page
        $('#results')
          .html('<h3>tyvm!</h3>'+
          '<p>Hitz: '+ trivia.correct +'</p>'+
          '<p>Missez: '+ trivia.incorrect +'</p>'+
          '<p>Where were you: '+ trivia.unanswered +'</p>'+
          '<p>enjoy the rest of ur day, mang</p>');
        
        // hide game sction
        $('#game').hide();
        
        // show start button to begin a new game
        $('#start').show();
      }
      
    },
    // function to evaluate the option clicked
    guessChecker : function() {
      
      // timer ID for gameResult setTimeout
      var resultId;
      
      // the answer to the current question being asked
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      // if click on correct answer
      if($(this).text() === currentAnswer){
        // turn button green for correct
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        //                                      11 HERE 11
        resultId = setTimeout(trivia.guessResult, 2000);
        $('#results').html('<h3>That is a HIT!</h3>');
      }
      // Else is user clicks incorrect
      else{
        // turn button clicked red for incorrect
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        //                                      11 HERE 11 5 sec wrong time, can cheat it seems though
        resultId = setTimeout(trivia.guessResult, 5000);
        $('#results').html('<h3>You totally blew it! '+ currentAnswer +'</h3>');
      }
      
    },
    // method to remove previous question results and options
    guessResult : function(){
      
      // increment to next question set
      trivia.currentSet++;
      
      // remove the options and results
      $('.option').remove();
      $('#results h3').remove();
      
      // begin next question
      trivia.nextQuestion();
       
    }
  
  }
// END TRIVIA GAME


// THERE  SEEMS TO BE A PROBLEM WITH THE TIMER SPEEDING UP, BUT ONLY HAPPENS IF YOU PICK A WRONG ANSWER AND THEN SWITCH IT TO THE CORRECT ONE AFTER IT 
// HAS BEEN REVEALED. THIS WILL ALSO COUNT AS A CORRECT ANSWER, HOWEVER. 