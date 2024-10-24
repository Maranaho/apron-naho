import { FC, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../../api/userApi'
import { User } from '../../types/userTypes'
import UserRow from "../UserRow/UserRow"
import NothingThere from "../NothingThere/NothingThere"
import Thead from "../Thead/Thead"
import { useLocation } from 'react-router-dom'
import styles from "./UserTable.module.scss"

const UserTable: FC = () => {
    const location = useLocation()
    
    // Get the current sortKey from URL query parameters
    const queryParams = new URLSearchParams(location.search)
    const sortKey = queryParams.get('sortKey') || 'firstName'
    
    // Fetching users using React Query
    const { data: users, error, isLoading } = useQuery<User[], Error>({
        queryKey: ['users'],
        queryFn: fetchUsers,
    })


    // Sorting function
    const sortedUsers = [...(users || [])].sort((a, b) => {
        const key = sortKey as keyof User
        if (a[key] < b[key]) return -1
        if (a[key] > b[key]) return 1
        return 0
    })

    useEffect(() => {
        console.log(`Current sort key: ${sortKey}`)
    }, [sortKey])

    if (error) return <div>Error fetching users: {error.message}</div>
    if (isLoading || !users) return <div>Loading...</div>

    return (
        <section className={styles.UserTableCtn}>
            <table className={styles.UserTable} cellSpacing={0} cellPadding={0}>
                <Thead currentSortKey={sortKey} />
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