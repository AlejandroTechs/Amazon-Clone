import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id, image, title, price, rating, hideButton}) {
    const [{basket}, dispatch] = useStateValue(); 

    const removeFromBasket = () => {
        // To remove the item from the basket dispatch action to reducer
        dispatch({
            type: 'REMOVE_FROM_BASKET', 
            id:  id,
        });

    }
    
    return (
        <div className='checkoutProduct'>
            <img src={image} className='checkoutProduct__image' />
            <div className='checkoutProduct__info'> 
                <p className="checkoutProduct__title">{title}</p>
                <p className='checkoutProduct__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating).fill().map((_, i) => (
                        <p>🌟</p>
                    ))}; 
                </div>
                {/* only render button if hideButton is false */}
                {!hideButton && (
                     <button onClick={removeFromBasket}>Remove from Basket</button>  
                )}     
                 
                 
            </div>
             
             
        </div>
    )
}

export default CheckoutProduct
