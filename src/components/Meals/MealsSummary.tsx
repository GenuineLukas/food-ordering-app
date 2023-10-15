import React from "react";
import styles from "./MealsSummary.module.css"
const MealsSummary = () =>{
    return (
        <section className={styles.summary}>
            <h2>Green Goodness Awaits at <br/>Matcha Magic Bites & Brews! </h2>
            <p>
                Indulge in the opulent experience of selecting exquisite dishes from our exclusive matcha collection.
            </p>
            <p>
                "Each of our matcha-infused creations embodies an unrivaled symphony of unrivaled freshness and extraordinary flavor, elevating your dining experience to new heights."<br/> - Lukas Park, Main Chef
            </p>
        </section>
    )
}

export default MealsSummary;