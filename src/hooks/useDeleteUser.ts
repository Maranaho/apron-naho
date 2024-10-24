import { useMutation, useQueryClient } from '@tanstack/react-query'
import { softDeleteUser } from '../api/userApi'
import { UID } from '../types/userTypes'

const useDeleteUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (userId: UID) => softDeleteUser(userId),
        onSuccess: (updatedUsers) => {
            queryClient.setQueryData(['users'], updatedUsers)
        },
    })
}

export default useDeleteUser