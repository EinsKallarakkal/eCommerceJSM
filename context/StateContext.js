import React, { createContext, useContext, useState, useEffect, Children } from "react";
import { toast } from 'react-hot-toast'

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;


    const incQty = () => {
        setQty((prevqty) => prevqty + 1)
    }
    const decQty = () => {
        setQty((prevqty) => {
            if (prevqty - 1 < 1) return 1
            return prevqty - 1
        })
    }

    const onAdd = (product, qty) => {

        // console.log('product', product);
        setTotalPrice((prvTotalPrice) => prvTotalPrice + (product.price * qty));
        setTotalQuantities((prvTotalQty) => prvTotalQty + qty);

        const checkProductinCart = cartItems.find((items) => items._id === product._id);
        if (checkProductinCart) {

            const updatedCartItems = cartItems.map((cartItem) => {
                if (cartItem._id === product._id) return {
                    ...cartItem,
                    quantity: cartItem.quantity + qty
                }
            })

            setCartItems(updatedCartItems);
        }
        else {
            product.quantity = qty;
            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to the cart`);

    }

    const onRemove=(id)=>{        
        foundProduct = cartItems?.find((item) => item._id === id);
        let newCartItems = cartItems.filter((items)=>items._id !== id);

        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice -  (foundProduct.price * foundProduct.quantity))
        setTotalQuantities((prevTotalQty) => prevTotalQty - foundProduct.quantity)
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems?.find((item) => item._id === id);
        index = cartItems.findIndex((item) => item._id === id);
        // let newCartItems = cartItems.filter((items)=>items._id !== id);
// console.log(cartItems, 'cartItems')
        if (value === 'inc') {
            setCartItems(prevCartItems => {
                const updatedCartItems = [...prevCartItems];
                updatedCartItems[index] = { ...updatedCartItems[index], quantity: updatedCartItems[index].quantity + 1 };
                return updatedCartItems;
            });

            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotalQty) => prevTotalQty + 1)
        }
        else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems(prevCartItems => {
                    const updatedCartItems = [...prevCartItems];
                    updatedCartItems[index] = { ...updatedCartItems[index], quantity: updatedCartItems[index].quantity - 1 };
                    return updatedCartItems;
                });
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities((prevTotalQty) => prevTotalQty - 1)

            }
        }

        // console.log(cartItems, 'newcartItems')

    }


    return (
        <Context.Provider value={{
            showCart,
            cartItems,
            qty,
            totalQuantities,
            totalPrice,
            incQty,
            decQty,
            onAdd,
            setShowCart,
            toggleCartItemQuantity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantities

        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);