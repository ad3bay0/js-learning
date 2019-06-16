import axios from 'axios';
import {apiKey,proxy} from '../config';
export default class Search {

    constructor(query) {

        this.query = query;
    }

    async getResult() {

        try {
            const baseAPIUrl = `https://www.food2fork.com/api/search?`;
            const params = `key=${apiKey}&q=${this.query}`;
            const url = `${proxy}${baseAPIUrl}${params}`;
            const response = await axios.get(url);
            this.result = response.data.recipes;

        } catch (error) {

            console.log(`error: ${error}`);
        }


    } 
}
