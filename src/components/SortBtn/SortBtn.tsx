import { FC,useContext } from 'react'
import { SortButton } from "../../types/userTypes"
import toCamelCase from "../../utils/toCamelCase"
import sortIcon from "../../assets/svg/chevron.svg"
import sortIconActive from "../../assets/svg/chevron-dec.svg"
import { UsersContext } from "../../context"
import styles from "./SortBtn.module.scss"

interface SortKeyProps { sortKey: SortButton }

const SortBtn:FC<SortKeyProps> = ({ sortKey }) => {

    const { state:{ currentSortKey },dispatch } = useContext(UsersContext)
    const camelCaseKey = toCamelCase(sortKey)
    const isActive = currentSortKey === camelCaseKey
    const handleSortClick = ():void=>{
        dispatch && dispatch({type:"SET_SORTKEY",payload:camelCaseKey})
    }
    
    return (
        <button onClick={handleSortClick} className={styles.SortBtn}>
            <span>{sortKey}</span>
            <img src={isActive? sortIconActive : sortIcon} alt={`sort by ${sortKey}`}/>
        </button>
    )
}
 
export default SortBtn