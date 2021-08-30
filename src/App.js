import { BrowserRouter } from 'react-router-dom';
import Routes from "./Routes";
import { Template } from "./components/mainComponents";
import Header from "./components/partials/Header"
import Footer from "./components/partials/Footer"
import './App.css'


export default function Page(){
  return(
    <BrowserRouter>
      <Template>
        <Header />
        <Routes />
        <Footer />
      </Template>
    </BrowserRouter>
  );
}
