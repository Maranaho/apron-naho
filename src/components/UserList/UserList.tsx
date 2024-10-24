import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../../api/userApi'
import { useDeleteUser, useEditUser } from '../../hooks'
import { User,UID } from '../../types/userTypes'

const UserList: FC = () => {
    
    // Fetching users using React Query
    const { data: users, error, isLoading } = useQuery<User[], Error>({
        queryKey: ['users'],
        queryFn: fetchUsers,
    })

    // Use the custom hooks for deleting and editing users
    const { mutate: deleteUser } = useDeleteUser()
    const { mutate: editUser } = useEditUser()

    if (error) return <div>Error fetching users: {error.message}</div>
    if (isLoading || !users) return <div>Loading...</div>

    const handleEdit = (id: UID) => {
        const updatedFirstName = prompt('Enter new first name:')
        const updatedLastName = prompt('Enter new last name:')
        if (updatedFirstName && updatedLastName) {
            editUser({ id, updatedData: { firstName: updatedFirstName, lastName: updatedLastName } })
        }
    }

    return (
        <ul>
            {users.length > 0 ? (
                users.map(user => {
                    const { id, firstName, lastName, age, gender } = user
                    return (
                        <li key={id}>
                            <span>{firstName} {lastName} - Age: {age} - Gender: {gender}</span>
                            <button onClick={() => handleEdit(id)}>Edit</button>
                            <button onClick={() => deleteUser(id)}>Delete</button>
                        </li>
                    )
                })
            ) : (
                <li>No users found.</li>
            )}
        </ul>
    )
}

export default UserList