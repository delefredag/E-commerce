import React, {createContext, useContext, useState} from 'react';
import { NavItems } from '../styles/NavStyles';


const ShopContext = createContext();

export const StateContext = ({children})=>{
    // Add our data for the state
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [qty, setQty] = useState(1);
    
     // Increase product quantity
     const increaseQty = () => {
        setQty((prevQty) => prevQty + 1 );
     };

     // Decrease product quantity
     const decreaseQty = () => {
        setQty(prevQty => {
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1;
        })
     }
     // Add Product to Cart
     const onAdd = (product, quantity) => {
        //Check if the product is already in the cart
        const exist = cartItems.find(item => item.slug === product.slug);
        if(exist){
            setCartItems(cartItems.map((item)=> item.slug === product.slug ? {...exist, quantity : exist.quantity + quantity}
             : item
             )
            );
        } else{
            setCartItems([...cartItems, {...product, quantity : quantity}]);
        }
     };

      // Remove Product
      const onRemove = (product)=>{
        //Check if the product is already in the cart
        const exist = cartItems.find(item => item.slug === product.slug);
        if(exist.quantity === 1){
            setCartItems(cartItems.filter(item => item.slug !== product.slug))
        } else{
            setCartItems(cartItems.map(item => item.slug === product.slug ? {...exist, quantity: exist.quantity - 1} 
            : item 
            )
           );
        }
      };

    return(
        <ShopContext.Provider 
        value ={{
            qty,
            increaseQty,
            decreaseQty,
            showCart,
            setShowCart,
            cartItems,
            onAdd,
            onRemove,
            }}>
        {children}            
        </ShopContext.Provider>
    );
};

export const useStateContext = () => useContext(ShopContext);
