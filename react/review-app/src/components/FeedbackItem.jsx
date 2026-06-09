import React from 'react'

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



const FeedbackItem = ({ item }) => {


    return (
        <div className='card'>
            <div className='card-wrapper'>
                <h4>{item.text}</h4>

                <div>
                    <div className='edit'>

                        <FaEdit />

                    </div>
                    <div className='delete'>

                        <MdDelete />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedbackItem