import React from 'react';

const Main = () => {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4 text-left text-gray-900 font-plus-jakarta-sans">
        Bem-vindo ao <span className="text-rose-300">Meu Porquinho</span>!
      </h1>
      <div className="flex justify-center">
        <img
          src="https://img.freepik.com/free-vector/financial-planning-concept-illustration_114360-16016.jpg?w=740&t=st=1684697795~exp=1684698395~hmac=63308317c0f593005e3c1c82ddbe4247d48d5c47957aeb2c213665a659a1af6d"
          alt="Controle de gastos"
          className="max-w-lg	 h-auto"
        />
        <div className="ml-40 pt-40 flex flex-col items-center font-dm-sans">
          <p className="text-lg mb-8 text-center w-43">
            O Meu Porquinho é a ferramenta perfeita para ajudar você a controlar seus gastos de forma simples e eficiente.
          </p>
          <a
            href="/signIn"
            className="px-8 mb-4 py-4 bg-rose-300 text-white rounded-md font-bold text-lg hover:bg-rose-400 transition-colors"
          >
            Comece agora a controlar seus gastos!
          </a>
          <a
            href="/logIn"
            className="px-8 py-4 bg-gray-300 text-gray-800 rounded-md font-bold text-lg hover:bg-gray-400 transition-colors"
          >
            Já é cadastrado? Faça login
          </a>
        </div>
      </div>
      <hr className="my-16" />
      <section className="mt-16">
        <h2 className="text-xl mb-16 text-center w-43">
          A Meu Porquinho está aqui para facilitar o seu dia a dia, visualize algumas fotos do nosso produto:
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-4">
            <img
              src="https://i.imgur.com/YmCP1aQ.png"
              alt="Dashboard"
              className="rounded-lg"
            />
            <img
              src="https://i.imgur.com/CdMSr0A.png"
              alt="Manager"
              className="rounded-lg"
            />
            <img
              src="https://i.imgur.com/ASOByMs.png"
              alt="News"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
