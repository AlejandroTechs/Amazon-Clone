import React from 'react';
import './Checkout.css';
import Subtotal from './Subtotal';
import { useStateValue } from "./StateProvider"
import CheckoutProduct from './CheckoutProduct';

function Checkout() {
    
    const [{ basket, user }, dispatch] = useStateValue();


    return (
        <div className="checkout">
             
             <div className="checkout__row1">
                 <img className="checkout__ad" 
                    src="https://images-na.ssl-images-amazon.com/images/G/01/marketing/npa/HUB/v2/1921377_npa_hub_header_desktop_v2.png">
                 </img>
                 <div className="checkout__total" src="">
                  <Subtotal />  
                </div>
             </div>
              
             <div className="checkout__basket">
                 <h3>Hello, {user?.email}</h3>

                 <h2>Your Shopping Basket</h2>
                {/* For every item in the basket, render the CheckoutProduct component */}
                 {basket.map(item => (
                     <CheckoutProduct  
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        />
                 ))}
            </div>
             
              
        </div>
        
    )
}

export default Checkout
