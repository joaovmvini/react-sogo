import './App.css';
import { createGlobalStyle } from 'styled-components';

import Menu from './components/Menu';
import Dashboard from './pages/Dashboard';
import RegisterContract from './pages/RegisterContract';
import RegisterUser from './pages/RegisterUser';
import ContractView from './pages/ContractView';

import { MenuData } from './components/data/MenuData';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
    #root {
      width: 100vw;
      height: 100vh;

      display: flex;
    }

    .page {
      height: 100vh;
      width: calc(100vw - 150px);
      font-size: 1rem;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
`;

function App() {

  return (
    <>
      <GlobalStyle />
      <Router>
        <Menu options={MenuData} />

        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/registerUser' element={<RegisterUser />} />
          <Route path='/registerContract' element={<RegisterContract />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
