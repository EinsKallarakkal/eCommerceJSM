import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { useStateContext } from '../context/StateContext'
import { runFireWorks } from '../lib/utils'

function success() {

    const { setCartItems,
        setTotalPrice,
        setTotalQuantities } = useStateContext();
        const [order, setOrder] = useState(null);

        useEffect(()=>{
            localStorage.clear();
            setCartItems([]);
            setTotalQuantities(0);
            setTotalPrice(0);
            runFireWorks();
        }, [])

    return (
       <div className='success-Wrapper'>
         <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Thank you for your order</h2>
            <p className='email-msg'>Check your mail for the receipt</p>
            <p className='description'>
                if you hve any questions, please email
                <a className='email' href='mailto:order@ecommercejsm.com'>
                    order@ecommercejsm.com
                </a>
            </p>
            <Link href="/">
                <button type='button' width="300px" className='btn'>
                    Continue Shopping
                </button>
            </Link>
         </div>
       </div>

    )
}

export default success