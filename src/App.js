import React from 'react';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as jwt_decode from "jwt-decode";
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import './App.css';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Sider from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';
import getListData from './components/calender/Calender';
import Sports from './components/sports/Sports';
import Reservation from './components/reservation/Reservation';
import Reservations from './components/reservations/Reservations';
import Success from './components/reserved/Success';
import Calender from './components/calender/Calender';
import Lectures from './components/lectures/Lectures';
import Lecture from './components/lecture/Lecture';
import CnsSettings from './components/cns-setting/Settings';
import EditCnsSettings from './components/edit-cns-setting/EditCnsSettings';
import Settings from './components/setting/Settings';
import EditPassword from './components/edit-password/EditPassword';
import EditSettings from './components/edit-setting/EditSettings';
import NotFound from './components/not-found/NotFound';


const { Content, Footer } = Layout;


if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  console.log(store.dispatch(setCurrentUser(decoded)))

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout style={{ background: '#ECECEC' }}>
          <Navbar></Navbar>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/landing" component={Landing} />
          <Row>
            <Col xs={24} sm={24} md={24} lg={6} xl={5} xxl={4} >
              <Sider></Sider>
            </Col>
            <Col xs={23} sm={23} md={23} lg={18} xl={18} xxl={18}>
              <Content style={{ overflow: 'initial' }}>
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/reservation/calender" component={getListData} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/sports" component={Sports} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/sports/:sport_id/lectures" component={Lectures} />
                  </Switch>
                <Switch>
                  <PrivateRoute exact path="/sports/:sport_id/lectures/:id" component={Lecture} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/reservations" component={Reservations} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/reservations/:id" component={Reservation} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/reservations/:id/success" component={Success} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/calender" component={Calender} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/cns-settings" component={CnsSettings} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/edit-cns-settings" component={EditCnsSettings} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/settings" component={Settings} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/edit-settings" component={EditSettings} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/edit-password" component={EditPassword} />
                </Switch>
                <Switch>
                  <Route exact path="/not-found" component={NotFound} />
                </Switch>
              </Content>
            </Col>
          </Row>
          <Footer style={{ textAlign: 'center' }}>WellnessHack ©2019 Created by wokashi</Footer>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
