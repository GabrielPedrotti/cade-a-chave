import React from 'react';

const Main = () => {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4 text-left text-gray-900 font-plus-jakarta-sans">
        Bem-vindo ao <span className="text-yellow-300">Cadê a Chave?!</span>
      </h1>
      <div className="flex justify-center">
        <img
          src="https://i.imgur.com/Q9pzYQ5.jpg"
          alt="Controle de gastos"
          className="max-w-lg	 h-auto"
        />
        <div className="ml-40 pt-40 flex flex-col items-center font-dm-sans">
          <p className="text-lg mb-8 text-center w-43">
            O Cadê a Chave? é a ferramenta perfeita para ajudar você a encontrar a suas chaves ou objetos perdidos dentro de casa.
          </p>
          <a
            href="/signIn"
            className="px-8 mb-4 py-4 bg-yellow-300 text-white rounded-md font-bold text-lg hover:bg-yellow-400 transition-colors"
          >
            Registre seu dispositivo!
          </a>
          <a
            href="/logIn"
            className="px-8 py-4 bg-gray-300 text-gray-800 rounded-md font-bold text-lg hover:bg-gray-400 transition-colors"
          >
            Já Registrou? Faça login
          </a>
        </div>
      </div>
    </main>
  );
};

export default Main;
