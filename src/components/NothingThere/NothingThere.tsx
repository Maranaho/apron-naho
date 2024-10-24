import { FC } from "react"
import AddUserBtn from '../AddUserBtn/AddUserBtn'
import styles from "./NothingThere.module.scss"

const NothingThere:FC = () => (
    <tr>
        <td colSpan={5}>
            <div className={styles.nothingThere}>
                <span>Nothing there...</span>
                <AddUserBtn/>
            </div>
        </td>
    </tr>
)
export default NothingThere