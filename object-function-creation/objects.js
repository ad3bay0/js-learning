
//Object creation by function contructor
var Person =  function(name,yearOfBirth,job){

    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job; 

}

Person.prototype.calculateAge = function(){

    console.log(this.name+'s age is '+(2018-this.yearOfBirth));
};

var john = new Person('John',1985,'Teacher');
var mary = new Person('Mary',1997,'Teacher');
var jane = new Person('Jane',1998,'Teacher');


john.calculateAge();

//Object creation by Object.create

var personProto = {

    calculateAge: function(){

        console.log(this.name+'s age is '+(2018 - this.Dob ));
    }
}

var mark = Object.create(personProto);
mark.name = 'Mark';
mark.Dob = 1988;
mark.job = 'Teacher';


var mary = Object.create(personProto,{

name:{value: 'Mary'},
Dob:{value: 1978},
job:{value:'designer'}

});
mark.calculateAge();
mary.calculateAge();

//primitives and objects

//primitives

var a = 46;
var b = a;
a = 23;

console.log(a,b);

var obj1 = {

    name: 'john',
    age: 46

};

var obj2 = obj1;

obj1.age = 30;

console.log(obj1.age);
console.log(obj2.age);
