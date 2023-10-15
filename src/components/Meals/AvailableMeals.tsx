import React from 'react';
import Card from "../UI/Card"
import MealItem from "./MealItem/MealItem";
import styles from "./AvailableMeals.module.css"

const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Matcha Zen Garden Salad',
        description: 'A vibrant and refreshing salad featuring a mix of crisp greens, matcha-marinated avocado, toasted almond slivers, and a delicate yuzu-matcha vinaigrette. Topped with edible flower petals for a touch of elegance.',
        price: 14.99,
    },
    {
        id: 'm2',
        name: 'Matcha Glazed Salmon',
        description: 'Succulent salmon fillet marinated in a luscious matcha glaze, then grilled to perfection. Served with a side of sautéed bok choy and matcha-infused jasmine rice for a harmonious blend of flavors.',
        price: 19.99,
    },
    {
        id: 'm3',
        name: 'Matcha Soba Noodles with Tempura Vegetables',
        description: 'Delicate green tea-infused soba noodles served in a light and fragrant matcha broth, accompanied by a medley of crispy tempura vegetables. A soothing and satisfying dish that delights the senses.',
        price: 16.99,
    },
    {
        id: 'm4',
        name: 'Matcha Tiramisu Parfait',
        description: 'A heavenly dessert that combines the richness of classic tiramisu with the elegance of matcha. Layers of matcha-soaked ladyfingers, velvety matcha mascarpone cream, and dusted with matcha powder. Served in a glass for a stunning presentation.',
        price: 8.99,
    },
    {
        id:'m5',
        name:'Matcha Elixir Supreme',
        description:'Our Matcha Elixir Supreme is the epitome of matcha refinement. A blend of ceremonial-grade matcha, freshly steamed almond milk, and a whisper of honey, topped with frothy coconut cream and edible gold leaf. This indulgent drink is a harmonious balance of earthy and sweet, delivered with elegance and opulence.',
        price: 12.99,
    },
    {
        id:'m6',
        name:'Matcha Blossom Infusion',
        description:'The Matcha Blossom Infusion is a work of art in a teacup. A handcrafted blend of premium matcha, delicate cherry blossom essence, and sparkling spring water, served over ice and garnished with a vibrant edible orchid. Experience the ethereal beauty and exquisite taste of this matcha masterpiece.',
        price: 14.99,
    },

];
const AvailableMeals = () => {
    const mealsList = DUMMY_MEALS.map((meal) => <MealItem id={meal.id} key={meal.name} name={meal.name} description={meal.description} price={meal.price}/>);

    return <section className={styles.meals}>
        <Card>
            {mealsList}
        </Card>
    </section>
}

export default AvailableMeals;