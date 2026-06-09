import { useState } from "react"
import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList";

const App = () => {


  const [feedback, setFeedback] = useState([
    {
      id:1,
      text:"This is a sample text 1"
    },
    {
      id:2,
      text:"This is a sample text 2"
    },
    {
      id:3,
      text:"This is a sample text 3"
    },
  ]);



  return (
    <div>
      <Header/>
     <div className="container">
       <FeedbackList feedback={feedback}/>
     </div>
    </div>
  )
}

export default App


