import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import PrivateRoute from './PrivateRoute';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route exact path = '/login' element ={<Login/>}/>
        <Route exact path = '/register' element ={<Register/>}/>
        <Route exact path = '/' element = {<PrivateRoute><Main/></PrivateRoute>}/>
      </Routes>
    </Router>
    
    
  );
}

export default App;
