import { elements } from './base';

export const getSearchInput = () => elements.searchInput.value;
export const clearInput = () => {

    elements.searchInput.value = ''
};
export const clearResult = () => {

    elements.searchResultList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id=>{

     Array.from(document.querySelectorAll('.results__link')).forEach(el=>el.classList.remove('results__link--active'));
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');

};

//type: prev or next
const createButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
</button>
`;

const renderButton = (page, numberOfResult, resPerPage) => {

    const pages = Math.ceil(numberOfResult / resPerPage);

    let button;
    if (page === 1 && pages > 1) {

        button = createButton(page, 'next');

    } else if (page < pages) {

        button = `
        ${createButton(page, 'next')}
        ${createButton(page, 'prev')}
        
        `;

    } else if (page === pages && pages > 1) {

        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);

};
export const renderResults = (recipes, page = 1, recPerPage = 10) => {

    //render 
    const start = (page - 1) * recPerPage;
    const end = page * recPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    renderButton(page,recipes.length,recPerPage);
};

/*// Pasta with tomato and spinach
0 
*/
const limitRecipeTitle = (title, limit = 17) => {

    const newTitle = [];

    if (title.length > limit) {

        title.split(' ').reduce((acc, cur) => {

            if (acc + cur.length <= limit) {

                newTitle.push(cur)
            }
            return acc + cur.length;

        }, 0);

        return `${newTitle.join(' ')}...`

    }
    return title;
}
const renderRecipe = recipe => {

    const markup = `
<li>
<a class="results__link" href="#${recipe.recipe_id}">
    <figure class="results__fig">
        <img src="${recipe.image_url}" alt="${recipe.title}">
    </figure>
    <div class="results__data">
        <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
        <p class="results__author">${recipe.publisher}</p>
    </div>
</a>
</li>
`;

    elements.searchResultList.insertAdjacentHTML('beforeend', markup);

};