import React from 'react'
import FeedbackItem from './FeedbackItem'


const FeedbackList = ({feedback}) => {


  if(feedback.length === 0) return <h3>There is no items</h3>  
  
  return (
    <div>
        
            <ul>
                {feedback.map((item) => (
                    <FeedbackItem key={item.id} item={item}/>
                ))}
            </ul>
        
    </div>
  )
}

export default FeedbackList