import { BrowserRouter, Routes, Route } from "react-router-dom";

import logo from "./assets/logo.svg";
import "./assets/App.scss";
import Nav from "./components/Nav";

const HomePage = () => {
  return (
    <>
      <h1>Home</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </>
  );
};
const About = () => {
  return <h1>About</h1>;
};
const Contact = () => {
  return <h1>Contact</h1>;
};
const Login = () => {
  return <h1>Login</h1>;
};
const Weather = () => {
  return <h1>Weather</h1>;
};

const Wall = () => {
  return <h1>Wall</h1>;
};
const NotFoundPage = () => {
  return <h1>Not Found</h1>;
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/wall" element={<Wall />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
