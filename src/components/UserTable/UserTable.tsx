import { FC,useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../../api/userApi'
import { User } from '../../types/userTypes'
import UserRow from "../UserRow/UserRow"
import NothingThere from "../NothingThere/NothingThere"
import Thead from "../Thead/Thead"
import { UsersContext } from "../../context"
import styles from "./UserTable.module.scss"

const UserTable: FC = () => {

    const { state:{ currentSortKey } } = useContext(UsersContext)

    // Fetching users using React Query
    const { data: users, error, isLoading } = useQuery<User[], Error>({
        queryKey: ['users'],
        queryFn: fetchUsers,
    })


    // Sorting function
    const sortedUsers = [...(users || [])].sort((a, b) => {
        const key = currentSortKey as keyof User
        if (a[key] < b[key]) return -1
        if (a[key] > b[key]) return 1
        return 0
    })
    
    if (error) return <div>Error fetching users: {error.message}</div>
    if (isLoading || !users) return <div>Loading...</div>

    return (
        <section className={styles.UserTableCtn}>
            <table
                className={styles.UserTable}
                cellSpacing={0}
                cellPadding={0}
            >
                <Thead />
                <tbody>
                    {sortedUsers.length > 0 ? (
                        sortedUsers.map(user => <UserRow key={user.id} user={user} />)
                    ) : <NothingThere /> 
                    }
                </tbody>
            </table>
        </section>
    )
}

export default UserTable