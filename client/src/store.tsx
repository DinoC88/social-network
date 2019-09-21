import { createStore, applyMiddleware, compose } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index';
import { rootReducer, AppState } from './reducers/index';
import { AppActions } from './types/types';
const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const middleWare = [ thunk as ThunkMiddleware<AppState, AppActions>, sagaMiddleware ];
const composeEnhancers = ((window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export default store;
