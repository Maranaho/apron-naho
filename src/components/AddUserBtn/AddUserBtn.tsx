import { FC } from "react"
import { Link } from 'react-router-dom'
import plusIcon from "../../assets/svg/add.svg"

const AddUserBtn: FC = () => {
    
    return (
        <Link to="/add-user" className='btn primary'>
            <img src={plusIcon} alt="add user"/>
            <span>Add User</span>
        </Link>
    )
}

export default AddUserBtn