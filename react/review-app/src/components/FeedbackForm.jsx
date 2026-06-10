import React, { useState } from 'react'
import Card from './sharder/Card'

const FeedbackForm = () => {

    
  const [text, setText] = useState("");  
  const [btnDisable, setBtnDisable] = useState(true);  
  const [message, setMessage] = useState("");  


  const handleTextChange = (e) => {
    const trimmedText = e.target.value.trim();

    let textError = "";

    if(trimmedText.length < 10){
        textError = "Character must be at least 10";
        setMessage(textError);
        setBtnDisable(true);
    }else{
        setMessage("");
        setBtnDisable(false);
    }

    setText(trimmedText);

  }

  return (
    <Card>
        <h3>Add your Reviews</h3>

        <form>
            <div className='input-group'>
                <input type="text" placeholder='Enter your ideas' value={text} onChange={handleTextChange}/>
                <button disabled={btnDisable}>Send</button>
            </div>

            <p className='message'>{message}</p>
        </form>
    </Card>
  )
}

export default FeedbackForm