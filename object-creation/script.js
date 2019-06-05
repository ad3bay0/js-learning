
var Person =  function(name,yearOfBirth,job){

    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job; 

}

Person.prototype.calculateAge = function(){

    console.log(2018-this.yearOfBirth);
};

var john = new Person('John',1985,'Teacher');
var mary = new Person('Mary',1997,'Teacher');
var jane = new Person('Jane',1998,'Teacher');


console.log(john);