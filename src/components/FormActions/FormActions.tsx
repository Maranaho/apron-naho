import { FC } from 'react'
import { Link } from "react-router-dom"
import styles from "./FormActions.module.scss"

interface FormActionsProps { edit?: boolean}

const FormActions:FC<FormActionsProps> = ({ edit }) => {    

    return (
        <nav className={styles.FormActions}>
            <Link className="btn secondary" to="/">Cancel</Link>
            <button className="btn primary" type="submit" form="userForm">{edit?"Save":"Add"}</button>
        </nav>
    )
}
 
export default FormActions