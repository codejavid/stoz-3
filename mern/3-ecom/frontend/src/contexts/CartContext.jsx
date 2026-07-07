import { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";


const CartContext = createContext();

export const useCart = () => {

    const context = useContext(CartContext);

    if(!context){
        throw new Error("useAuth must be used within authprovider");
    }

    return context;

}


export const CartProvider = ({children}) => {

    const [cartItems, setCartItems] = useState([]);
    
    // Load cart form ls on startup

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");

        if(savedCart){
            setCartItems(JSON.parse(savedCart));
        }

        console.log(savedCart);
    }, []);

    // Save cart to localstorage whenever it change
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            
            const existingItem = prevItems.find(item => item.product === product._id);

            if(existingItem){
                return prevItems.map(item => 
                    item.product === product._id
                    ? { ...item, quantity:item.quantity + quantity }
                    :item
                )
            }else{
                return [...prevItems, {
                    product:product._id,
                    name:product.name,
                    price:product.price,
                    image:product.image,
                    quantity
                }];
            }
        })
    }


    const value = {
        addToCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )


}