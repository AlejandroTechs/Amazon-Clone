// Reducer is always listening for dispatched data, it is how data is dispatched to data layer
// Reducer resembles API code beteen the app and the data layer
export const initialState = {
    basket: [],
    user: null
};

// Selector
export const getBasketTotal = (basket) => {
    let totalPrice  = 0 ; 

    // for of iterates over nodeLists and Array-like Objects
    for (const element of basket) {
        totalPrice += element.price
    }

    // Create our number formatter.
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const formattedPrice = formatter.format(totalPrice); /* $2,500.00 */
    return formattedPrice

}; 

 

const reducer = (state, action) => {
    
    switch(action.type) {
        case 'ADD_TO_BASKET': 
            return {
                // returns the previous state plus newly dispatched object
                ...state,
                basket: [...state.basket, action.item],
            };

        case 'REMOVE_FROM_BASKET': 
            // In this site all of the same items share ids so expression below finds first matched ID and returns its location in the array
            const index = state.basket.findIndex(
               (basketItem) => basketItem.id === action.id
            );
            
            console.log(`The index is  ${index}`);

           let newBasket = [...state.basket];

           if (index >= 0) {
                // find the point where that item was and remove it
               newBasket.splice(index, 1); 
           } else {
               console.warn( `Cant remove product (id: ${action.id}) as it's not in basket!` )
            }
           return {
               ...state,
               basket: newBasket
            };

        case 'EMPTY_BASKET': 
            return { 
                ...state,
                basket: []
            }

        case 'SET_USER':
            return {
                ...state, 
                user: action.user
            };

        default:
            return state; 
    }
};

export default reducer