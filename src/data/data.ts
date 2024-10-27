import { User,Gender } from '../types/userTypes'
import { v4 as uid } from 'uuid'

const initialUsers: User[] = [
    {
        id: uid(),
        gender: Gender.Male,
        firstName: 'Bogdan',
        lastName: "Uzbekov",
        age: 37,
        isDeleted: false,
        createdAt: new Date().getTime()
    },
    {
        id: uid(),
        gender: Gender.Male,
        firstName: 'Yegor',
        lastName: "Belov",
        age: 34,
        isDeleted: false,
        createdAt: new Date().getTime() + 1
    },
    {
        id: uid(),
        gender: Gender.Male,
        firstName: 'Naho',
        lastName: "N'Guessan",
        age: 39,
        isDeleted: false,
        createdAt: new Date().getTime() + 2
    },
    {
        id: uid(),
        gender: Gender.Male,
        firstName: 'Salim',
        lastName: "Hamid",
        age: 38,
        isDeleted: false,
        createdAt: new Date().getTime() + 3
    },
]

export default initialUsers