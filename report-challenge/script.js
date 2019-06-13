/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Elements{

    constructor(name,buildYear){

        this.name = name;
        this.buildYear = buildYear;

    }

}

class Park extends Elements{

    constructor(name,buildYear,parkArea,numberOfTrees){

        super(name,buildYear);

        this.numberOfTrees = numberOfTrees;
        this.parkArea = parkArea;

    }

    calculateTreeDensity(){

        return this.numberOfTrees/this.parkArea;
    }

    calculateAge(){

        return new Date().getFullYear() - this.buildYear;
    }
}

class Street extends Elements{

    constructor(name,buildYear,lenght,size = 3){

        super(name,buildYear);

        this.lenght = lenght;
        this.size = size;

    }

    classifyStreets(){

        const sizeClass = new Map();
        sizeClass.set(1,'tiny');
        sizeClass.set(2,'small');
        sizeClass.set(3,'normal');
        sizeClass.set(4,'big');
        sizeClass.set(5,'huge');

        let s;

        sizeClass.has(this.size) ? s = sizeClass.get(this.size) : s = 'size class not available';

        return s;
    }

}

//3 parks and 4 streets
const parks = [new Park('Green Park', 1987, 0.2, 215),
                 new Park('National Park', 1894, 2.9, 3541),
                 new Park('Oak Park', 1953, 0.4, 949)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Street', 2015, 0.8),
                   new Street('Sunset Boulevard', 1982, 2.5, 5)];


console.log('1. Tree density of each park in the town ');
parks.forEach(el=>{

    return console.log(`${el.name} tree density is ${el.calculateTreeDensity()} denisty per square meter`);

});

console.log('2. Average age of each town\'s park');

const parkAges = parks.map(el=>el.calculateAge());

const averageCalculator = (arry)=>{

let numSize = arry.length;
let sumTotal = arry.reduce((pre,cur,index)=>pre+cur,0);
//arry.forEach(el=>sumTotal += el);
const average = sumTotal/numSize;

return [sumTotal,average];
};

const [totalAgesOfTrees,averageAgeOfTrees] = averageCalculator(parkAges);

console.log(`Our ${parks.length} parks have average age of ${averageAgeOfTrees} years`)

console.log('3. The name of the park that has more than 1000 trees');

const treeGrate = parks.find(el=>el.numberOfTrees>1000);

console.log(`${treeGrate.name} has more that 1000 trees`);

console.log('4. Total and average length of the town\'s streets');

const streetLenghts = allStreets.map(el=>el.lenght);

const [totalLenght,averageLenght] = averageCalculator(streetLenghts);
console.log(`Our ${allStreets.length} streets  has total lenght of ${totalLenght} and average lenght of ${averageLenght}`);
console.log('5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal');


allStreets.forEach(el=>{

console.log(`${el.name} is a ${el.classifyStreets()} street`);

})

