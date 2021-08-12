import { Route, Redirect } from "react-router-dom";
import { isLogged } from "../helpers/AuthHandler";

const func = ({ children, ...rest }) => {
    
    let logged = isLogged()
    let authorized = (rest.private && !logged) ? false : true

    return(
        <Route
            {...rest}
            render={()=>
                authorized ? children : <Redirect to='signin' />
            }

        />
    );
}

export default func;