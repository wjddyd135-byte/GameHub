import React from "react";

const CommonTitle = (props) => {
  let { title, subTitle } = props;
  
  let csst1 = {
    marginTop: "70px",
    textAlign: "center",
  };
  
  return (
    <>
      <h3 style={csst1}>{title}</h3>
      <p style={{ textAlign: "center" }}>
        {" "}
        {subTitle}
      </p>
    </>
  );
};

export default CommonTitle;
