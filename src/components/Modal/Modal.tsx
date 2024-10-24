import {
    FC,
    ReactNode,
    MouseEvent,
} from "react"
import {
    Link,
    useNavigate,
    NavigateFunction
} from "react-router-dom"
import closeIcon from "../../assets/svg/close.svg"
import styles from "./Modal.module.scss"

interface ModalProps { children: ReactNode 

}
const Modal: FC<ModalProps> = ({ children }) => {
    
    const navigate:NavigateFunction = useNavigate()
    const handleModalBlur = (e:MouseEvent<HTMLDivElement>)=>{
        if(e.target === e.currentTarget)navigate("/")
    }

    return (
        <div
            className={styles.ModalCtn}
            onClick={handleModalBlur}
        >
            <section className={styles.Modal}>
                <Link
                    to="/"
                    className={styles.closeBtn}
                >
                    <img
                        src={closeIcon}
                        alt="close modal"
                    />
                </Link>
                {children}
            </section>
        </div>
    )
}

export default Modal