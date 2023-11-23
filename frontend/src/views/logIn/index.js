import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../home/components/header';
import Footer from '../home/components/footer';
import api from "../../service/generalService";
import UserContext from '../../context/UserContext';

const LogIn = () => {
  const ref = React.useRef(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorRequest, setErrorRequest] = useState(false);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api('/user/login', 'POST', {
        "username": e.target.elements.email.value,
        "password": e.target.elements.password.value,
      })

      let statusCode = response.status;
        if(statusCode === 200) {
          const userDate = response.data.user;
          setUser(userDate);
          navigate("/dashboard")
        }     
    } catch (error) {
      console.log(e);
      setErrorRequest(true);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header/>
        <div className="flex-grow flex items-center justify-center  mt-5 h-200 bg-white" ref={ref}>
          <form
            onSubmit={handleSubmit}
            className="bg-black rounded-lg px-20 p-8 max-w-lg"
          >
            <h2 className="text-2xl font-bold mb-2 text-center text-white font-plus-jakarta-sans">Entrar</h2>
            <div className="mb-2">
              <label htmlFor="email" className="block mb-2 text-white font-dm-sans">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md font-dm-sans"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="block mb-2 text-white font-dm-sans">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md font-dm-sans"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            {errorRequest && (
              <>
                <div className="text-red-500 text-sm mb-2 font-dm-sans">
                  Email ou senha incorretos
                </div>
              </>
            )}
            <button
              type="submit"
              className="font-dm-sans mt-4 w-full py-2 bg-rose-300 text-white rounded-md font-bold text-lg hover:bg-rose-500 transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default LogIn;
