import React from "react";

const Footer = () => {

  const footerStyle = {
    backgroundColor: "#0f1114",
    color: "#ccc",
    padding: "30px 0",
    marginTop: "80px",
    textAlign: "center",
    fontSize: "14px"
  };

  const titleStyle = {
    fontWeight: "700",
    fontSize: "16px",
    color: "#fff",
    marginBottom: "6px"
  };

  const subStyle = {
    opacity: "0.7",
    marginBottom: "10px"
  };

  return (
    <footer style={footerStyle}>
      <div style={titleStyle}>GameHub</div>

      <div style={subStyle}>
        Discover your next favorite game
      </div>

      <div>
        © 2026 GameHub. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;