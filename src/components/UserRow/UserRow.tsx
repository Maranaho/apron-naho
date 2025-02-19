import { FC } from "react"
import { User } from "../../types/userTypes"
import { Link } from "react-router-dom"
import deleteIcon from "../../assets/svg/trash.svg"
import styles from "./UserRow.module.scss"

interface UserRowProps { user: User,hide?:boolean }

const UserRow: FC<UserRowProps> = ({ user,hide }) => {
    const {
        id,
        firstName,
        lastName,
        age,
        gender
    } = user
    return (
        <tr className={`row ${hide ? styles.hide : ""}`}>
            <td><div>{gender}</div></td>
            <td><div>{firstName}</div></td>
            <td><div>{lastName}</div></td>
            <td><div>{age}</div></td>
            <td>
                <div className={styles.actions}>
                    <Link
                        className="btn secondary"
                        to={`/edit-user/${id}`}
                    >Edit</Link>
                    <Link
                        title={`delete ${firstName}`}
                        to={`/delete-user/${id}`}>
                        <img src={deleteIcon} alt={`delete ${firstName}`}/>
                    </Link>
                </div>
            </td>
        </tr>
    )
}

export default UserRow