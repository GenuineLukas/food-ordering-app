import React, {ReactNode} from 'react';
import styles from './Card.module.css'

type CardProps = {
  children: ReactNode;
}
const Card = ({children} : CardProps)=> {
  return <div className={styles.card}>{children}</div>
};

export default Card;