import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import App from './App'
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// INIT REDUX
// store.dispatch(fetchTeaWarehouseSensors());
// store.dispatch(fetchTeaWarehouseShinkoSensors());
// store.dispatch(fetchPosts());
// store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
)
