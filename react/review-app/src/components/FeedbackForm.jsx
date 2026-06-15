import React, { useContext, useEffect, useState } from 'react'
import Card from './sharder/Card'
import Button from './sharder/Button';
import FeedbackContext from '../context/FeedbackContext'

import { v4 as uuidv4 } from "uuid";

const FeedbackForm = () => {


  const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

    
  const [text, setText] = useState("");  
  const [btnDisable, setBtnDisable] = useState(true);  
  const [message, setMessage] = useState("");  


  const handleTextChange = (e) => {
    const trimmedText = e.target.value.trimStart();

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

  const handleSubmit = (e) => {
     e.preventDefault();

     const newFeedback = {
       id:uuidv4(),
       text:text
     };

     if(feedbackEdit.edit === true){
      updateFeedback(feedbackEdit.item.id, newFeedback);
     }else{
      addFeedback(newFeedback);
     }

     setText("");
     
  };

  useEffect(() => {
    if(feedbackEdit.edit === true){
      setBtnDisable(false);
      setText(feedbackEdit.item.text)
    }
  }, [feedbackEdit]);

  return (
    <Card>
        <h3>Add your Reviews</h3>

        <form onSubmit={handleSubmit}>
            <div className='input-group'>
                <input type="text" placeholder='Enter your ideas' value={text} onChange={handleTextChange}/>
                <Button version="primary" type="submit" isDisabled={btnDisable}>
                   Send
                </Button>
            </div>

            <p className='message'>{message}</p>
        </form>
    </Card>
  )
}

export default FeedbackForm