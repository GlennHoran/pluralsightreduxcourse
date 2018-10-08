import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import '../node_modules/font-awesome/css/font-awesome.min.css';
import App from '../src/app/App';
import specialties from '../src/app/ReferralForm/reducers/SpecialtiesReducer';
import referral from '../src/app/ReferralForm/reducers/ReferralReducer';
import activities from '../src/app/ReferralForm/reducers/ActivitiesReducer';
import users from '../src/app/ReferralForm/reducers/UsersReducer';
import referrals from '../src/app/reducers/ReferralsReducer';
import systemUser from '../src/app/reducers/SystemUserReducer';
import questions from '../src/app/ReferralForm/reducers/QuestionsReducer';
import miscellaneousTime from '../src/app/reducers/MiscellaneousTimeReducer';
import billing from '../src/app/reducers/BillingReducer';

/* eslint-disable */
const composeEnhancers = typeof __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' && __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const middlewares = [];
middlewares.push(thunk);
if (process.env.NODE_ENV !== 'production') middlewares.push(createLogger({ level: 'info' }));

const reducers = combineReducers({
  specialties,
  referral,
  referrals,
  form: formReducer,
  activities,
  users,
  systemUser,
  questions,
  miscellaneousTime,
  billing
});
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(...middlewares)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <App />
    </AppContainer>
  </Provider>,
  document.getElementById('root')
);
