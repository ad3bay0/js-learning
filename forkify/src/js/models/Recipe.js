import axios from 'axios';
import {apiKey,proxy} from '../config';


export default class Recipe{

    constructor(id){

        this.id = id;
    };

    async getRecipe(){

        try{

            const baseAPIUrl = `https://www.food2fork.com/api/get?`;
            const params = `key=${apiKey}&rId=${this.id}`;
            const url = `${proxy}${baseAPIUrl}${params}`;
            const response = await axios.get(url);
            this.title = response.data.recipe.title;
            this.author = response.data.recipe.publisher;
            this.img = response.data.recipe.image_url;
            this.url = response.data.recipe.source_url;
            this.ingredients = response.data.recipe.ingredients;

        }catch(error){

            console.log(error);
        }
    }
    
    calcTime(){

        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time = periods * 15;

    }

    calcServings(){

        this.servings = 4;
    }

    parseIngredients(){

        const unitLong = ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];

        const newIngrdients = this.ingredients.map(el => {

            let ingredient = el.toLowerCase();

            unitLong.forEach((unit, i) => {

                ingredient = ingredient.replace(unit,unitShort[i])

            });

            ingredient = ingredient.replace(/[{()}]/g, '');

            const arryIng  =  ingredient.split(' ');
            const unitIndex =arryIng.findIndex(el2=>unitShort.includes(el2));

            let objIng;

            if (unitIndex > -1) {
            
                const arrCount = arryIng.slice(0,unitIndex);
                let count;

                if(arrCount.length === 1){

                    count= eval(arryIng[0].replace('-','+'));
  
                  }else{
                      
                   count = eval(arryIng.slice(0,unitIndex).join('+'));
                  }

                objIng = {
                    count,
                    unit: arryIng[unitIndex] ,
                    ingredient:arryIng.slice(unitIndex+1).join(' ')
                };

            } else if (parseInt(arryIng[0], 10)) {

                objIng = {
                    count: parseInt(arryIng[0], 10),
                    unit: '',
                    ingredient: arryIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }

            }

            return objIng;


        });

        this.ingredients = newIngrdients;
    }

}