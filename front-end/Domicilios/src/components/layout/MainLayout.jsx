import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DeliveryForm from '../forms/DeliveryForm';
import PurchaseForm from '../forms/PurchaseForm';
import UrgentForm from '../forms/UrgentForm';
import WelcomeScreen from '../screens/WelcomeScreen';

const MainLayout = () => {
  const [selectedOption, setSelectedOption] = useState('home');

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-r from-black via-white to-black">
      <Sidebar 
        selectedOption={selectedOption} 
        setSelectedOption={setSelectedOption} 
      />
      
      <main className="ml-64 flex-1 p-8">
        {selectedOption === 'delivery' && <DeliveryForm />}
        {selectedOption === 'purchase' && <PurchaseForm />}
        {selectedOption === 'urgent' && <UrgentForm />}
        {selectedOption === 'home' && <WelcomeScreen />}
      </main>
    </div>
  );
};

export default MainLayout;