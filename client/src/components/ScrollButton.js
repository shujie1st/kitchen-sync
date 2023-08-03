import { useState } from "react";
import { FaArrowCircleUp } from "@react-icons/all-files/fa/FaArrowCircleUp";

function ScrollButton() {
  const [visibility, setVisibility] = useState('none');
  
  const toggleVisibility = () => {
    window.scrollY > 200 ? setVisibility('inline') : setVisibility('none');
  }

  window.addEventListener('scroll', toggleVisibility);

  return (
    <FaArrowCircleUp id="scroll-button" style={{display: visibility}} onClick={() => {window.scrollTo(0, 0)}} />
  )
}

export default ScrollButton;