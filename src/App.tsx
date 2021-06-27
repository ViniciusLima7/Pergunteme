// import Pages
import { NewRoom } from './pages/NewRoom'
import { Room } from './pages/Room'
import { Home } from './pages/Home'
import { AdminRoom } from './pages/AdminRoom'

//Import  Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//Import Context Api
import { AuthContextProvider } from './contexts/AuthContext'
import {ThemeContextProvider} from './contexts/ThemeContext';



function App() {


  return (
    <BrowserRouter>
    <ThemeContextProvider>
      <AuthContextProvider>
        <Switch>
          {/* exact pega a rota exatamente e n apenas o começo */}
          <Route path="/" exact component={Home}></Route>
          <Route path="/Room/New" exact component={NewRoom}></Route>
          <Route path="/Room/:id" exact component={Room}></Route>

          <Route path="/Room/admin/:id" component={AdminRoom}></Route>
        </Switch>
      </AuthContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>

  );
}

export default App;
