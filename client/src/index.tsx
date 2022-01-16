import ReactDOM from 'react-dom';
import { App } from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import { applyMiddleware, createStore } from 'redux';

import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
