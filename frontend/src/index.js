import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// middleware
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// reducers
import {
	UsersReducer,
	PostsReducer,
	DiscussionsReducer,
} from './store/reducers/index.js';

const rootReducer = combineReducers({
	users: UsersReducer,
	posts: PostsReducer,
	discussions: DiscussionsReducer,
});

let store;
if (process.env.NODE_ENV === 'development') {
	store = createStore(rootReducer, applyMiddleware(thunk, logger));
} else {
	store = createStore(rootReducer, applyMiddleware(thunk));
}

ReactDOM.render(
	<Provider store = { store }>
		<Router>
			<Route path = '/' component = { App } />
		</Router>
	</Provider>,
	document.getElementById('root')
);
