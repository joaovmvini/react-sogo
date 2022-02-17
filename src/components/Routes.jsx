import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import RegisterContract from '../pages/RegisterContract';
import RegisterUser from '../pages/RegisterUser';
import Dashboard from '../pages/Dashboard';

const MenuWidth = 150;

export function AppRoutes() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/registerUser' element={<RegisterUser />} />
                    <Route path='/registerContract' element={<RegisterContract />} />
                </Routes>
            </Router>
        </>
    )
}