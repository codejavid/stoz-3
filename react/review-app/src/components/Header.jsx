import { Link } from "react-router-dom"



const Header = ({text="Review app", bgColor="#333333" ,textColor="white"}) => {

 
  // const {text,bgColor,textColor} = props;

  // console.log(text, bgColor, textColor);
 

  return (
    <header style={{
      backgroundColor:bgColor,
      color:textColor
    }}>
        <div className="container">
          <div className="d-flex">
            <Link to="/">
              <h1>{text}</h1>
            </Link>
            <Link to="/blog">Blog</Link>
            <Link to="/about">About</Link>
          </div>
        </div>
    </header>
  )
}

export default Header


