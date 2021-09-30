import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Routes from './routes'
import Header from "./components/Header";

import './styles/main.scss'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <ToastContainer autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
