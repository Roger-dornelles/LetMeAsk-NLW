import {Route,BrowserRouter,Switch} from "react-router-dom";

//pages
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";


import { AuthContextProvider } from '../src/contexts/AuthContext';
import {ThemeContextProvider } from '../src/contexts/ContextTheme'

function App (){


  return(
    <BrowserRouter>
      <ThemeContextProvider>

          <AuthContextProvider>
            <Switch>

              <Route  exact path="/">
                <Home />
              </Route>

              <Route exact path="/rooms/new">
                <NewRoom />
              </Route>

              <Route exact path="/rooms/:id">
                <Room />
              </Route>

              <Route exact path="/admin/rooms/:id">
                <AdminRoom />
              </Route>
              
            </Switch>
          </AuthContextProvider>
      </ThemeContextProvider>

    </BrowserRouter>

  );

 
}

export default App;