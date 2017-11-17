import axios from 'axios';

export function fetchProducts(){
     const externalAPI = 'http://59d4c7075803340011fd5f85.mockapi.io/api/v1/products';
    
    return function(dispatch){
        dispatch({type: "FETCH_PRODUCTS_START"});
        axios.get(externalAPI)
            .then((response) => {
                dispatch({type: "FETCH_PRODUCTS_COMPLETE", payload: response.data})
        })
            .catch((error) => {
               dispatch({type: "FETCH_PRODUCTS_ERROR", payload: error}) 
            });
        
    }
}