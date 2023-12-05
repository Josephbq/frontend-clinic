import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PanelPrincipal from './components/doc';
import Adm from './components/adm';
import Login from "./components/Login";
import Hce from "./components/hce";
import Signup from './components/Signup';
import Hours from './components/Hours';
import Registrosaudi from './components/registrosaudi'
import { HceC } from './components/hce_cards';
import { Detalles } from './components/detailp';
import { HceEvo } from './components/hceEvo';
import { Toaster } from 'react-hot-toast';
import { Perfil } from './components/perfil';

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster/>
          <Route path="/panel" exact component={PanelPrincipal} />
          <Route path="/adm" exact component={Adm} />
          <Route path="/" exact component={Login} />
          <Route path="/Signup" component={Signup} />
          <Route path="/hour" exact component={Hours} />
          <Route path="/hcenew" exact component={Hce} />
          <Route path="/hce" exact component={HceC} />
          <Route path="/hceEvo" exact component={HceEvo} />
          <Route path="/detalles/:pacienteId" exact component={Detalles} />
          <Route path="/raudi" exact component={Registrosaudi} />
          <Route path="/perfil" exact component={Perfil} />
      </div>
    </Router>
  );
}

export default App;
