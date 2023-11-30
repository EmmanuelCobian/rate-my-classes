import styles from '@/styles/Ratings.module.css'

export default function Ratings(props) {
    return (
        <div className={styles.container}>
            
            <div className={styles.ratingContainer}>
                <p>{props.difficulty}</p>
                <p>Difficulty</p>
            </div>

            <div className={styles.ratingContainer}>
                <p>{props.interest}</p>
                <p>Interest</p>
            </div>

            <div className={styles.ratingContainer}>
                <p>{props.averageGrade}</p>
                <p>Average Grade</p>
            </div>

             <div className={styles.ratingContainer}>
                <p>{props.units}</p>
                <p>Units</p>
            </div>

        </div>
    )
}
