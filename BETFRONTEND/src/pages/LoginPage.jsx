import { Card, Input, Button } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post(`${API_URL}/api/signin`, { email: data.email, password: data.password }, { withCredentials: true });
      const user = response.data;
      console.log('Login successful', user);
      navigate("/profile");
    } catch (error) {
      console.error('Login failed', error);
    }
  });

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-900">
      <div className="flex-1 flex items-center justify-center h-full">
        <Card className="h-full w-full p-8 flex items-center justify-center shadow-2xl rounded-lg bg-gray-800">
          <div className="w-full max-w-md">
            {loginErrors &&
              loginErrors.map((err, index) => (
                <p key={index} className="bg-red-500 text-white p-2 text-center rounded">
                  {typeof err === 'object' ? err.message : err}
                </p>
              ))}

            <h1 className="text-4xl font-bold my-10 text-center text-white">Inicia Sesión</h1>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="relative">
                <label htmlFor="email" className="block text-white text-sm font-semibold">Email</label>
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-gray-700 text-gray-300 w-full h-12 pl-4 pr-4 py-2 mt-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("email", {
                    required: "Email es requerido",
                  })}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-white text-sm font-semibold">Contraseña</label>
                <Input
                  type="password"
                  placeholder="Contraseña"
                  className="bg-gray-700 text-gray-300 w-full h-12 pl-4 pr-4 py-2 mt-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password", {
                    required: "La contraseña es requerida",
                  })}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>

              <div className="flex justify-center">
                <Button className="bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 ease-in-out px-5 py-3">Iniciar sesión</Button>
              </div>
            </form>

            <div className="flex justify-between mt-4 text-white">
              <p>No tienes una cuenta?</p>
              <Link to="/register" className="font-bold text-blue-400 hover:text-blue-500 transition-all duration-200 ease-in-out">
                Registrate
              </Link>
            </div>
          </div>
        </Card>
      </div>
      <div className="w-3/4 relative">
        <img
          src="https://app.okvet.co/assets/media/bg/bg-okvet.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center bg-black bg-opacity-50">
          <div>
            <h2 className="text-4xl font-bold mb-4">El mejor software veterinario</h2>
            <p className="text-lg">
              Empieza a gestionar tu veterinaria y organiza tu información para
              optimizar y automatizar los procesos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;


