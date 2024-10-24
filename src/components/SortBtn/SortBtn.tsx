import { FC } from 'react'
import { SortButton } from "../../types/userTypes"
import { Link } from 'react-router-dom'
import toCamelCase from "../../utils/toCamelCase"
import sortIcon from "../../assets/svg/chevron.svg"
import sortIconActive from "../../assets/svg/chevron-dec.svg"
import { useLocation } from 'react-router-dom'
import styles from "./SortBtn.module.scss"

interface SortKeyProps { sortKey: SortButton }

const SortBtn:FC<SortKeyProps> = ({ sortKey }) => {
    const location = useLocation()
    
    // Get the current sortKey from URL query parameters
    const queryParams = new URLSearchParams(location.search)
    const urlSortKey = queryParams.get('sortKey') || 'firstName'
    const camelCaseKey = toCamelCase(sortKey)
    const isActive = urlSortKey === camelCaseKey

    return (
        <Link
            className={styles.SortBtn}
            to={`/?sortKey=${camelCaseKey}`}
        >
            <span>{sortKey}</span>
            <img src={isActive? sortIconActive : sortIcon} alt={`sort by ${sortKey}`}/>
        </Link>
    )
}
 
export default SortBtn