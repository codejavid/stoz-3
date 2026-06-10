import React from 'react'

const FeedbackStats = ({feedback}) => {
  return (
    <div style={{
        margin:"10px 0px" 
    }}>
        <h4>Length ({feedback.length})</h4>
    </div>
  )
}

export default FeedbackStats