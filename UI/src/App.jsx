import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import Forms from './components/Forms';
import { ItemForm } from './components/ItemForm';
import { LoginForm } from './components/LoginForm';
import Navbar from './components/NavBar';
import AdminInventory from "./pages/AdminInventory";
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import ItemPage from './pages/ItemPage';
import { MainContextProvider } from './utilities/MainContextProvider';

import "./pages/styles.css";

function App() {
  return (
    <MainContextProvider>
      <Container className="app-container">
        <Navbar />
        <Routes>
          <Route path="/adminInventory" element={<AdminInventory />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/createitem" element={<ItemForm />} />
          <Route path="/createuser" element={<Forms />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </MainContextProvider>
  );
}

export default App;
