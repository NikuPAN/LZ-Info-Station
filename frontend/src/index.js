import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "./index.css";
import { Provider } from 'react-redux';
import store from './store';
import './i18n';

// This is called every time the state of the store is changed
// const unsubscribe = store.subscribe(() => {
//   console.log("Store state changed!: ", store.getState());
// });

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<span>Loading...</span>}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
