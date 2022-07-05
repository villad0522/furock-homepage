
import React from 'react';
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './index.scss';
import rootReducer from './reducers/rootReducer'
import rootSaga from './sagas/rootSaga'
import reportWebVitals from './reportWebVitals';
import App from './App';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({ diff: true, collapsed: true, });
const store = createStore(
  rootReducer,
  //compose(applyMiddleware(sagaMiddleware)),
  compose(applyMiddleware(sagaMiddleware, logger)),
);
sagaMiddleware.run(rootSaga);

const theme = createTheme({
  typography: {
    fontFamily: "'Shippori Mincho B1', serif",
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
// ↑ アプリのパフォーマンスを測定したいときは、
// ↑ 「reportWebVitals()」の括弧の中に表示用関数を書いてください。
// ↑ たとえば「reportWebVitals(console.log)」と記述すると、
// ↑ ログに測定結果を表示できます。
// ↑ 詳しくは https://bit.ly/CRA-vitals を参照してください。


