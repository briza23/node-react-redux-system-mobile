import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from "redux-thunk";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './components/App';
import LandingPage from "./components/LandingPage/LandingPage";
import reducers from './reducers';
import './index.css';

const createStoreWithMiddleware =  applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/reserve" component={App} />
                    <Route path="/" component={LandingPage} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
