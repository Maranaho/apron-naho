import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editUser, fetchUsers } from '../api/userApi'
import { UID, User } from '../types/userTypes'

const useEditUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, updatedData }: { id: UID; updatedData: Partial<Omit<User, "id" | "createdAt" | "isDeleted">> }) => {
            const updatedUser = editUser(id, updatedData)            
            return updatedUser ? fetchUsers() : Promise.reject('User not found')
        },
        onSuccess: (updatedUsers) => {
            queryClient.setQueryData(['users'], updatedUsers)
        },
    })
}

export default useEditUser