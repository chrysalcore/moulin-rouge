import { Routes, Route } from 'react-router-dom'
import Main from './pages/Main.jsx';
import Menu from "./pages/Menu.jsx";
import Auth from './pages/Auth.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/menu" element={<Menu />} />
        <Route path="/auth" element={<Auth />} /> */}
      </Routes>
    </>
  );
};

export default App;