import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

type ModalProps  = {
    children : React.ReactNode,
    hideCart : () => void,
}

type ModalOverlayProps = {
    children : React.ReactNode,
}

type BackdropProps = {
    hideCart : () => void
}

const Backdrop = ({hideCart} : BackdropProps ) => {
    return <div className={styles.backdrop} onClick={hideCart}></div>
}
const ModalOverlay = ({children}: ModalOverlayProps) => {

    return <div className={styles.modal}>
        <div className={styles.content}>{children}</div>
    </div>
}

const portalElement = document.getElementById('overlays')!;
const Modal = ({children, hideCart} : ModalProps ) => {
    return <React.Fragment>
        {ReactDOM.createPortal(<Backdrop hideCart={hideCart}/>, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </React.Fragment>
}

export default Modal;