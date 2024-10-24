import { FC, useEffect, useState } from "react"
import UserForm from "../UserForm/UserForm"
import useAddUser from "../../hooks/useAddUser"
import useEditUser from "../../hooks/useEditUser"
import { User, UserFormValues } from "../../types/userTypes"
import { useParams, useNavigate } from "react-router-dom"
import initialUsers from "../../data"

const AddUserForm: FC = () => {
    const { userid } = useParams<{ userid: string | undefined }>()
    const { mutate: addUser } = useAddUser()
    const { mutate: editUser } = useEditUser()
    const [userData, setUserData] = useState<User | undefined>(undefined)
    const navigate = useNavigate()

    // Handle form submission
    const handleFormSubmit = (data: UserFormValues) => {
        const userPayload: Omit<User, 'id' | 'createdAt' | 'isDeleted'> = {
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age,
            gender: data.gender,
        }
        
        // Edit existing or add new user depending on userData
        if (userData) editUser({ id: userData.id, updatedData: userPayload })
        else addUser(userPayload)

        navigate("/")
    }

    // Fetch user data if in edit mode
    useEffect(() => {
        
        if (userid) {
            
            // Retrieve users from localStorage
            const storedUsers = localStorage.getItem('users')
            const users: User[] = storedUsers ? JSON.parse(storedUsers) : [...initialUsers]

            // Find the user by id
            const fetchedUser = users.find(user => user.id === userid)
            if (fetchedUser) setUserData(fetchedUser)
        }
    }, [userid])

    return (
        <>
            <h1>{`${userid ? "Edit": "Add"} user`}</h1>
            <UserForm
                onSubmit={handleFormSubmit}
                existingUser={userData}
            />
        </>
    )
}

export default AddUserForm