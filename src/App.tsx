// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

import 'mdb-react-ui-kit/dist/css/mdb.min.css'
// import './App.css'
import './i18n';

import LoginPage from './components/Login';
import SembCorpPage from './components/SembCorp';
import ErrorPage from './components/ErrorPage'
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<LoginPage />} />        
        <Route path="/" element={<Layout />}>
          <Route path='SEMBCORP' element={<SembCorpPage />} />
          <Route path="*" element={ <ErrorPage /> } />
        </Route>
      </Routes>
    </>
  )
}

export default App
