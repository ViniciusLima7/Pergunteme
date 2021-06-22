// import Pages
import { NewRoom } from './pages/NewRoom'
import { Home } from './pages/Home'

//Import  Router
import { BrowserRouter, Route } from 'react-router-dom';
//Import Context Api
import {AuthContextProvider} from './contexts/AuthContext'



function App() {


  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home}></Route>
        <Route path="/Room/New" component={NewRoom}></Route>
      </AuthContextProvider>
    </BrowserRouter>

  );
}

export default App;
