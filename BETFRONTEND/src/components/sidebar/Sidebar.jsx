import { Link } from "react-router-dom";
import { FaHome, FaUserMd, FaUserShield, FaPaw, FaStethoscope, FaDog, FaSyringe, FaFileMedical } from "react-icons/fa"; 
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-cyan-600 text-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="mt-16 p-4">
        <ul>
          <li className="mb-8 flex items-center">
            <Link to="/home" className="flex items-center text-lg">
              <FaHome className="text-2xl" />
              <span className={`ml-4 transition-opacity duration-300 ${!isOpen ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>Inicio</span>
            </Link>
          </li>
          <li className="mb-8 flex items-center">
            <Link to="/veterinario/clients" className="flex items-center text-lg">
              <FaUserMd className="text-2xl" />
              <span className={`ml-4 transition-opacity duration-300 ${!isOpen ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>Clientes</span>
            </Link>
          </li>
          <li className="mb-8 flex items-center">
            <Link to="/veterinario/patients" className="flex items-center text-lg">
              <FaDog className="text-2xl" />
              <span className={`ml-4 transition-opacity duration-300 ${!isOpen ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>Pacientes</span>
            </Link>
          </li>
          <li className="mb-8 flex items-center">
            <Link to="/veterinario/hospitalization" className="flex items-center text-lg">
              <FaStethoscope className="text-2xl" />
              <span className={`ml-4 transition-opacity duration-300 ${!isOpen ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>Hospitalización</span>
            </Link>
          </li>
          <li className="mb-8 flex items-center">
            <Link to="/veterinario/hospedaje" className="flex items-center text-lg">
              <FaPaw className="text-2xl" />
              <span className={`ml-4 transition-opacity duration-300 ${!isOpen ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>Hospedaje</span>
            </Link>
          </li>
          <li className="mb-8 flex items-center">
            <Link to="/veterinario/patients/:id/certificado" className="flex items-center text-lg">
              <FaFileMedical className="text-2xl" />
              <span className={`ml-4 transition-opacity duration-300 ${!isOpen ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>Certificado Médico</span>
            </Link>
          </li>
          {user.role_id === 1 && (
            <li className="mb-8 flex items-center">
              <Link to="/admin" className="flex items-center text-lg">
                <FaUserShield className="text-2xl" />
                <span className={`ml-4 transition-opacity duration-300 ${!isOpen ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>Administración</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;


