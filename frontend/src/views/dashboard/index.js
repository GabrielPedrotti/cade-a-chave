import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate, useLocation } from "react-router-dom";
import SideMenu from '../../components/SideMenu';
import api from '../../service/generalService';
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [registerDevice, setRegisterDevice]= useState(false);
  const [deviceCalling, setDeviceCalling] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    console.log('user: ', user);
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate]);

  useEffect(() => {
    //get devices from api
  }, [reload]);

  const updateUserContext = async () => {
    const response = await api('/user/', 'GET');
    for (const key in response.data) {
      if (response.data.hasOwnProperty(key)) {
        const element = response.data[key];
        if (element.username === user.username) {
          setUser(element);
        }
      }
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Perform actions with deviceId, e.g., submit to API or perform necessary logic
    console.log('Device ID:', deviceId);

    // await api(`/user/financial-manager?username=${user?.username}&month=${actualMonth}`, 'PUT', {
    //   bankBalance: formatNumber(bankBalance),
    //   savedMoney: formatNumber(savedMoney),
    //   foodCost: formatNumber(foodCost),
    //   houseCost: formatNumber(houseCost),
    //   transportCost: formatNumber(transportCost),
    //   date: new Date()
    // })

    await updateUserContext();


    // Reset the form or perform other actions after registration 
    Swal.fire({
      icon: 'success',
      title: 'Dispositivo registrado com sucesso!',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      navigate('/dashboard');
    })
    setDeviceId('');
    setRegisterDevice(false);
    setIsLoading(false);
    setReload(true);
  };

  const callDevice = (deviceId) => {
    if(deviceCalling) {
      // TODO: call device
      console.log('Calling device: ', deviceId);
    } else {
      console.log('Device not calling');
       // TODO: stop calling device
    }
  }

  return (
    <div className="flex max-w-screen-sm">
      <SideMenu />
      <div className="ml-10 pr-10">
        <div className="pt-10 h-20 pb-4 flex items-center">
          <h1 className="pl-4 text-[32px] font-bold font-plus-jakarta-sans">Dispositivos</h1>
        </div>
        <div className="flex">
          <div className="flex flex-row flex-wrap items-center">
            <button className="w-[240px] h-[200px] bg-white rounded-xl shadow-lg m-5 flex justify-center items-center focus:outline-none border border-gray-300 hover:shadow-xl"
              onClick={() => {
                  setRegisterDevice(!registerDevice)
                }
              }>
              <div className="flex flex-col justify-center items-center">
                <FontAwesomeIcon icon={icon({ name: 'plus' })} size="3x" style={{ color: 'black' }} />
                <h1 className="text-[16px] font-bold font-dm-sans w-28 mt-4">Registrar Novo Dispositivo!</h1>
              </div>
            </button>
          </div>
          <div className="flex flex-row flex-wrap items-center">
          <button
            className="w-[240px] h-[200px] bg-white rounded-xl shadow-lg m-5 flex justify-center items-center focus:outline-none border border-gray-300 hover:shadow-xl"
            onClick={() => {
              setDeviceCalling(!deviceCalling);
              callDevice('1');
            }}
          >
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-[16px] font-bold font-dm-sans w-28 mb-2">Dispositivo 1</h1>
              <img
                  src="https://i.imgur.com/epssJQk.png"
                  alt="Dispositivo 1"
                  className="h-[120px] pb-2 content-center"
              />
              <h1 className="text-[16px] font-bold font-dm-sans mt-2">{!deviceCalling ? 'Chamar Dispositivo' : ''}</h1>
              {deviceCalling && (
                <p className="text-xs text-yellow-600 mt-2">Chamando dispositivo...</p>
              )}
            </div>
          </button>
          </div>
        </div>
        {registerDevice && (
          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="deviceId" className="block text-sm font-bold">ID do Dispositivo</label>
                <input
                  type="text"
                  id="deviceId"
                  name="deviceId"
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  className="mt-2 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-yellow-500 w-full"
                />
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className={`h-full w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none ${
                  isLoading ? 'flex justify-center items-center' : ''
                }`}
              >
                {!isLoading ? 'Confirme o Registro' : (
                  <FontAwesomeIcon icon={icon({ name: 'spinner' })} spin />
                )}
              </button>
            </form>
          </div>
          )}
      </div>
    </div>
  );
};

export default Dashboard;
