import React,{useContext, useState} from 'react';
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import {itemType} from "../../store/CartProvider";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import {confirmedDataType} from "./Checkout";
import styles from "./Cart.module.css"

type CartProps = {
    hideCart : () => void;
}

const Cart = ({hideCart} : CartProps) => {
    const [isCheckout, setIsCheckout] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount  = `${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item: itemType) => {
        cartCtx.addItem(item);
    }

    const cartItemRemoveHandler = (id: string) => {
        cartCtx.removeItem(id);
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    //TODO: add a error handling logic
    const submitOrderHandler = async (userData:confirmedDataType) => {
        setIsSubmitting(true);
        await fetch('https://fisrt-react-project-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items,
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

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

    const modalActions = <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={hideCart}>Close</button>
        {hasItems&&<button className={styles.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartModalContent = <React.Fragment>
        {cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={hideCart}/>}
        {!isCheckout && modalActions}
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending order data...</p>

    const didSubmitModalContent =
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={hideCart}>Close</button>
            </div>
        </React.Fragment>


    return(
    <Modal hideCart={hideCart}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {didSubmit && didSubmitModalContent}
    </Modal>);
}

export default Cart;