
//first class functions: functions that accept functions as parameters
var years = [1999,1998,1993,1994,1993];


function arrayCalc(arry,fnc){

    var arryRes = [];

    for(var i=0; i < arry.length;i++){

        arryRes.push(fnc(arry[i]));

    }

    return arryRes;

}

function calculateAge(vl){

    return 2018 - vl;
}

function isFullAge(vl){

    return vl >= 18;


}

function  maxHeartRate(vl){

return Math.round(206.9 - (0.67*vl));

}

var ages = arrayCalc(years,calculateAge);
var fullAge = arrayCalc(years,isFullAge);
var maxHeart = arrayCalc(years,maxHeartRate);

console.log(ages);
console.log(fullAge);
console.log(maxHeart);


//functions returning functions

function interviewFunction(job){

    if(job==='designer'){

        return function(name){

           console.log( 'Hi '+name+' what is UI/UX?');
        }

    }else if(job ==='teacher'){
        return function(name){

            console.log( 'Hi '+name+' what is education?');
         }

    }else if(job ==='dj'){

        return function(name){

            console.log( 'Hi '+name+' what is turn table');
         }
    }else{

        return function(name){

            console.log( 'Hi '+name+' no questions available for your job role');
         }
    }

}

 //interviewFunction('dj')('bayo');

 //Immiediately Invoked Function Expressions

 (function(){

    var score  =  Math.random() * 10;
     console.log(score >= 5);
 })();


 (function(goodluck){

    var score  =  Math.random() * 10;
     console.log(score >= 5 - goodluck);
 })(5);

 //closure
 function retirement(retirementAge){
var a = ' years left until retirement';
    return function(yearOfBirth){

var age = 2019 - yearOfBirth;

console.log((retirementAge - age)+a);
    }

 }

 var retirementUS = retirement(65)(1985);

 //closure function

 function closureInterviewFunct(job){

    return function(name){
        if(job==='designer'){

    
               console.log( 'Hi '+name+' what is UI/UX?');
            
    
        }else if(job ==='teacher'){
            
    
                console.log( 'Hi '+name+' what is education?');
             
    
        }else if(job ==='dj'){
    
           
    
                console.log( 'Hi '+name+' what is turn table');
            
        }else{

    
                console.log( 'Hi '+name+' no questions available for your job role');
             
        }

    }
 }

 //closureInterviewFunct('dj')('bayo');

