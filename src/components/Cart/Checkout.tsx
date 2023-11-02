import React, {useRef, useState} from 'react';
import styles from "./Checkout.module.css";

type CheckoutProps = {
    onCancel: () => void;
    onConfirm: (userData: confirmedDataType) => void;
}

type formInputsValidityType = {
    name: boolean,
    street: boolean,
    city: boolean,
    postalCode: boolean,
}

export type confirmedDataType = {
    name: string,
    street: string,
    city: string,
    postalCode: string
}

//validation logic
const isEmpty = (param:string | undefined) => {
    const paramToBeTrimmed = param || "";
    return paramToBeTrimmed.trim().length === 0;
}
//validation logic
const isFiveChars = (param:string | undefined) => {
    const paramToBeTrimmed = param || "";
    return paramToBeTrimmed.trim().length === 5;
}

const Checkout = ({onCancel, onConfirm} : CheckoutProps) => {
    const [formInputsValidity, setFormInputsValidity] = useState<formInputsValidityType>({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    })

    const nameInputRef = useRef<HTMLInputElement>(null);
    const streetInputRef = useRef<HTMLInputElement>(null);
    const postalCodeInputRef = useRef<HTMLInputElement>(null);
    const cityInputRef = useRef<HTMLInputElement>(null);
    const confirmHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const enteredName = nameInputRef.current?.value;
        const enteredStreet = streetInputRef.current?.value;
        const enteredPostalCode = postalCodeInputRef.current?.value;
        const enteredCity = cityInputRef.current?.value;


        const enteredNameIsValid = !isEmpty(enteredName!);
        const enteredStreetIsValid = !isEmpty(enteredStreet!);
        const enteredCityIsValid = !isEmpty(enteredCity!);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode!);

        setFormInputsValidity(
            {
                name: enteredNameIsValid,
                street: enteredStreetIsValid,
                city: enteredCityIsValid,
                postalCode: enteredPostalCodeIsValid,
            }
        );

        const formIsValid =
            enteredNameIsValid
            && enteredStreetIsValid
            && enteredCityIsValid
            && enteredPostalCodeIsValid;

        if(!formIsValid){
            return;
        }

        onConfirm({
            name: enteredName!,
            street: enteredStreet!,
            city: enteredCity!,
            postalCode: enteredPostalCode!,
        })
    };

    const nameControlClasses = `${styles.control} ${formInputsValidity.name? '' : styles.invalid}`;
    const streetControlClasses = `${styles.control} ${formInputsValidity.street? '' : styles.invalid}`;
    const postalControlClasses = `${styles.control} ${formInputsValidity.postalCode? '' : styles.invalid}`;
    const cityControlClasses = `${styles.control} ${formInputsValidity.city? '' : styles.invalid}`

    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter the valid name!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef}/>
                {!formInputsValidity.street && <p>Please enter the valid name!</p>}
            </div>
            <div className={postalControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeInputRef}/>
                {!formInputsValidity.postalCode && <p>Please enter the valid name!</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef}/>
                {!formInputsValidity.city && <p>Please enter the valid name!</p>}
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={onCancel}>
                    Cancel
                </button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    ) ;
}

export default Checkout;