

const Header = ({text="Review app", bgColor="#333333" ,textColor="white"}) => {

 
  // const {text,bgColor,textColor} = props;

  // console.log(text, bgColor, textColor);
 

  return (
    <header style={{
      backgroundColor:bgColor,
      color:textColor
    }}>
        <div className="container">
          <h1>{text}</h1>
        </div>
    </header>
  )
}

export default Header


