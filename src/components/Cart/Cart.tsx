import React,{useContext} from 'react';
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import {itemType} from "../../store/CartProvider";
import CartContext from "../../store/cart-context";
import styles from "./Cart.module.css"

type CartProps = {
    hideCart : () => void;
}

const Cart = ({hideCart} : CartProps) => {
    const cartCtx = useContext(CartContext);

    const totalAmount  = `${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item: itemType) => {
        cartCtx.addItem(item);
    }

    const cartItemRemoveHandler = (id: string) => {
        cartCtx.removeItem(id);
    }

    const cartItems=
        <ul className={styles['cart-items']}>
        {cartCtx.items.map(item =>
            <CartItem key={item.key}
                 name={item.name}
                 amount={item.amount}
                 price={item.price}
                 onRemove={cartItemRemoveHandler.bind(null, item.id)}
                 onAdd={cartItemAddHandler.bind(null, item)}/>)}
        </ul>

    return(
    <Modal hideCart={hideCart}>
        {cartItems}
       <div className={styles.total}>
           <span>Total Amount</span>
           <span>{totalAmount}</span>
       </div>
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={hideCart}>Close</button>
            {hasItems&&<button className={styles.button}>Order</button>}
        </div>
    </Modal>);
}

export default Cart;