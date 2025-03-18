import React from "react";
import Banner from "./components/comp_menu/Banner/banner";
import "./App.css";
import Card from "./components/comp_menu/Card/card";
import Footer from "./components/comp_menu/Footer/footer";

const App: React.FC = () => {
  const title = "Práctica 07B - Formularios con REACT";
  const footerAppName= "Quizly";

  return (
    <>
      <div className="body">
        <Banner title={title} />
        <Card />
        <Footer footerAppName={footerAppName}/>
      </div>

    </>
  );
};

export default App;
