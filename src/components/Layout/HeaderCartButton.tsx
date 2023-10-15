import React, {useContext, useEffect, useState} from 'react';
import CartIcon from "../Cart/CartIcon";
import {itemType} from "../../store/CartProvider";
import CartContext from "../../store/cart-context";
import styles from "./HeaderCartButton.module.css";

type HeaderCartButtonProps = {
    showCart: () => void
}
const HeaderCartButton = ({showCart} : HeaderCartButtonProps) => {
    const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);

    const {items} = cartCtx;

    const numberOfItems:number = items.reduce((currNumber:number, item: itemType) =>
       currNumber + item.amount, 0);

    const btnClasses = `${styles.button} ${isBtnHighlighted ? styles.bump : ""}`;

    useEffect(()=>{
        if(items.length === 0){return;}
        setIsBtnHighlighted(true);

        const timer = setTimeout(() => {
            setIsBtnHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return <button className={btnClasses} onClick={showCart}>
            <span className={styles.icon}>
                <CartIcon/>
            </span>
            <span>
                Your Cart
            </span>
            <span className={styles.badge}>
                {numberOfItems}
            </span>
        </button>
}

export default HeaderCartButton;