import { Switch, Route } from "react-router";
import Home from "./pages/Home"
import About from "./pages/About"
import NotFound from "./pages/NotFound"
import SignIn from "./pages/SignIn"

export default function Routes(){

    return(
        <Switch>

            <Route exact path="/">
                <Home />
            </Route>

            <Route path="/sobre">
                <About />
            </Route>

            <Route exact path="/signin">
                <SignIn />
            </Route>

            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}