import React, { useContext } from 'react'

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Card from './sharder/Card';
import FeedbackContext from '../context/FeedbackContext';



const FeedbackItem = ({ item,handleDelete }) => {

    const {deleteFeedback, editFeedback} = useContext(FeedbackContext);


    return (
        <Card>
            <div className='card-wrapper'>
                <h4>{item.text}</h4>

                <div>
                    <div className='edit'>
                        <FaEdit onClick={() => editFeedback(item)}/>
                    </div>
                    <div className='delete'>
                        <MdDelete onClick={() => deleteFeedback(item.id)}/>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default FeedbackItem