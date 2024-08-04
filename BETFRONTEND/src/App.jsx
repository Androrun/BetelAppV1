// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ClientsProvider } from './context/ClientsContext';
import { UserProvider } from './context/UserContext';
import { ModalProvider } from './context/ModalContext';
import { PatientProvider } from './context/PatientContext';
import { HospitalizacionProvider } from './context/HospitalizacionContext';
import { HospedajeProvider } from './context/HospedajeContext';

import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import { ProtectedRoute } from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClientsPage from './pages/ClientsPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import NotFound from './pages/NotFound';
import CreatePetPage from './pages/CreatePetPage';
import PatientsPage from './pages/PatientsPage';
import PreHospitalizacionForm from './pages/PreHospitalizacionForm';
import DetalleHospitalizacion from './pages/DetalleHospitalizacion';
import HospitalizationsPage from './pages/HospitalizationsPage';
import PerfilMascotaPage from './pages/PerfilMascotaPage';
import HospedajePage from './pages/HospedajePage';
import HospedajeRegistroPage from './pages/HospedajeRegistroPage'; 
import CertificadoMedicoPage from './pages/CertificadoMedicoPage';

const App = () => {
  const { isAuth, loading, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) return <h1>Cargando ...</h1>;

  return (
    <ModalProvider>
      <HospitalizacionProvider>
        <PatientProvider>
          <HospedajeProvider>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Navigate to="/login" />} />  {/* Redirige la ruta principal a la página de login */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>

              <Route element={<ProtectedLayout isAuth={isAuth} toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />}>
                <Route element={<ClientsProvider><Outlet /></ClientsProvider>}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/veterinario/clients" element={<ClientsPage />} />
                  <Route path="/veterinario/clients/:id" element={<CreatePetPage />} />
                  <Route path="/veterinario/patients" element={<PatientsPage />} />
                  <Route path="/veterinario/patients/:id" element={<PerfilMascotaPage />} /> {/* Ruta para el perfil de la mascota */}
                  <Route path="/veterinario/hospitalization" element={<HospitalizationsPage />} />
                  <Route path="/veterinario/hospedaje" element={<HospedajePage />} /> {/* Ruta para el hospedaje */}
                  <Route path="/veterinario/patients/:id/certificado" element={<CertificadoMedicoPage />} /> {/* Ruta para el certificado médico */}
                  <Route path="/certificado-medico" element={<CertificadoMedicoPage />} /> {/* Ruta para abrir el modal de búsqueda */}
                </Route>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/prehospitalizacion" element={<PreHospitalizacionForm />} />
                <Route path="/detalles-hospitalizacion/:id" element={<DetalleHospitalizacion />} />

                <Route element={<ProtectedLayout isAuth={isAuth} toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />}>
                  <Route element={<Outlet />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/veterinario/clients" element={<ClientsPage />} />
                    <Route path="/veterinario/clients/:id" element={<CreatePetPage />} />
                    <Route path="/veterinario/patients" element={<PatientsPage />} />
                    <Route path="/veterinario/patients/:id" element={<PerfilMascotaPage />} />
                    <Route path="/veterinario/hospitalization" element={<HospitalizationsPage />} />
                    <Route path="/veterinario/hospedaje" element={<HospedajePage />} />
                    <Route path="/hospedaje/registro" element={<HospedajeRegistroPage />} /> {/* Define la ruta */}
                    <Route path="/veterinario/patients/:id/certificado" element={<CertificadoMedicoPage />} />
                  </Route>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/prehospitalizacion" element={<PreHospitalizacionForm />} />
                  <Route path="/detalles-hospitalizacion/:id" element={<DetalleHospitalizacion />} />

                  <Route element={<ProtectedRoute isAllowed={user?.role_id === 1} redirectTo="/home" />}>
                    <Route element={<UserProvider><Outlet /></UserProvider>}>
                      <Route path="/admin" element={<AdminPage />} />
                    </Route>
                  </Route>
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </HospedajeProvider>
        </PatientProvider>
      </HospitalizacionProvider>
    </ModalProvider>
  );
};

const PublicLayout = () => (
  <div className="flex h-screen w-screen overflow-hidden">
    <Outlet />
  </div>
);

const ProtectedLayout = ({ isAuth, toggleSidebar, sidebarOpen }) => (
  <div className="flex h-screen overflow-hidden">
    {isAuth && <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
    <div className={`flex flex-col flex-grow overflow-hidden transition-all duration-300 ${isAuth ? 'ml-64' : 'ml-0'}`}>
      {isAuth && <Navbar toggleSidebar={toggleSidebar} />}
      <div className="flex-grow overflow-y-auto p-4 pt-16">
        <Outlet />
      </div>
    </div>
  </div>
);

export default App;

