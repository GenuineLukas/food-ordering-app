import React from 'react';
import styles from "./Header.module.css"
import matchaHero from "../../assets/matcha.jpg"
import HeaderCartButton from "./HeaderCartButton";

type HeaderProps = {
    showCart : () => void;
}
const Header = ({showCart} : HeaderProps) => {
    return <React.Fragment>
        <header className={styles.header}>
            <h1>Matcha Magic Bites & Brews</h1>
            <HeaderCartButton showCart={showCart}/>
        </header>
        <div className={styles['main-image']}>
            <img src={matchaHero} alt="matcha image"/>
        </div>
        </React.Fragment>
}

export default Header;