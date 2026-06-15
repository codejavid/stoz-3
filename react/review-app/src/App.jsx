import { useEffect, useState } from "react"
import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import { Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog"
import About from "./pages/About"



const App = () => {


  // const [feedback, setFeedback] = useState([
  //   {
  //     id:1,
  //     text:"This is a sample text 1"
  //   },
  //   {
  //     id:2,
  //     text:"This is a sample text 2"
  //   },
  //   {
  //     id:3,
  //     text:"This is a sample text 3"
  //   },
  // ]);



  return (
    <div>
      <Header />
      <div className="container">

        <Routes>
          <Route path="/" element={
            <>
              <FeedbackForm />
              <FeedbackStats />
              <FeedbackList />
            </>
          } />

          <Route path="/blog" element={
            <Blog />
          } />

          <Route path="/about" element={
            <About />
          } />
        </Routes>


      </div>
    </div>
  )
}

export default App


