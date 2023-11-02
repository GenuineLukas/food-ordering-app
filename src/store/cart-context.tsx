import React from 'react';
import {itemType} from "./CartProvider";

const CartContext = React.createContext<{
    items: itemType[];
    totalAmount: number;
    addItem: (item: itemType) => void;
    removeItem: (id: string) => void;
    clearCart: () => void
}>({
    items: [],
    totalAmount: 0,
    addItem: (item : itemType) => {},
    removeItem: (id : string) => {},
    clearCart: () => {}
})

export default CartContext;