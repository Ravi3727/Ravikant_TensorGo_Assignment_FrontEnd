import {createContext, useContext, useState} from "react";


const CartContext = createContext();


export const UseMyCart = () => {
    return useContext(CartContext);
}
export const CartContextProvider = ({children}) => {
    const [cart,setCart] = useState([]);

    const alObj = {
        cart,
        setCart
    }


    return <CartContext.Provider value={alObj}> {children} </CartContext.Provider>;
    

}