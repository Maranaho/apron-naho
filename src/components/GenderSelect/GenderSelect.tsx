import { FC } from "react"
import { Gender, UserFormValues } from '../../types/userTypes'
import { UseFormRegister } from 'react-hook-form'
import styles from "./GenderSelect.module.scss"

// Custom GenderSelect component with label and error message
interface GenderSelectProps {
    register: UseFormRegister<UserFormValues>
    error?: string
}

const GenderSelect: FC<GenderSelectProps> = ({
    register,
    error
}) => {
    return (
        <fieldset className={styles.GenderSelect}>
            <label htmlFor="gender">Gender</label>
            <select
                id="gender" {...register('gender')}
                className={error?styles.error:""}
            >
                <option value="">Select Gender</option>
                <option value={Gender.Male}>Male</option>
                <option value={Gender.Female}>Female</option>
            </select>
            {error && <span>{error}</span>}
        </fieldset>
    )
}

export default GenderSelect