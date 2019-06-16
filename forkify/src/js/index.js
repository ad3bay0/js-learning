// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/**
 * Global state of the app
 * -Search object
 * -Current Recipe Object
 * -Shopping list object
 * -Liked Recipe
 */

const state = {};

/**
 * recipe controller
 */


/**
 * search controller
 */
const searchControl = async () => {

    
        //get query from view
        const query = searchView.getSearchInput();

        if (query) {

           try {

            state.search = new Search(query);
            searchView.clearInput();
            searchView.clearResult();
            renderLoader(elements.searchRes);
            await state.search.getResult();
            clearLoader();
            searchView.renderResults(state.search.result);
               
           } catch (error) {

            console.log(`searchControl ${error}`);
           }
        }
   


}

//event listener for search submit button
elements.searchForm.addEventListener('submit', e => {

    e.preventDefault();
    searchControl();

});


elements.searchResPages.addEventListener('click', e => {

    const btn = e.target.closest('.btn-inline');

    if (btn) {

        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResults(state.search.result, goToPage);
    }
});

const controlRecipe = async () => {

    const id = window.location.hash.replace('#', '');

    if (id) {

       
        if(state.search) searchView.highlightSelected(id);

         try {

            state.recipe = new Recipe(id);
            recipeView.clearRecipe();
            renderLoader(elements.recipeDiv);
            await state.recipe.getRecipe();
            clearLoader();
            state.recipe.parseIngredients();
            state.recipe.calcTime();
            state.recipe.calcServings();
            recipeView.renderRecipe(state.recipe);
             
         } catch (error) {
             
            console.log(`controlRecipe:  ${error}`)
         }


       
    }

};
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

//handling recipe button click
elements.recipeDiv.addEventListener('click',e=>{

    if(e.target.matches('.btn-decrease, .btn-decrease *')){

       if(state.recipe.servings>1){
        state.recipe.updateServings('dec');
        recipeView.updateServingsIngredients(state.recipe);
       }

    }else if(e.target.matches('.btn-increase, .btn-increase *')){

        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }

    console.log(state.recipe);

});