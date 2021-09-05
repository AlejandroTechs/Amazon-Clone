// Capital H because it is a component

import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import './Header.css'
import './Login'
import { Link } from "react-router-dom"; 
import { useStateValue } from './StateProvider';

function Header() {
    const [{basket, user}, dispatch] = useStateValue();
    const handleAuth = () => {
        if(user) {
        //    sign user out
        }

    }

    return (
        <div className='header'>
            <Link to="/">
                <img className="header__logo" 
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" 
                /> 
            </Link>
             
            <div className="header__search">
                <input className="header__searchInput" type="text" />
                <SearchIcon className="header__searchIcon" />
                {/* Logo */}
            </div>
            <div className="header__nav">  
                {/* redirect to login only if no user */}
                <Link to={!user && '/login'}>
                    <div onClick={handleAuth} className="header__option">
                        <span className="header__optionLineOne"> { user ? `Hello  ${user.email}` : 'Hello Guest' }</span>
                        <span className="header__optionLineTwo" > { user ? 'Sign Out' : 'Sign In' } </span>
                    </div>
                </Link>
                <Link to="/orders">
                    <div className="header__option">
                        <span className="header__optionLineOne"> Returns </span>
                        <span className="header__optionLineTwo"> & Orders </span>
                    </div>
                </Link>
                 
                <div className="header__option">
                    <span className="header__optionLineOne"> Your </span>
                    <span className="header__optionLineTwo"> Prime </span> 
                </div>
                <div className="header__optionBasket">
                    <Link to="/checkout">
                        <ShoppingBasketIcon />
                    </Link>
                   
                   {/* optional chaining in case basket is undefined */}
                    <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                 </div>
            </div>
        </div>
       
    )
}

export default Header
