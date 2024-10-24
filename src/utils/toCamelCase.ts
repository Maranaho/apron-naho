// Function to convert to camelCase
const toCamelCase = (str: string): string => {
    return str
        .replace(/\s(.)/g, (match) => match.toUpperCase()) // Capitalizes first letter after space
        .replace(/\s/g, '') // Removes spaces
        .replace(/^(.)/, (match) => match.toLowerCase()); // Ensures the first character is lowercase
}

export default toCamelCase