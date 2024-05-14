import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { APP_ROUTES } from './utils/constants';
import Nav from './components/Nav';

function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route exact path="/" element={<Navigate to={APP_ROUTES.DASHBOARD} />} />
        <Route path={APP_ROUTES.SIGN_UP} exact element={<SignUp />} />
        <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
