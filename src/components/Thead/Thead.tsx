import { FC } from "react"
import { SortButton } from '../../types/userTypes'
import SortBtn from "../SortBtn/SortBtn"
import styles from "./Thead.module.scss"

interface TheadProps { currentSortKey: string }


const Thead:FC<TheadProps> = () => {
    const sortBtns: SortButton[] = ["Gender", "First name", "Last name", "Age"]
    return (
        <thead className={styles.Thead}>
            <tr>{sortBtns.map(key=>{
                return (
                    <th
                        key={key}
                        colSpan={key === "Age" ? 2 : 1}
                    >
                        <SortBtn sortKey={key}/>
                    </th>
                )
            })}</tr>
        </thead>
    )
}
 
export default Thead;