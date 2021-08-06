import { Switch, Route } from "react-router";
import Home from "./pages/Home"
import About from "./pages/About"
import NotFound from "./pages/NotFound"
import SignIn from "./pages/SignIn"
import SignUp from './pages/SignUp'
import AdPage from './pages/AdPage'

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

            <Route exact path="/signup">
                <SignUp />
            </Route>

            <Route exact path="/ad/:id">
                <AdPage />
            </Route>

            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}