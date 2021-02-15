import { connect } from 'react-redux';

import { BrowserRouter as Router, Switch, Route, HashRouter } from "react-router-dom";

import Form from '@modules/appointment/Form/Form';
import Table from '@modules/orders/Table/Table';

import logo from '@assets/logo.svg';
import '@modules/App.css';

import { delItem } from '@actions/ordersActions';

function App({appointment, delItem}) {
  const { isSuccess, orders } = appointment;
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Онлайн запись</h1>
        </header>
        <div className="App-body">
        <HashRouter>
          <Switch>
            <Route path="/orders">
              <Table deleteItem={delItem} data={orders}/>
            </Route>
            <Route exact path="/appointment">
              {isSuccess && <p>Вы успешно записаны</p>}
              <Form />
            </Route>
          </Switch>
        </HashRouter>
        </div>
        <footer className="App-footer">
          Нажимая "Записаться", я выражаю своё согласие с обработкой моих персональных данных в соотвествии с принятой
          <a href={'http://memesmix.net/media/created/td09d5.jpg'}>политикой конфиденциальности</a> и принимаю
          <a href={'http://memesmix.net/media/created/nbhcue.jpg'}>пользовательское соглашение</a>
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
    delItem: (id) => dispatch(delItem(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
