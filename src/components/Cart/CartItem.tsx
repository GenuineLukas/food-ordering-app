import React from 'react';
import styles from './CartItem.module.css';

type CartItemProps = {
    price: number,
    name: string,
    amount: number,
    onRemove: () => void,
    onAdd: () => void,
}
const CartItem = ({price, name, amount, onRemove, onAdd} : CartItemProps) => {
    const FixedPrice = `$${price.toFixed(2)}`;

    return (
        <li className={styles['cart-item']}>
            <div>
                <h2>{name}</h2>
                <div className={styles.summary}>
                    <span className={styles.price}>{FixedPrice}</span>
                    <span className={styles.amount}>x {amount}</span>
                </div>
            </div>
            <div className={styles.actions}>
                <button onClick={onRemove}>-</button>
                <button onClick={onAdd}>+</button>
            </div>
        </li>
    )
}

export default CartItem;