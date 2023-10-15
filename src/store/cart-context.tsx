import React from 'react';
import {itemType} from "./CartProvider";

const CartContext = React.createContext<{
    items: any[];
    totalAmount: number;
    addItem: (item: itemType) => void;
    removeItem: (id: string) => void;
}>({
    items: [],
    totalAmount: 0,
    addItem: (item : itemType) => {},
    removeItem: (id : string) => {}
})

export default CartContext;