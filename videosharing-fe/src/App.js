import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { APP_ROUTES } from './utils/constants';
import Nav from './components/Nav';
import NewVideo from './components/NewVideo';
import Notification from './components/Notification';
import { useState } from 'react';

function App(props) {
  const [notification, setNotification] = useState({});
  const cable = props.cable;
  cable.subscriptions.create({ channel: "NotificationChannel" },
    {
      connected: () => console.log("connected!"),
      disconnected: () => console.log("disconnected!"),
      received: (msg) => notificationHandler({ heading: `\"${msg?.video?.title}\" recently added`, message: `Created by: ${msg?.video?.user?.email}` })
    })

  const defaultNotification = { heading: '', message: '' };
  const notificationHandler = (nt) => {
    setNotification(nt);

    setTimeout(() => {
      setNotification(defaultNotification);
    }, 5000);
  }

  return (
    <div className="App">
      <Nav />
      <Notification heading={notification.heading} message={notification.message} />
      <Routes>
        <Route exact path="/" element={<Navigate to={APP_ROUTES.DASHBOARD} />} />
        <Route path={APP_ROUTES.SIGN_UP} exact element={<SignUp />} />
        <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={APP_ROUTES.NEW_VIDEO} element={<NewVideo />} />
      </Routes>
    </div>
  );
}

export default App;
