import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Profile from './Pages/Profile/Profile';
import Terms from './Pages/Legal/Terms';
import Privacy from './Pages/Legal/Privacy';
import InscriptionPrestataire from './Pages/Auth/InscriptionPrestataire';
import Messaging from './Pages/Messaging/Messaging';
import RequireRole from './components/common/RequireRole';
import MesServices from './Pages/Prestataire/MesServices';
import AjouterService from './Pages/Prestataire/AjouterService';
import RechercheServices from './Pages/User/RechercheServices';
import ServiceDetails from './Pages/User/ServiceDetails';
import ServicesPage from './Pages/Services/ServicesPage';
import MyReservationsPage from './Pages/Reservations/MyReservationsPage';
import MesDemandes from './Pages/Prestataire/MesDemandes';


  function App() {

    const roleString = localStorage.getItem('userRole');
    const userRole = roleString ? parseInt(roleString, 10) : null;


    const idPrestataire = localStorage.getItem('prestataireId');
    const idPrestaNumber = idPrestataire ? Number(idPrestataire) : undefined;

    return (
      <div style={{backgroundColor: '#00d0b129', minHeight: '100vh'}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path='/CGU' element={<Terms />} />
          <Route path='/politique-de-confidentialite' element={<Privacy />} />
          <Route path="/inscription-prestataire" element={<InscriptionPrestataire />} />
          <Route path="/register-prestataire" element={<InscriptionPrestataire />} />
          <Route path="/recherche-services" element={<RechercheServices />} />
          <Route path="/services/:id" element={<ServiceDetails />} />

          {<Route element={<RequireRole allowedRoles={[1]} userRole={userRole} />}>
            <Route
              path="/mes-services"
              element={<MesServices idPrestataire={idPrestaNumber} />}
            />
            <Route path="/ajouter-service" element={<AjouterService />} />
            <Route path="/mes-demandes" element={<MesDemandes />} />
          </Route>}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/reservations" element={<MyReservationsPage />} />
        </Routes>
      </BrowserRouter>
      </div>
    );
  }

  export default App;