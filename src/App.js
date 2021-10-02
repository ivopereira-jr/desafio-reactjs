import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Routes from './routes'
import Header from "./components/Header";
import { CartProvider } from "./hooks/useCart";

import './styles/main.scss'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <Routes />
        <ToastContainer autoClose={3000} />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
