import './App.css';
import { createGlobalStyle } from 'styled-components';

import Menu from './components/layout/Menu';
import Dashboard from './pages/Dashboard';
import RegisterContract from './pages/RegisterContract';
import RegisterUser from './pages/RegisterUser';
import ContractView from './pages/ContractView';

import { MenuData } from './components/data/MenuData';
import validations from './models/Validations';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import UserDataProvider from './contexts/Users';
import ContractsProvider from './contexts/Contracts';
import Validations from './contexts/Validations';

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
      font: inherit;
    }

    input[error] {
      border: 1px solid red !important;
    }

    @media (max-width: 1023px) {
      .row {
        flex-direction: column;
      }

      .col input {
        width: 100%;
      }
    }
`;

function App() {

  return (
    <>
      <GlobalStyle />
      <Router>
        <Menu options={MenuData} />
        <UserDataProvider>
          <ContractsProvider>
            <Validations.Provider value={validations}>
                <Routes>
                  <Route path='/' element={<Dashboard />} />
                  <Route path='/contracts' element={<ContractView />} />
                  <Route path='/register/contract' element={<RegisterContract />} />
                  <Route path='/register/user' element={<RegisterUser />} />
                </Routes>
            </Validations.Provider>
          </ContractsProvider>
        </UserDataProvider>
          
      </Router>
    </>
  );
}

export default App;
