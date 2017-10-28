import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import NaicsSingle from './NaicsSingle';
import NaicsTime from './NaicsTime';
import Syntax from './Syntax';
import c_r from '../../public/company_revenue.json'
// import store, {fetchCategories, getCurrentOrder, fetchSaveProducts, fetchHistoryPurchases} from '../store';
// import {thunk actions come here later} from '../store';

export default class Main extends Component {

	componentDidMount(){
		// const categoriesThunk = fetchCategories();
		// store.dispatch(categoriesThunk);
	}
	render(){
		// console.log(c_r)
		return(
				<div>
					
					<div className="container">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/naicsCurrent" component={NaicsSingle} />
							<Route exact path="/NaicsTime" component={NaicsTime} />							
						</Switch>
					</div>
				</div>

			)
	}
}


// <Route exact path="/naics" component={Naics} />
// 							<Route exact path="/syntax" component={Syntax} />
