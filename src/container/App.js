import logo from '../assets/logo.svg';
import './App.css';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Form from '../components/Form/Form';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Онлайн запись</h1>
        </header>
        <Switch>
          <Route path="/orders">
            888
          </Route>
          <Route exact path="/">
            <Form />
          </Route>
          <Route exact path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <footer className="App-footer">
          Нажимая "Записаться", я выражаю своё согласие с обработкой моих персональных данных в соотвествии с принятой <a>политикой конфиденциальности</a> и принимаю <a>пользовательское соглашение</a>
        </footer>
      </div>
    </Router>
  );
}

const mapStateToProps = (store) => {
  return {
    store,
  }
}

export default connect(mapStateToProps)(App);
