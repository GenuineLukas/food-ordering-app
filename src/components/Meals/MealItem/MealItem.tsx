import React,{useContext} from 'react';
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import styles from "./MealItem.module.css"

type MealItemProps = {
    id: string,
    name: string,
    description: string,
    price: number,
}
const MealItem = ({id, name, description, price} : MealItemProps) => {
    const cartCtx= useContext(CartContext)
    const FixedPrice = `$${price.toFixed(2)}`;

    const addToCartHandler = (amount: number) => {
        cartCtx.addItem({
            id: id,
            name: name,
            amount: amount,
            price: price
        })
    };

    return <li className={styles.meal}>
        <div>
            <h3>{name}</h3>
            <div className={styles.description}>{description}</div>
            <div className={styles.price}>{FixedPrice}</div>
        </div>
        <div>
            <MealItemForm id = {id} onAddToCart={addToCartHandler}/>
        </div>
    </li>
}

export default MealItem;
