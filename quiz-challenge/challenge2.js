

(function(){

    function score(){

        var sc = 0;

        return function(correct){

            if(correct){

                sc++

            }

            return sc;

        }

    }

    var keepScore = score();

    var Question = function(ques,arrayAns,correctAns){

        this.ques = ques;
        this.arrayAns = arrayAns;
        this.correctAns = correctAns;
    
    };
    
    Question.prototype.displayQuestion = function(){
    
        console.log(this.ques);
        
        for(var i = 0;i <this.arrayAns.length;i++)
        {
    
            console.log(i+': '+this.arrayAns[i]);
    
        }
    
    
    };

    Question.prototype.displayScore = function(sco){

        console.log('Yor score is '+sco);

    }
    
    
    Question.prototype.isCorrectAns = function(ans, callback){
    
        var isCorrect = (ans === this.correctAns);
        var sc;
    
        if(isCorrect){
    
            console.log("Correct answer!");
            sc = callback(true);
    
        }else{
    
            console.log("Wrong answer!");
            sc = callback(false);
        }
    
       this.displayScore(sc);
    
    }
    
    var question1 = new Question('What is my name?',['Mark','Bayo','Jones'],1);
    var question2 = new Question('Where is state of origin?',['Lagos','Ogun','Ondo','Rivers'],2);
    var question3 = new Question('What is my profession?',['DJ','Software Dev','Teacher','Farmer'],1);
    var question4 = new Question('How do i have fun ?',['Watch Football','Swim','Party','Reading'],0);
    var question5 = new Question('Favourite Actor?',['James Brown','Keanu Reeves','Joe Garnner','Samuel l Jackson','Bradeley Bill'],3);
    var questionsPool = [question1,
    question2,
    question3,
    question4,
    question5];
    
    
    
    
    function generateRandomQuestion(){
    
        var randomQues = Math.floor(Math.random()*questionsPool.length);
    
        return questionsPool[randomQues];
    
    }
    


  
    function playQuiz(){

        var question = generateRandomQuestion();

        question.displayQuestion();
      
        var answer = prompt('Please select the correct answer (just type the number)');
        
       if(answer!== 'exit'){

        question.isCorrectAns(parseInt(answer),keepScore);

          playQuiz();
       }

    }

    playQuiz();
    
})();