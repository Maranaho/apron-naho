import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addUser, fetchUsers } from '../api/userApi'
import { User } from '../types/userTypes'

const useAddUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (newUser: Omit<User, "id" | "createdAt" | "isDeleted">) => {
            addUser(newUser.firstName, newUser.lastName, newUser.age, newUser.gender)
            return fetchUsers()
        },
        onSuccess: (updatedUsers) => {
            queryClient.setQueryData(['users'], updatedUsers)
        },
    })
}

export default useAddUser