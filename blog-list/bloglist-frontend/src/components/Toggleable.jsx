import { useState } from "react";

const Toggleable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };


  const toggleVisibility = () => setVisible(!visible);
  return <div></div>;
};

export default Toggleable;
