import React from 'react';
import { useToast } from "./components/Toast/ToastContext";


function App() {
  const {pushToast} = useToast();
  const handleSubmit = () => {
    pushToast({
      title: "Bravo",
      content: "Votre action a marché"
    })
  }
  console.log("render")
  return (
    <div style={{display: "flex", height: "100vh", flexDirection: "column", gap: 8, justifyContent: "center", alignItems: "center"}}>
      <button onClick={handleSubmit}>
        Toast!
      </button>
      <button onClick={() => {
      pushToast({content: "error", type: "danger"})}
      } >
        Rapide
      </button>
    </div>
  );
}

export default App;
