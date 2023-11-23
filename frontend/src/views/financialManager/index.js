import React, { useState, useContext, useEffect } from 'react';
import SideMenu from '../../components/SideMenu';
import UserContext from '../../context/UserContext';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';
import api from '../../service/generalService';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const FinancialManager = () => {
    const { user, setUser } = useContext(UserContext);
    const [bankBalance, setBankBalance] = useState(0);
    const [savedMoney, setSavedMoney] = useState(0);
    const [foodIsChecked, setFoodIsChecked] = useState(false);
    const [houseIsChecked, setHouseIsChecked] = useState(false);
    const [carIsChecked, setCarIsChecked] = useState(false);
    const [foodCost, setFoodCost] = useState(0);
    const [houseCost, setHouseCost] = useState(0);
    const [transportCost, setTransportCost] = useState(0);
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);

    const handleBankBalanceChange = (e) => {
        setBankBalance(e.target.value);
    }

    const handleSavedMoneyChange = (e) => {
        setSavedMoney(e.target.value);
    }

    const handleFoodCheckbox = (e) => {
        setFoodIsChecked(e.target.checked);
    }

    const handleHouseCheckbox = (e) => {
        setHouseIsChecked(e.target.checked);
    }

    const handleCarCheckbox = (e) => {
        setCarIsChecked(e.target.checked);
    }

    const handleFoodCostChange = (e) => {
        setFoodCost(e.target.value);
    }

    const handleHouseCostChange = (e) => {
        setHouseCost(e.target.value);
    }

    const handleTransportCostChange = (e) => {
        setTransportCost(e.target.value);
    }

    const formatNumber = (value) => {
        if (!value) return 0;

        return parseFloat(value?.replace('.', '')?.replace(',', '.'));
    }

    const isBrazilianCurrency = (valor) => {
        if (valor === 0) return true;

        const regex = /^(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/;
        return regex.test(valor)
    }

    const validateFields = (fields) => {
        fields.forEach(field => {
            if (!isBrazilianCurrency(field)) {
                return false;
            }
        });

        return true;
    }

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

    const save = async () => {
        try {
            setIsSaving(true);
            const isValid = validateFields([bankBalance, savedMoney, foodCost, houseCost, transportCost]);

            if (!isValid) {
                alert('Campo com formato inválido');
                return;
            }

            const today = new Date();
            const actualMonth = today.getMonth() + 1;

            await api(`/user/financial-manager?username=${user?.username}&month=${actualMonth}`, 'PUT', {
                bankBalance: formatNumber(bankBalance),
                savedMoney: formatNumber(savedMoney),
                foodCost: formatNumber(foodCost),
                houseCost: formatNumber(houseCost),
                transportCost: formatNumber(transportCost),
                date: new Date()
            })

            await updateUserContext();

            Swal.fire({
                icon: 'success',
                title: 'Valor adicionado com sucesso!',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                navigate('/dashboard');
            })

            setIsSaving(false);
        } catch (error) {
            setIsSaving(false);
            console.log('Error: ', error);
        }
    }

    return (
        <div className='flex'>
            <SideMenu />
            <div className='ml-10 w-9/12'>
                <h1 className='text-[32px] font-bold font-plus-jakarta-sans mt-10 mb-10'>Gerencie seu dinheiro</h1>
                <div className='text-[14px] font-bold font-plus-jakarta-sans flex space-x-16 p-4'>
                    <Input label='Saldo bancário' placeholder='Digite um valor' value={bankBalance} onChange={handleBankBalanceChange} width={'full'} color={isBrazilianCurrency(bankBalance) ? 'gray-700' : 'red-500'} />
                    <Input label='Quanto você quer poupar?' placeholder='Digite um valor' value={savedMoney} onChange={handleSavedMoneyChange} width={'full'} color={isBrazilianCurrency(savedMoney) ? 'gray-700' : 'red-500'} />
                </div>
                <div className='flex space-x-14 p-4'>
                    <p className='text-[16px] font-bold font-plus-jakarta-sans mt-10 mb-10'>Quais gastos você deseja cadastrar?</p>
                    <Checkbox label='Alimentação' onChange={handleFoodCheckbox} />
                    <Checkbox label='Moradia' onChange={handleHouseCheckbox} />
                    <Checkbox label='Transporte' onChange={handleCarCheckbox} />
                </div>
                <div className='text-[14px] font-bold font-plus-jakarta-sans flex space-x-16 p-4 '>
                    {foodIsChecked && <Input label='Gastos com alimentação' placeholder='Digite um valor' value={foodCost} onChange={handleFoodCostChange} width={'2/6'} color={isBrazilianCurrency(foodCost) ? 'gray-700' : 'red-500'} />}
                    {houseIsChecked && <Input label='Gastos com moradia' placeholder='Digite um valor' value={houseCost} onChange={handleHouseCostChange} width={'2/6'} color={isBrazilianCurrency(bankBalance) ? 'gray-700' : 'red-500'} />}
                    {carIsChecked && <Input label='Gastos com transporte' placeholder='Digite um valor' value={transportCost} onChange={handleTransportCostChange} width={'2/6'} color={isBrazilianCurrency(transportCost) ? 'gray-700' : 'red-500'} />}
                </div>
                <div className="fixed bottom-0 left-0 right-0 flex justify-center mb-4">
                    <button
                        type="submit"
                        className="w-2/6 py-2 bg-[#252525] text-white rounded-md font-bold text-lg hover:bg-black transition-colors flex justify-center items-center"
                        onClick={save}
                    >   
                        {isSaving ? (
                            <div className="mx-auto">
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                            </div>
                        ) : (
                            <div className="mx-auto">Salvar</div>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default FinancialManager;