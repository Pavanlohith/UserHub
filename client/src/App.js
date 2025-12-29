import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar';
import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import Login from './components/login';
import Signup from './components/signup';
import { Routes, Route } from "react-router-dom";
import Error404 from './components/Errmsg';
import Logout from './components/Logout';
import { useContext,useReducer } from 'react';
import {initialState,reducer} from './reducer/UseReducer';
import { createContext } from 'react';
 export const UserContext = createContext();
function App() {
  const [state,dispatch]= useReducer(reducer,initialState);
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
       
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
