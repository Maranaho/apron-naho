import { FC } from "react"
import AddUserBtn from "../AddUserBtn/AddUserBtn"
import logo from "../../assets/svg/logo.svg"
import styles from "./Header.module.scss"

const Header:FC = () => {
    return (
        <header className={styles.Header}>
            <img
                src={logo}
                alt="users"
                className={styles.logo}
            />
            <AddUserBtn/>
        </header>
    )
}
 
export default Header