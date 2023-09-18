import './App.css';
import Navbar from './Components/Navbar';
import Landing from './Components/Landing';
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
    <Navbar/>
  <Routes>

  <Route exact path ='/' Component={ Landing }/>

      
        <Route exact path='/Register' Component={Register}/>
        <Route exact path='/Login' Component={Login}/>
      
  </Routes>
  </>
  );
}

export default App;
