import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts,setCartProducts] = useState([]);

    useEffect(() => {
        ls?.setItem('cart', JSON.stringify(cartProducts));
    }, [cartProducts]);

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            const storedCartProducts = JSON.parse(ls.getItem('cart'));
            if(storedCartProducts && storedCartProducts.length > 0) {
                setCartProducts(storedCartProducts);
            } else {
                setCartProducts([]);
            }
        } else {
            setCartProducts([]);
        }
    }, []);

    function addProduct(productId) {
        setCartProducts(prev => [...prev,productId]);
    }

    function removeProduct(productId) {
        setCartProducts(prev => {
            const index = prev.indexOf(productId);
            if (index !== -1) {
                return [...prev.slice(0, index), ...prev.slice(index + 1)];
            }
            return prev;
        });
    }

    function clearCart() {
        setCartProducts([]);
    }

    return (
        <CartContext.Provider value={{cartProducts,setCartProducts,addProduct,removeProduct,clearCart}}>
            {children}
        </CartContext.Provider>
    );
}
