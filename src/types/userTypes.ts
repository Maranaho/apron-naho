// We'll use uuid to create unique user ids
export type UID = string

// Defining type TimeStamp to sort users by date of creation
export type TimeStamp = number

// Gender Enum
export enum Gender {
  Male = 'male',
  Female = 'female'
}

// Define a new type for the form values
export interface UserFormValues {
  gender: NonNullable<Gender>
  firstName: string
  lastName: string
  age: number
}

// Defining a User
export interface User {
    id: UID
    firstName: string
    lastName: string
    age: number
    gender: Gender
    isDeleted: boolean
    createdAt: TimeStamp
}

// Sort types
export type SortButton = "Gender" | "First name" | "Last name" | "Age";

export type WaitType = ReturnType<typeof setTimeout>