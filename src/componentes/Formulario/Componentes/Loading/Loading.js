import styles from './Loading.module.css'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function Loading() {

    return (
        <>
            <div className={styles.spinnercontainer}>
                <AiOutlineLoading3Quarters className={styles.spinner} />
            </div>
        </>

    )

}