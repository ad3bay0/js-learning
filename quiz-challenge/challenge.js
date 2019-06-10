

(function(greeting){

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
    
    
    Question.prototype.isCorrectAns = function(ans){
    
        var isCorrect = (ans === this.correctAns);
    
        if(isCorrect){
    
            console.log("Correct answer!");
    
        }else{
    
            console.log("Wrong answer!");
        }
    
        return isCorrect;
    
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
    


var question = generateRandomQuestion();

question.displayQuestion();
  
    var answer = prompt(greeting);
    
    question.isCorrectAns(parseInt(answer));
    
})('Please select the correct answer (just type the number)');