import { FC, useEffect,useState,useContext } from "react"
import { UsersContext } from "../../context"
import { WaitType } from "../../types/userTypes"
import styles from "./Notification.module.scss"

interface NotificationProps { message:string }

// Delays to animate the notification
const delay = 2000
const transitionDelay = 700
let timeToHide: WaitType
let timeToClear: WaitType

const Notification:FC<NotificationProps> = ({ message }) => {
    
    const { state:{ currentUser,userDeleted },dispatch } = useContext(UsersContext)
    const [show,setShow] = useState(false)

    useEffect(()=>{
        
        //Show notification with the name
        if(currentUser || userDeleted){
            setShow(true)
            
            //Hide it still with the name
            timeToHide = setTimeout(()=>{
                setShow(false)
            },delay)

            //Once hidden navigate away which will clear the name
            timeToClear = setTimeout(()=>{
                if(dispatch){
                    if(userDeleted) dispatch({type:"SET_USER_DELETED",payload: false})
                    else dispatch({type:"SHOW_NOTIFICATION",payload: null})
                }
                // if(dispatch){
                //     if(userDeleted) dispatch({type:"SET_USER_DELETED",payload: false})
                //     else dispatch({type:"SHOW_NOTIFICATION",payload: null})
                // }
            },delay + transitionDelay)

        } else setShow(false)
 
    },[currentUser,userDeleted])

    //Clear timeout in case user navigates away while the notification is visible
    useEffect(()=>{
        return ()=> {
            clearTimeout(timeToHide)
            clearTimeout(timeToClear)
        }
    },[])

    return (
        <div className={styles.Notification}>
            <span className={show ? styles.show : ""}>{message}</span>
        </div>
    )
}
 
export default Notification