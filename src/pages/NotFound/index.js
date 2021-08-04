import { Link } from "react-router-dom"

export default function NotFound(){
    return(
        <div>
            <h2>Página não Encontrada</h2>
        
            <Link to="/">Voltar para a HOME</Link>        
        </div>
    )
}