// import Pages
import { NewRoom } from './pages/NewRoom'
import { Room } from './pages/Room'
import { Home } from './pages/Home'

//Import  Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//Import Context Api
import { AuthContextProvider } from './contexts/AuthContext'



function App() {


  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          {/* exact pega a rota exatamente e n apenas o começo */}
          <Route path="/" exact component={Home}></Route>
          <Route path="/Room/New" exact component={NewRoom}></Route>
          <Route path="/Room/:id" component={Room}></Route>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>

  );
}

export default App;
