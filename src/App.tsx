import { FC } from 'react'
import { useLocation, useParams } from "react-router-dom"
import Users from './components/Users/Users'
import Header from './components/Header/Header'
import AddUserForm from './components/AddUserForm/AddUserForm'
import Chat from './components/Chat/Chat'
import DeleteUserModal from './components/DeleteUserModal/DeleteUserModal'
import Modal from './components/Modal/Modal'
import styles from "./styles/App.module.scss"
import "./styles/main.scss"

const App:FC = ()=> {

  const location = useLocation()
  const { userid } = useParams<{ userid: string | undefined }>()
  const openAddNewUser = location.pathname === "/add-user"
  const openEditUser = location.pathname === `/edit-user/${userid}`
  const openDeleteUser = location.pathname === `/delete-user/${userid}`
  
  return (
    <main className={styles.App}>
        <Header/>
        <Users />
        {(openAddNewUser || openEditUser) && <Modal><AddUserForm/></Modal>}
        {openDeleteUser && <Modal><DeleteUserModal/></Modal>}
        <Chat/>
    </main>
  )
}

export default App