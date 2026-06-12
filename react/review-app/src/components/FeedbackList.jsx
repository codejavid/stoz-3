
import FeedbackItem from './FeedbackItem'
import FeedbackContext from '../context/FeedbackContext'
import { useContext } from 'react'


const FeedbackList = () => {


  const {feedback} = useContext(FeedbackContext);


  if(feedback.length === 0) return <h3>There is no items</h3>  
  
  return (
    <div>
        
            <ul>
                {feedback.map((item) => (
                    <FeedbackItem key={item.id} item={item} />
                ))}
            </ul>
        
    </div>
  )
}

export default FeedbackList