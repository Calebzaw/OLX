import { Switch, Route } from "react-router";
import Home from "./pages/Home"
import About from "./pages/About"

export default function Routes(){

    return(
        <Switch>

            <Route exact path="/">
                <Home />
            </Route>

            <Route path="/sobre">
                <About />
            </Route>

        </Switch>
    );
}