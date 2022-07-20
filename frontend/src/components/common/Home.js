import { useState, useEffect } from "react";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName("Dass TAs");
  }, []);

  return <div style={{ textAlign: "center" }}>Welcome to IIIT H Canteen Portal </div>;
};

export default Home;
