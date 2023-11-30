import Ratings from './Ratings.js'
import styles from '@/styles/ClassInfo.module.css'

export default function ClassInfoContainer(props) {
    return (
        <div className={styles.container}>
            <div>
                <p>{props.overallRating}/5</p>
            </div>

            <div>
                <p>{props.courseNumber}</p>
                <p>{props.courseName}</p>
            </div>

            <Ratings></Ratings>

            <div>
                <p>Lecture Mandatory{props.lectureAttendance}</p>
                <p>Time Conflict Allowed:{props.timeConflict}</p>
                <p>Demand:{props.demand}</p>
            </div>

            <div>
                <button>Add Review</button>
            </div>
        </div>
    )
}