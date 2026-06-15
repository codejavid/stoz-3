import { createContext, useEffect, useState } from "react";
import axios from 'axios';


const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {

    const [feedback, setFeedback] = useState([
        // {
        //   id:1,
        //   text:"This is a sample text 1 from context"
        // },
        // {
        //   id:2,
        //   text:"This is a sample text 2 from context"
        // },
        // {
        //   id:3,
        //   text:"This is a sample text 3 from context"
        // },
    ]);

    const [feedbackEdit, setFeedbackEdit] = useState({
      item:{},
      edit:false
    });

    useEffect(() => {
      console.log("Started");
      fetchFeedback();
    }, []);

    // .env


    const fetchFeedback = async () => {


      try{

        const response = await axios.get("https://6a301f34a7f8866418d5a03a.mockapi.io/api/v1/comments");
        setFeedback(response.data);
      }catch(error){
        console.log("ERROR", error.message);
      }


    }

    // const addFeedback = (newFeedback) => {
    //   setFeedback([newFeedback, ...feedback]);
    // }

    const addFeedback = async(newFeedback) => {
      try{

        const response = await axios.post("https://6a301f34a7f8866418d5a03a.mockapi.io/api/v1/comments",
          newFeedback, {
            headers:{
              "Content-Type":"application/json"
            }
          }
        );

        setFeedback([response.data, ...feedback]);


      }catch(error){
        console.log("ERROR", error.message);
      }
    }



    const deleteFeedback = async(id) => {
      if(window.confirm("Are you sure")){

        try{
          await axios.delete(`https://6a301f34a7f8866418d5a03a.mockapi.io/api/v1/comments/${id}`);
          setFeedback(feedback.filter(item => item.id !== id));
        }catch(err){
          console.log(err);
        }
      }
    }

    const updateFeedback = async(id, updItem) => {

      try{

        const response = await axios.put(`https://6a301f34a7f8866418d5a03a.mockapi.io/api/v1/comments/${id}`,
          updItem, {
            headers:{
              "Content-Type":"application/json"
            }
          }
        );

        setFeedback(feedback.map((item) => (
          item.id === id ? {...item, ...response.data} : item
        )))


      }catch(error){
        console.log("ERROR", error.message);
      }
    
    }
    
    const editFeedback = (item) => {
      setFeedbackEdit({
        item:item,
        edit:true
      })
    }


    return(
        <FeedbackContext.Provider value={{
            feedback,
            feedbackEdit,
            addFeedback,
            deleteFeedback,
            editFeedback,
            updateFeedback
        }}>
            {children}
        </FeedbackContext.Provider>
    )

}

export default FeedbackContext;