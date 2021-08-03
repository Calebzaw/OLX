// import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import Routes from "./Routes";
import { Template } from "./components/mainComponents";
import Header from "./components/partials/Header"
import Footer from "./components/partials/Footer"
import './App.css'


export default function Page(props){
  
  // const email = useSelector(state => state.user.email);
  // const dispatch = useDispatch();

  // const handleEmail = () =>{
  //   dispatch({
  //     type: "SET_EMAIL",
  //     payload: { email: "zeppejoaovitor@gmail.com" }
  //   })
  // }

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
