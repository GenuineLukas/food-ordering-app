import React,{useRef, useState} from 'react';
import Input from "../../UI/Input";
import styles from './MealIteForm.module.css'

type MealItemFormProps = {
    id: string,
    onAddToCart: (amount:number) => void,
}
const MealItemForm = ({id, onAddToCart} : MealItemFormProps) => {
    const [isAmountValid, setIsAmountValid] = useState(true);
    const amountInputRef = useRef<HTMLInputElement>(null);
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(amountInputRef.current){
            const enteredAmount = amountInputRef.current.value; //always a string
            const enteredAmountNumber = +enteredAmount;

            if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
                return;
            }
            onAddToCart(enteredAmountNumber);
        }
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input ref={amountInputRef} label="Amount" input={{
                id: 'amount_' + id,
                type: "number",
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }}/>
            <button>+ Add</button>
            {!isAmountValid && <p>Please enter a valid amout (1-5)</p>}
        </form>
    );
}

export default MealItemForm;