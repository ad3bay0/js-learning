// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader } from './views/base';

/**
 * Global state of the app
 * -Search object
 * -Current Recipe Object
 * -Shopping list object
 * -Liked Recipe
 */

const state = {};
window.state = state;

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

//events delegation to deletitem  from shopping list
elements.shopping.addEventListener('click',e=>{

    const id = e.target.closest('.shopping__item').dataset.itemid;

    if(e.target.matches('.shopping__delete, .shopping__delete *')){

        state.list.deleteItem(id);
        listView.deleteItem(id);
    }else if(e.target.matches('.shopping__count-value')){

        const val = parseFloat(e.target.value,10);
      state.list.updateCount(id,val);


    }
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


        if (state.search) searchView.highlightSelected(id);

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

//shopping list controller
const  controlList = ()=>{

    //create new list if there is none yet
    if(!state.list) state.list = new List();

    state.recipe.ingredients.forEach(el=>{
        const item = state.list.addItem(el.count,el.unit,el.ingredient);
        listView.renderItem(item);
    });


}

//like controller
const  controlRecipeLike= ()=>{

    if(!state.likes) state.likes = new Likes();

    const currentId = state.recipe.id;

    if(!state.likes.isLike(currentId)){

        const newLike = state.likes.addLike(
            currentId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        console.log(state.likes);

    }else{


        state.likes.deleteLike(currentId);
        console.log(state.likes);
    }


}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

//handling recipe button click
elements.recipeDiv.addEventListener('click', e => {

    if (e.target.matches('.btn-decrease, .btn-decrease *')) {

        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }

    } else if (e.target.matches('.btn-increase, .btn-increase *')) {

        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);

    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    
       controlList();
    }
    else if (e.target.matches('.recipe__love, .recipe__love *')) {
    
           controlRecipeLike();
     }

   

});

window.l = new List();