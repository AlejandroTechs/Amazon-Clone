// This component is the checkout page 
import React, { useState, useEffect } from 'react'
// import axios local file
import axios from './axios';
import './Payment.css'
import { useStateValue } from "./StateProvider"; 
import { getBasketTotal } from './reducer';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
  
 
 
function Payment() {

    const stripe = useStripe(); 
    const elements = useElements();
    const history = useHistory();

    const [{ basket, user }, dispatch] = useStateValue(); 
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);
    const [priceTotal, setPriceTotal] = useState(0); 

    let totalPrice = 0; 

    for (const element of basket) {
        totalPrice += element.price; 
        console.log(totalPrice)
    }

    const priceString = totalPrice.toString(); 
    const formatedPrice = priceString.split('.').join('')
    
    

    

    
    useEffect(() => {
        
        if (formatedPrice > 0) {
            // generate stripe secret reflecting new amount each time the basket changes
            const getClientSecret = async () => {
                // const urlPrice = priceTotal * 100 
                // console.log(`The total price amount is state is >>> ${priceTotal}`)
                console.log('the amount being picked picked up through the url is ', formatedPrice);
                
                const response = await axios({
                    method: 'POST',
                    // stripe expects currenct in subunits i.e. cents
                    url: `/payments/create?total=${formatedPrice}`
                }); 
                setClientSecret(response.data.clientSecret);
                console.log(response)
            }
            getClientSecret()
        }
        else{ 
            console.log('priceTotal is 0, no requset sent')
        }
    }, [basket])
 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        // disable buy button if pressed multiple times
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            // go to db at users collection find user by id and go to their orders collection
            // then create a row/document with order conf id, and set data to order conf data
            // db
            // .collection('users')
            // // uid is very important
            // .doc(user?.uid)
            // .collection('orders')
            // .doc(paymentIntent.id)
            // .set({
            //     basket: basket,
            //     amount: paymentIntent.amount,
            //     created: paymentIntent.created
            // }); 


            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            // dont want to allow user to go back to payment page so using history.replace instead of push
            history.replace('/orders')
        })       
    }


    const handleChange = e => {
        // Listen for changes in CardElement
        // and display any errors as the customer types their details
        setDisabled(e.empty); 
        setError(e.error ? e.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                {/* containss all checkout info and review items */}
                {/* Delivery address - payment section */}

                <h1>
                    Checkout (
                        < Link to="/checkout">{basket?.length}</Link>
                    )
                </h1>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{ user?.email }</p>
                        <p>123 React Lane </p>
                        <p>Atlanta, Ga</p>
                    </div> 
                </div>
                {/* Review Items - payment section */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className='payment__items'>
                        { basket.map(item => (
                            < CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            /> 
                        ))}
                    </div>      
                </div>  
                {/* Payment Method - payment section */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        {/* Stripe magic will go */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className='payment__priceContainer'>
                                <CurrencyFormat 
                                        renderText={(value) => (
                                            <h3> Order Total: { value } </h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                        displayType={"text"}
                                    />
                                <button disabled={ processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing...</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Payment
