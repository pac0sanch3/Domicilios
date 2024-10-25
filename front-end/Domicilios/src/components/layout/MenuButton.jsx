import React from 'react';

const MenuButton = ({ icon, text, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isSelected 
          ? 'bg-white text-black' 
          : 'text-white hover:bg-white/10'
      }`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default MenuButton;