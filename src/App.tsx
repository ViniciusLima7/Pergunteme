import { NewRoom } from './pages/NewRoom'
import { Home } from './pages/Home'
import { BrowserRouter, Route } from 'react-router-dom';
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
