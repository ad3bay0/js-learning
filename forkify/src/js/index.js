// Global app controller
import modelTitle from './models/Search';
import {user as p } from './models/Search';
import * as sv from './views//searchView';
console.log(modelTitle);
console.log(`${p.name} is ${p.getAge()} years old`);
console.log(`${p.name} would be ${sv.add(p.getAge(),1)} years old next year`);
