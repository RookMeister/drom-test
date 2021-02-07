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
import Table from '../components/Table/Table';

import { delItem } from '../actions/ordersActions';


function App({appointment, delItemAction}) {
  const { isSuccess, orders } = appointment;
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Онлайн запись</h1>
        </header>
        <div className="App-body">
          <Switch>
            <Route path="/orders">
              <Table deleteItem={delItemAction} data={orders}/>
            </Route>
            <Route exact path="/">
              {isSuccess && <p>Вы успешно записаны</p>}
              <Form />
            </Route>
            <Route exact path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
        <footer className="App-footer">
          Нажимая "Записаться", я выражаю своё согласие с обработкой моих персональных данных в соотвествии с принятой <a href={'http://memesmix.net/media/created/td09d5.jpg'}>политикой конфиденциальности</a> и принимаю <a href={'http://memesmix.net/media/created/nbhcue.jpg'}>пользовательское соглашение</a>
        </footer>
      </div>
    </Router>
  );
}

const mapStateToProps = (store) => {
  return {
    appointment: store.orders,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    delItemAction: (id) => dispatch(delItem(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
