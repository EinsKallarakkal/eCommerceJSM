import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'
import {Cart} from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {

  const {totalQuantities, showCart, setShowCart } = useStateContext();
  return (
    <div className="navbar-container">
      <p>
        <Link href="/">eCommerce JSM
        </Link>
      </p>
      <button type="button" className ="cart-icon" onClick={()=>setShowCart(true)}>        
      <AiOutlineShopping/>
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>
      {showCart && <Cart/>}      
    </div>
  )
}

export default Navbar