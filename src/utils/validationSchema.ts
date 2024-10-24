import * as Yup from 'yup'
import { Gender } from '../types/userTypes'

// Constants for validation
const minNameLength = 5
const maxNameLength = 20
const minAge = 18
const maxAgeMale = 112
const maxAgeFemale = 117

// Validation schema using Yup
const validationSchema = Yup.object().shape({
    gender: Yup.mixed<Gender>()
        .oneOf([Gender.Male, Gender.Female])
        .required('Gender is required'),
    firstName: Yup.string()
        .min(minNameLength, `First Name must be at least ${minNameLength} characters`)
        .max(maxNameLength, `First Name must not exceed ${maxNameLength} characters`)
        .required('First Name is required'),
    lastName: Yup.string()
        .min(minNameLength, `Last Name must be at least ${minNameLength} characters`)
        .max(maxNameLength, `Last Name must not exceed ${maxNameLength} characters`)
        .required('Last Name is required'),
    age: Yup.number()
        .min(minAge, `Age must be at least ${minAge}`)
        .required('Age is required')
        .test('max-age', 'Age exceeds maximum limit', function (value) {
            const { gender } = this.parent
            if (gender === Gender.Male) {
                return value <= maxAgeMale
            } else if (gender === Gender.Female) {
                return value <= maxAgeFemale
            }
            return true
        }),
})

export default validationSchema
