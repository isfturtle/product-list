import axios from "axios";

const ROOT_URL = "localhost:8000";

export const FETCH_PRODUCTS ="FETCH_PRODUCTS";

export function fetchProducts(queryObject) {
    let queryString = "";
    //Put together the query string. I specify a page every time because it's easier to build the string if I know it's going to start with a page
    if(queryObject.page){
        queryString = `?page=${queryObject.page}`;
    }
    else {
        queryString = "?page=1";
    }
    if(queryObject.category){
        queryString += `&category=${queryObject.category}`;
    }
    if(queryString.price){
        queryString += `&price=${queryObject.price}`;
    }
    const request = axios.get(ROOT_URL+query);
    return {
        type: FETCH_PRODUCTS,
        payload: request
    }
}
