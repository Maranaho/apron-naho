import { FC } from "react"
import { UserFormValues } from '../../types/userTypes'
import { UseFormRegister } from "react-hook-form"
import styles from "./Input.module.scss"

// Excluding 'gender' from UserFormValues I'll handle separately
type RegisterWithoutGender = UseFormRegister<Omit<UserFormValues, 'gender'>>

// Custom Input component with label and error message
interface InputProps {
    id: keyof Omit<UserFormValues, 'gender'>
    label: string
    register: RegisterWithoutGender
    error?: string
}

const Input: FC<InputProps> = ({
    id,
    label,
    register,
    error
}) => {
    return (
        <fieldset className={styles.Input}>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                className={error?styles.error:""}
                type={id === "age"?"number":"text"}
                {...register(id)}
            />
            {error && <span>{error}</span>}
        </fieldset>
    )
}

export default Input