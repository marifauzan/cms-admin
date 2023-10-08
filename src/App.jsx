import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import NotFound from './views/NotFound';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<Login />} exact />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
