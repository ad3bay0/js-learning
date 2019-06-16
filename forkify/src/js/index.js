// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements,renderLoader,clearLoader } from './views/base';

/**
 * Global state of the app
 * -Search object
 * -Current Recipe Object
 * -Shopping list object
 * -Liked Recipe
 */

const state = {};

/**
 * search control
 */
const searchControl = async () => {

    try {
        //get query from view
        const query = searchView.getSearchInput();
        console.log(query);

        if (query) {

            state.search = new Search(query);
            searchView.clearInput();
            searchView.clearResult();
            renderLoader(elements.searchRes);
            await state.search.getResult();
            clearLoader();
            searchView.renderResults(state.search.result);
        }
    } catch (error) {

        console.log(`error index.js: ${error}`)

    }


}

//event listener for search submit button
elements.searchForm.addEventListener('submit', e => {

    e.preventDefault();
    searchControl();

});


elements.searchResPages.addEventListener('click',e=>{

    const btn = e.target.closest('.btn-inline');

    if(btn){

        const goToPage = parseInt(btn.dataset.goto,10);
searchView.clearResult();
        searchView.renderResults(state.search.result,goToPage);
    }
});
