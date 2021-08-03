import { Link } from "react-router-dom"

export default function Home(){
    return(
        <div>
            <h2>Página Inicial</h2>
        
            <Link to="/sobre">Sobre</Link>        
        </div>
    )
}