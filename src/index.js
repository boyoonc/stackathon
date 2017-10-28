// import React from 'react';
// import ReactDOM from 'react-dom';
// import Main from './Components/Main'

// ReactDOM.render(<Main />, document.getElementById('root'));

import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
// import store from './store'
import Main from './components/Main'
import { HashRouter as Router } from 'react-router-dom';


ReactDOM.render(
	
		<Router>
			<Main />
		</Router>,
	
	document.getElementById('root')
)

/*
<Provider store={store}>
		<Router>
			<Main />
		</Router>
	</Provider>,
*/