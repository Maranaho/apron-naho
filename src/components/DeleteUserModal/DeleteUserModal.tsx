import { FC, useEffect, useState,useContext } from "react"
import useDeleteUser from "../../hooks/useDeleteUser"
import { User } from "../../types/userTypes"
import { useParams, useNavigate, Link } from "react-router-dom"
import { UsersContext } from "../../context"
import initialUsers from "../../data/data" 
import styles from "./DeleteUserModal.module.scss"

const DeleteUserModal: FC = () => {
    const { dispatch } = useContext(UsersContext)
    const navigate = useNavigate()
    const { userid } = useParams<{ userid: string | undefined }>()
    const { mutate: deleteUser } = useDeleteUser()

    // State to hold the user data
    const [user, setUser] = useState<User | undefined>(undefined)

    // Fetch the user data based on userid
    useEffect(() => {
        if (userid) {
            const storedUsers = localStorage.getItem('users')
            const users: User[] = storedUsers ? JSON.parse(storedUsers) : initialUsers
            const fetchedUser = users.find(user => user.id === userid)
            setUser(fetchedUser)
        }
    }, [userid])

    const handleDelete = (): void => {
        if (userid) {
            dispatch && dispatch({type:"SET_USER_DELETED",payload: true})
            deleteUser(userid)
            navigate("/")
        }
    }

    return (
        <div className={styles.DeleteUserModal}>
            <h1>Are you sure you want to delete {user ? `user ${user.firstName}` : "this user"}?</h1>
            <nav>
                {userid && <button onClick={handleDelete}>Delete</button>}
                <Link className="btn secondary" to="/">Cancel</Link>
            </nav>
        </div>
    )
}

export default DeleteUserModal