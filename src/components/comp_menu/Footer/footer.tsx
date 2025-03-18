import React from "react";
import "./Footer.css";

interface FooterProps {
  footerAppName: string;
}

const Footer: React.FC<FooterProps> = ({ footerAppName }) => {
  return (
    <footer className="footer">
      <span>© {footerAppName} | 20/03/25 | 19:00h </span>
    </footer>
  );
};

export default Footer;
