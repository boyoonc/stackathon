import {createStore, applyMiddleware, combineReducers} from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import products from './products';
import currentOrder from './currentOrder'
import emailInput from './auth';
import passwordInput from './password';
import savedProducts from './savedProducts';
import crossList from './crossPurchase';
import historyList from './historyPurchase';
import product from './product';
import categories from './categories';
import reviews from './reviews';
import {newReviewTitleReducer as newReviewTitle, newReviewContentReducer as newReviewContent} from './newReview';
import currentUser from './currentUser';
import navbarActive from './navbar'


const reducer = combineReducers(
	{
    products,
    emailInput,
    passwordInput,
    currentOrder,
    savedProducts,
    crossList,
    historyList,
    categories,
    product,
    reviews,
    newReviewTitle,
    newReviewContent,
    currentUser,
    navbarActive

	}
);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger()
  ))
);

export default store;

export * from './products';
export * from './auth';
export * from './password';
export * from './currentOrder';
export * from './savedProducts';
export * from './crossPurchase';
export * from './historyPurchase';
export * from './product';
export * from './categories';
export * from './reviews';
export * from './newReview';
export * from './currentUser';
export * from './navbar';
