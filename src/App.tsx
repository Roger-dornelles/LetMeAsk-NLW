import {Route,BrowserRouter} from "react-router-dom";

//pages
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";


import { AuthContextProvider } from '../src/contexts/AuthContext';

function App (){


  return(
    <BrowserRouter>
      <AuthContextProvider>

        <Route  exact path="/">
          <Home />
        </Route>

        <Route exact path="/rooms/new">
          <NewRoom />
        </Route>

      </AuthContextProvider>

    </BrowserRouter>

  );

 
}

export default App;