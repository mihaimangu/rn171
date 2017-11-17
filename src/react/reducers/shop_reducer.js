
export default (state = {
    products: [],
    fetching: false,
    fetched: false,
    error: null,
    }, action) => {
    
    switch(action.type){
        case "FETCH_PRODUCTS_COMPLETE":{
            return {...state, 
                   fetching: false,
                    fetched: true,
                    products: action.payload
                   }
        }
        
    }
    
    return state;
    
}