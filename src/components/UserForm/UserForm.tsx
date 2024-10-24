import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { User, UserFormValues } from '../../types/userTypes'
import validationSchema from '../../utils/validationSchema'
import Input from '../Input/Input'
import GenderSelect from '../GenderSelect/GenderSelect'
import FormActions from '../FormActions/FormActions'
import styles from "./Form.module.scss"

// Define the props for the UserForm component
interface UserFormProps {
    existingUser?: User 
    onSubmit: (data: User) => void
}

// Define input configurations
const inputFields = [
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'age', label: 'Age' },
]


// UserForm component
const UserForm: FC<UserFormProps> = ({ existingUser, onSubmit }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserFormValues>({
        resolver: yupResolver(validationSchema),
    })

    // Populate the form with existing user data if editing
    useEffect(() => {
        
        if (existingUser) {
            setValue('gender', existingUser.gender)
            setValue('firstName', existingUser.firstName)
            setValue('lastName', existingUser.lastName)
            setValue('age', existingUser.age)
        } 
    }, [existingUser, setValue])


    // Custom submit handler to convert form values to User type
    const handleFormSubmit = (data: UserFormValues) => { 
        // console.log({data,existingUser});
        //[...initialUsers]
        
        const user: User = {
            id: existingUser ? existingUser.id : '',
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age,
            gender: data.gender,
            isDeleted: false,
            createdAt: existingUser ? existingUser.createdAt : Date.now(),
        }
        onSubmit(user)
    }

    return (
        <form
            id="userForm"
            className={styles.Form}
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <GenderSelect
                register={register}
                error={errors.gender?.message}
            />
            {inputFields.map(({ id, label }) => (
                <Input
                    key={id}
                    id={id as keyof Omit<UserFormValues, 'gender'>}
                    label={label}
                    register={register}
                    error={errors[id as keyof UserFormValues]?.message}
                />
            ))}
            <FormActions edit={!!existingUser} />
        </form>
    )
}

export default UserForm