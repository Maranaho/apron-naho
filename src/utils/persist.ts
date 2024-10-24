import { User } from '../types/userTypes'
const persist = (users: User[]) => localStorage.setItem('users', JSON.stringify(users))
export default persist