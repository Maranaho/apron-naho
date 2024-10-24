import { Gender, User, UID } from "../types/userTypes"
import initialUsers from "../data"
import { v4 as uid } from "uuid"
import persist from "../utils/persist"

// Pretend db
const storedUsers = localStorage.getItem('users')
const users: User[] = storedUsers ? JSON.parse(storedUsers) : [...initialUsers]

// ------------- Fetch users, filter out soft-deleted -------------
const fetchUsers = (): User[] => users.filter(user => !user.isDeleted)

// ------------- Add a user -------------
const addUser = (
    firstName: string,
    lastName: string,
    age: number,
    gender: Gender
): User => {
    const newUser: User = {
        id: uid(),
        firstName,
        lastName,
        age,
        gender,
        isDeleted: false,
        createdAt: Date.now(),
    }
    users.unshift(newUser)
    persist(users)
    return newUser
}

// ------------- Edit a user -------------
const editUser = (id: UID, updatedData: Partial<Omit<User, "id" | "createdAt" | "isDeleted">>): User | null => {

    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) return null
    const updatedUser = { ...users[userIndex], ...updatedData }
    users[userIndex] = updatedUser
    persist(users)
    
    return updatedUser
}

// ------------- Soft Delete a user -------------
const softDeleteUser = (id: UID): Promise<User[]> => {
    const user = users.find(user => user.id === id)
    if (user) user.isDeleted = true
    persist(users)
    return Promise.resolve(users.filter(user => !user.isDeleted))
}

/*
Here I chose to not actually delete from the "db"
instead I chose a "soft delete" approach
    - Compliant with data retention
    - Easier data recovery
*/


// Exposing the API
export {
    fetchUsers,
    addUser,
    editUser,
    softDeleteUser,
}