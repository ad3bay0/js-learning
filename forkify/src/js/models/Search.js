import axios from 'axios';
export default class Search {

    constructor(query) {

        this.query = query;
    }

    async getResult() {

        try {

            const apiKey = '20c0726e301656f7010434b13f12891d';
            const baseAPIUrl = `https://www.food2fork.com/api/search?`;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const params = `key=${apiKey}&q=${this.query}`;
            const url = `${proxy}${baseAPIUrl}${params}`;

            const response = await axios.get(url);
        
            this.result = response.data.recipes;

        } catch (error) {

            console.log(`error: ${error}`);
        }


    }
}
