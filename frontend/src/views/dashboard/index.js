import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate, useLocation } from "react-router-dom";
import SideMenu from '../../components/SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [registerDevice, setRegisterDevice]= useState(false);
  const [deviceCalling, setDeviceCalling] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate]);

  useEffect(() => {
    //get devices from api
  }, [reload]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Perform actions with deviceId, e.g., submit to API or perform necessary logic
    console.log('Device ID:', deviceId);


    // Reset the form or perform other actions after registration 
    setDeviceId('');
    setRegisterDevice(false);
    setIsLoading(false);
    setReload(true);
  };

  const callDevice = (deviceId) => {
    setDeviceCalling(true);
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
                <FontAwesomeIcon icon={icon({ name: 'credit-card' })} size="3x" style={{ color: 'black' }} />
                <h1 className="text-[16px] font-bold font-dm-sans w-28 mt-4">Registrar Novo Dispositivo!</h1>
              </div>
            </button>
          </div>
          <div className="flex flex-row flex-wrap items-center">
            <button className="w-[240px] h-[200px] bg-white rounded-xl shadow-lg m-5 flex justify-center items-center focus:outline-none border border-gray-300 hover:shadow-xl"
              onClick={() => {
                  callDevice('1')
                }
              }>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-[16px] font-bold font-dm-sans w-28 mt-4 mb-2">Dispositivo 1</h1>
                  <FontAwesomeIcon icon={icon({ name: 'credit-card' })} size="3x" style={{ color: 'black' }} />
                <h1 className="text-[16px] font-bold font-dm-sans w-28 mt-4">Chamar Dispositivo</h1>
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
