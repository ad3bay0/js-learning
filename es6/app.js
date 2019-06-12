//es6 blocks and IIFE

{
    const a = 1;
    let b = 2;
    var c = 3;
}

//console.log(a + b);
//console.log(c);


// ES5
(function() {
    var c = 3;
})();

//console.log(c);

//es6 strings

{

let firstname = `John`;
let lastname = `Smith`;

const yearOfBirth = 1987;

function calcAge(){

    return 2019 - yearOfBirth;
}

//console.log(`${firstname} ${lastname} is ${calcAge()} years old`);

const fullName =  `${firstname} ${lastname}`;

//console.log(fullName.startsWith(`J`));

//console.log(fullName.endsWith(`th`));

//console.log(fullName.toUpperCase());

//console.log(fullName.includes(`oo`));

//console.log(`${fullName} `.repeat(10));

}

//arrow function examples

const years = [1981,1987,1982,1986];

//single param arrow function
let ages = years.map(el=>2019-el);

//console.log(ages);

//double param arrow function
ages = years.map((el,index)=>`Age in index ${index} is ${2019-el}`);

//console.log(ages);

//multiple param with arrow function with multiple line of code
ages = years.map((el,index)=>{

    let year = new Date().getFullYear();

    return `${year-el}`;

});


//console.log(ages);

let box = {
color:'green',
position: 1,
clickMe: function(){

    document.querySelector('.green').addEventListener('click',()=>{
 
       let infoTxt = `color of the box is ${this.color} and in ${this.position}`;

       alert(infoTxt);
    });

}

}

//box.clickMe();

let boxes = document.querySelectorAll('.box');

boxesArray  = Array.from(boxes);

//boxesArray.forEach(el => el.style.backgroundColor='dodgerblue');

//for loop in es6
/*for(let el of boxesArray){

    if(el.className.includes('blue')){

        continue;

    }

    el.textContent = 'I changed to blue';
}*/


//array methods in es6
let agesFull = [12,17,8,21,3,23];

//console.log(agesFull.findIndex(el=>el>=18));
//console.log(agesFull.find(el=>el>=18));

//destructuring in es6
let [d1,d2] = [1,2];
let obj = {df:"John",dl:"Wick"};
let {df,dl} = obj;

const calcuAgeRetirement= (year,rage)=>{

    const age = new Date().getFullYear() - year;

    return [age,rage-age];

}

const [currAge,retirement] = calcuAgeRetirement(1990,65);

//console.log(`Your age is ${currAge} and you are retiring ${retirement}'s time`);

//console.log(d1,d2,df,dl);

//spread operator es6

const sumCal = (a,b,c,d)=>a+b+c+d;

let numSum = [1,2,3,4,5];

let sum1 = sumCal(...numSum);

//console.log(sum1);

let famsmith = ['fam 1','fam 2'];
let fammiller = ['fam 3','fam 4'];

//console.log([...famsmith,...fammiller]);

//spread operator on a node list
const h = document.querySelector('h1');
const bx = document.querySelectorAll('.box');

const all = [h,...bx];

Array.from(all).forEach(el=>el.style.color='purple');

//TODO REST PARAMETERS(OPPOSITE OF SPREA OPERATOR)
let restFunc = (param, ...arrayOj)=>{

    //arrayOj.forEach(el=>console.log(param,el.firstName));
};

let obj1 = {firstName:'Adebayo',lastname:'Adeniyan'};
let obj2 = {firstName:'John',lastname:'Smith'};
let obj3= {firstName:'Aba',lastname:'JOHN'};

restFunc('random',obj1,obj2,obj3);

//DEFAULT PARAMETERS

function NigerianVoter(firstname,lastname,nationality='Nigerian'){

    this.firstname = firstname;
    this.lastname = lastname;
    this.nationality = nationality;

}

//console.log(new NigerianVoter('Adebayo','Adeniyan'));



//maps key value object
const question = new Map();

question.set('questions','Which team has the highest number of ULC titles')
question.set(1,'Real Madrid');
question.set(2,'AC Milan');
question.set(3,'Manchester United');
question.set(4,'Liverpool');
question.set('correct',1);
question.set(true,'correct answer');
question.set(false,'false wrong answer');

//question.delete(4);
//question.clear();
//question.forEach((value,key)=>console.log(`${key}----${value}`));

for(let [key,value] of question.entries()){

    if(typeof(key)=== 'number'){
       // console.log(`${key}----${value}`)
    }

}

//const ans = parseInt( prompt());

//console.log(question.get(ans === question.get('correct')));

//classes prototyping/inheritance from es5 improved

class Person {

    constructor(name, yearOfBirth,job){

        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;

    }

     calculateAge(){

        return new Date().getFullYear() - this.yearOfBirth;

    }

    static greeting(){
        console.log("hey");
    }

}

//const john = new Person('',1987,'Teacher');

//sub classes

class Athlete extends Person{

    constructor(name,yearOfBirth,job,olympicGames,medals){

        super(name,yearOfBirth,job);

        this.olympicGames = olympicGames;
        this.medals = medals;

    }

    wonMedals(){

        this.medals = this.medals++;
        return (this.medals);
    }


}

const spade = new Athlete('John Spade',1978,'Athlete',3,10);






