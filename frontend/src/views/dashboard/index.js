import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate, useLocation } from "react-router-dom";
import SideMenu from '../../components/SideMenu';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const getUserSavedMoneyThroughMonths = (user) => {
    const today = new Date();
    const thisMonth = today.getMonth() + 1;
    const thisYear = today.getFullYear();
    const months = [];
    const savedMoney = [];

    for (let i = 1; i <= thisMonth; i++) {
      if (user && user.finances && user.finances[i]) {
        const monthFinances = user.finances[i];
        if (typeof monthFinances === 'object') {
          const monthSavedMoney = monthFinances.savedMoney;
          savedMoney?.push(monthSavedMoney);
        }
      } else {
        savedMoney?.push(0);
      }
    }
    

    return savedMoney;
  };


  const data = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'R$',
        labelColor: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'rgba(245, 247, 249, 1)',
        borderColor: 'rgba(245, 247, 249, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(238, 191, 4, 1)',
        hoverBorderColor: 'rgba(238, 191, 4, 1)',
        data: getUserSavedMoneyThroughMonths(user),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Dinheiro Guardado',
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate]);

  const getThisMonthCosts = (user) => {
    const today = new Date();
    const actualMonth = today.getMonth() + 1;
    const monthFinances = user?.finances?.[actualMonth] ? user.finances[actualMonth] : 0;

    const arrayCosts = [];
    arrayCosts.push(monthFinances?.foodCost);
    arrayCosts.push(monthFinances?.houseCost);
    arrayCosts.push(monthFinances?.transportCost);
    return arrayCosts;
  };


  const dataAtividades = {
    labels: ['Alimentação', 'Moradia', 'Transporte'],
    datasets: [
      {
        data: getThisMonthCosts(user),
        backgroundColor: [
          'rgba(238, 191, 4, 1)',
          'rgba(255, 153, 153, 1)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(238, 191, 4, 1)',
          'rgba(255, 153, 153, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  const optionsVertical = {
    indexAxis: 'y',
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    },
  };

  const getUserLastAndCurrentMonthSavings = (user) => {
    const today = new Date();
    const actualMonth = today.getMonth() + 1;
    const lastMonth = actualMonth - 1;
    let lastMonthFinances = 0;
    let actualMonthFinances = 0;

    if (user && user.finances && user?.finances[lastMonth]) {
      lastMonthFinances = user?.finances[lastMonth] ? user.finances[lastMonth] : 0;
    }

    if (user && user.finances && user?.finances[actualMonth]) {
      actualMonthFinances = user?.finances[actualMonth] ? user.finances[actualMonth] : 0;
    }

    const arraySavings = [];
    arraySavings.push(actualMonthFinances.savedMoney);
    arraySavings.push(lastMonthFinances.savedMoney);
    return arraySavings;
  };

  const labelsVertical = ['Mês Atual', 'Mês Anterior'];

  const dataVertical = {
    labels: labelsVertical,
    datasets: [
      {
        label: 'Dinheiro Guardado R$',
        data: getUserLastAndCurrentMonthSavings(user),
        borderColor: 'rgba(245, 247, 249, 1)',
        hoverBackgroundColor: 'rgba(238, 191, 4, 1)',
        backgroundColor: 'rgba(41, 41, 41, 1)',
      },
    ],
  };

  const sumUserBankBalance = (user) => {
    let bankBalance = 0;
    for (const key in user?.finances) {
      if (user?.finances.hasOwnProperty(key)) {
         if (typeof user.finances[key] === 'object') {
          const element = user.finances[key];
          bankBalance += element.bankBalance;
         }
      }
  }
    return bankBalance;
  };

  const sumUserSavedMoney = (user) => {
    let savedMoney = 0;
    for (const key in user?.finances) {
      if (user?.finances.hasOwnProperty(key)) {
          if (typeof user.finances[key] === 'object') {
            const element = user.finances[key];
            savedMoney += element.savedMoney;
          }
      }
  }
    return savedMoney;
  };

  const sumUserSpentMoney = (user) => {
    let spentMoney = 0;
    for (const key in user?.finances) {
      if (user?.finances.hasOwnProperty(key)) {
          if (typeof user.finances[key] === 'object') {
            const element = user.finances[key];
            let foodCost = element.foodCost;
            let houseCost = element.houseCost;
            let transportCost = element.transportCost;
            spentMoney += foodCost + houseCost + transportCost;
          }
      }
  }
    return spentMoney;
  };

  return (
    <div className="flex max-w-screen-sm">
      <SideMenu />
      <div className="ml-10 pr-10">
        <div className="pt-10 h-20 pb-4 flex items-center">
          <h1 className="pl-4 text-[32px] font-bold font-plus-jakarta-sans">Dashboard</h1>
        </div>
        <div className="flex flex-row flex-wrap items-center">
          <div className="w-[240px] h-[200px] bg-[#292929] rounded-xl shadow-lg m-5 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <FontAwesomeIcon icon={icon({ name: 'wallet' })} size="3x"  style={{ color: 'white' }} />
              <h1 className="text-[32px] font-bold font-dm-sans text-white">
                R$ {sumUserBankBalance(user)
                  .toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
              </h1>
              <h1 className="text-[16px] font-bold font-dm-sans text-white">Conta</h1>
            </div>
          </div>
          <div className="w-[240px] h-[200px] bg-white rounded-xl shadow-lg m-5 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <FontAwesomeIcon icon={icon({ name: 'credit-card' })} size="3x"  style={{ color: 'black' }} />
              <h1 className="text-[32px] font-bold font-dm-sans">
                R$ {sumUserSpentMoney(user)
                  .toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
              </h1>
              <h1 className="text-[16px] font-bold font-dm-sans">Total Gasto</h1>
            </div>
          </div>
          <div className="w-[240px] h-[200px] bg-white rounded-xl shadow-lg m-5 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <FontAwesomeIcon icon={icon({ name: 'piggy-bank' })} size="3x"  style={{ color: 'black' }} />
              <h1 className="text-[32px] font-bold font-dm-sans">
                R$ {sumUserSavedMoney(user)
                  .toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
              </h1>
              <h1 className="text-[16px] font-bold font-dm-sans">Total Guardado</h1>
            </div>
          </div>
        </div>
        <div className="bottom-0 pb-10 pl-4">
          <Bar data={data} height={312} width={825} options={options}/>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto"> {/* Apply max-width and center the content */}
        <div className="pt-20 pb-4 text-center">
          <h1 className="text-3xl font-bold font-dm-sans">Atividade</h1>
        </div>
        <div className="pt-2 text-center">
          <Doughnut data={dataAtividades} options={{ responsive: true }} />
        </div>
        <div className="mt-6 text-center bg-[#F5F7F9]">
          <Bar options={optionsVertical} data={dataVertical} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
