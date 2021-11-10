import React from 'react'
import { BrowserRouter, Route ,Routes} from "react-router-dom";
import Home from './views/home'
import './styles/themes.scss'
import './styles/app.scss'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/:page' element={<Home/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
