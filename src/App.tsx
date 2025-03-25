import React, { useState } from "react";
import Banner from "./components/comp_menu/Banner/banner";
import "./App.css";
import Card from "./components/comp_menu/Card/card";
import Footer from "./components/comp_menu/Footer/footer";
import Button from "./components/comp_menu/Button/button";
import DynamicForm from "./components/comp_formularios/dynamicForm";

const App: React.FC = () => {
  const [component, setComponent] = useState(0);
  const title = "Práctica 07B - Formularios con REACT";
  const footerAppName = "Quizly";

  const changeComponent = () => {
    setComponent(1);
  }

  return (
    <div className="body">
      <section className="card">
        <Banner title={title} />
        {component === 0 ? (
          <>
            <Card />
            <Button onClick={changeComponent} />
          </>
        ) : (
          <DynamicForm />
        )}

      </section>
      <Footer footerAppName={footerAppName} />
    </div>
  );
};


export default App;
