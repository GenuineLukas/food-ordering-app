import React, {useEffect, useState} from 'react';
import Card from "../UI/Card"
import MealItem from "./MealItem/MealItem";
import styles from "./AvailableMeals.module.css"
import * as http from "http";

type mealType = {
    id: string,
    name: string,
    description: string,
    price: number,
}
const AvailableMeals = () => {
    const [meals, setMeals] = useState<mealType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttError] = useState<any>();

    useEffect(() => {
        const fetchMeals = async () => {
            const response =  await fetch('https://fisrt-react-project-default-rtdb.firebaseio.com/meals.json');

            if(!response.ok) {
                throw new Error('something went wrong!')
            }

            const responseData = await response.json();

            const loadedMeals: mealType[] = [];
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                })
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        }

        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttError(error);
        });

    }, []);

    if(httpError){
        return (<section className={styles.mealsError}>
            <p>Error!!!</p>
        </section>);
    }

    //when loading
    if(isLoading){
      return (<section className={styles.mealsLoading}>
          <p>Loading...</p>
      </section>);
    }

    const mealsList = meals.map((meal) =>
        <MealItem id={meal.id} key={meal.name} name={meal.name} description={meal.description} price={meal.price}/>);
    return <section className={styles.meals}>
        <Card>
            {mealsList}
        </Card>
    </section>
}

export default AvailableMeals;