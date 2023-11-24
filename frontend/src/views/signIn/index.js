import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../../service/generalService";
import UserContext from '../../context/UserContext';
import Header from '../home/components/header';
import Footer from '../home/components/footer';
import { isPasswordStrong } from '../../utils/utils';
import Swal from 'sweetalert2'

const RegistrationPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorRequest, setErrorRequest] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordStrong(password)) {
      setPasswordError('A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('As senhas não correspondem.');
      return;
    }

    try {
      const response = await api('/user/register', 'POST', {
        "username": e.target.elements.email.value,
        "firstName": e.target.elements.name.value,
        "lastName": e.target.elements.lastName.value,
        "password": password,
      })

      let statusCode = response.status;
      if (statusCode === 201) {
        const userDate = response.data.user;
        setUser(userDate);
        navigate("/dashboard")
      }
    } catch (error) {
      console.log(e);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocorreu um erro ao realizar o cadastro, tente novamente mais tarde.',
      })
      setErrorRequest(true);
    }
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center mt-5 mb-5 h-200 bg-white">
          <form
            onSubmit={handleSubmit}
            className="bg-black rounded-lg px-20 p-8 max-w-lg w-1000"
          >
            <h2 className="text-2xl font-bold mb-2 text-center text-white font-plus-jakarta-sans">Cadastro</h2>
            <div className="mb-2">
              <label htmlFor="name" className="block mb-2 text-white font-dm-sans">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md font-dm-sans"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="lastName" className="block mb-2 text-white font-dm-sans">
                Sobrenome
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md font-dm-sans"
                required
              />
            </div>
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
            <div className="mb-2">
              <label htmlFor="confirmPassword" className="block mb-2 text-white font-dm-sans">
                Confirme a Senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-md font-dm-sans"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {passwordError && <p className="text-red-500 mt-2 font-dm-sans">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="font-dm-sans mt-4 w-full py-2 bg-yellow-300 text-white rounded-md font-bold text-lg hover:bg-yellow-500 transition-colors"
            >
              Cadastrar
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default RegistrationPage;
