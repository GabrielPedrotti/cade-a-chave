import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, useLocation } from "react-router-dom";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'


const SideMenu = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <aside className="flex flex-col min-h-screen ">
            <div className="bg-[#252525] w-72 min-h-screen items-center justify-center h-[100%]">
                <img
                    src="https://i.imgur.com/UvOeYRa.png"
                    alt="Logo Cadê a Chave?"
                    className="h-[120px] pl-24 pt-4 pb-2 content-center"
                />
                <h1 className="text-2xl font-bold mb-2 text-center text-white font-dm-sans">
                    Cadê a Chave?
                </h1>
                <ul className="pt-10 flex flex-col space-y-6 text-center">
                    <li>
                        <div className={location.pathname === '/dashboard' ? "bg-[#3F3F3F] h-16 flex items-center justify-center" : "bg-[#252525] h-16 flex items-center justify-center"}>
                            <FontAwesomeIcon icon={icon({ name: 'home' })} style={{ color: 'white' }} />
                            <button onClick={() => {navigate('/dashboard')}} className="pl-2 text-gray-300 hover:text-white text-lg font-dm-sans">
                                Dispositivos
                            </button>
                        </div>
                    </li>
                    <li>
                        <div className="bg-[#252525] h-16 flex items-center justify-center">
                            <FontAwesomeIcon icon={icon({ name: 'sign-out-alt' })} style={{ color: 'white' }} />
                            <button onClick={() => {navigate('/')}} className="pl-2 text-gray-300 hover:text-white text-lg font-dm-sans">
                                Sair
                            </button>
                        </div>
                    </li>
                    <li>
                        <div className="flex flex-col items-center justify-center">
                            <FontAwesomeIcon icon={icon({ name: 'user' })} style={{ color: 'white' }} />

                            <div className="pt-1">
                                <p className="text-gray-300 text-lg font-dm-sans">{user?.firstName + ' ' + user?.lastName}</p>
                            </div>

                            <div className="pt-1">
                                <p className="text-gray-400 text-sm font-dm-sans">{user?.username}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default SideMenu;