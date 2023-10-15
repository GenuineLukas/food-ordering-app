import React,{useReducer} from 'react';
import CartContext from './cart-context';

type CartProviderProps = {
    children: React.ReactNode;
}

type stateType = {
    items: itemType[],
    totalAmount: number,
}

export type itemType = {
    price: number,
    amount: number,
    id: string,
    name: string,
}

type actionType = {
    type: string,
    id?: string,
    item?: itemType,
}

const defaultCartState = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state: stateType, action: actionType) => {
    if(action.type === 'ADD'){
        if(action.item) {
            const updatedTotalAmount =
                state.totalAmount + action.item.price * action.item.amount;
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.item?.id);
            const existingCartItem = state.items[existingCartItemIndex];
            let updatedCartItems: itemType[];

            if(existingCartItem) {
                const updatedItem: itemType = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount,
                }
                updatedCartItems = [...state.items];
                updatedCartItems[existingCartItemIndex] = updatedItem;
            } else { //when item is added for the first time
                updatedCartItems = state.items.concat(action.item);
            }

            return {
                items: updatedCartItems,
                totalAmount: updatedTotalAmount
            }
        }
    }

    if(action.type === "REMOVE"){
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedCartItems;
        if(existingCartItem.amount === 1){
            updatedCartItems = state.items.filter(item => item.id !== action.id);
        }else{
            const updatedItem: itemType = {
                ...existingCartItem,
                amount: existingCartItem.amount - 1,
            }
            updatedCartItems = [...state.items];
            updatedCartItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedCartItems,
            totalAmount: updatedTotalAmount,
        }
    }
    return defaultCartState;
}
const CartProvider = ({children}: CartProviderProps) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const addItemToCartHandler = (item: itemType) => {
        dispatchCartAction({type:"ADD", item: item})
    };
    const removeItemFromCartHandler = (id: string) => {
        dispatchCartAction({type:"REMOVE", id: id})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>
}

export default CartProvider;