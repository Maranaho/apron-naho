import { FC } from "react"
import chatIcon from "../../assets/svg/chat.svg"
import styles from "./Chat.module.scss"

const Chat:FC = () => <button className={styles.Chat}><img src={chatIcon} alt="chat"/></button>
 
export default Chat