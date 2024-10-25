import React from 'react';
import { 
  Home, 
  ShoppingBag, 
  CreditCard, 
  AlertTriangle, 
  Bell, 
  User, 
  Truck 
} from 'lucide-react';
import MenuButton from './MenuButton';
import { Image } from "@nextui-org/react";

const Sidebar = ({ selectedOption, setSelectedOption }) => {
  const [notifications] = React.useState(3);

  return (
    <aside className="w-64 bg-black/90 text-white h-screen fixed left-0 p-4">
      {/* Contenedor del logo */}
      <div className="mb-8 flex justify-center">
        <div className="h-24 flex items-center justify-center"> {/* Ajusta la altura aquí */}
          <Image
            src="/logotrabajo.jpeg"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Menú de navegación */}
      <nav className="space-y-2 mb-16"> {/* Agrega un margen inferior aquí para espaciar el menú */}
        <MenuButton
          icon={<Home />}
          text="Inicio"
          isSelected={selectedOption === 'home'}
          onClick={() => setSelectedOption('home')}
        />
        <MenuButton
          icon={<Truck />}
          text="Solicitar Domicilio"
          isSelected={selectedOption === 'delivery'}
          onClick={() => setSelectedOption('delivery')}
        />
        <MenuButton
          icon={<ShoppingBag />}
          text="Solicitar Compra"
          isSelected={selectedOption === 'purchase'}
          onClick={() => setSelectedOption('purchase')}
        />
        <MenuButton
          icon={<CreditCard />}
          text="Pagar Facturas"
          isSelected={selectedOption === 'bills'}
          onClick={() => setSelectedOption('bills')}
        />
        <MenuButton
          icon={<AlertTriangle />}
          text="Novedad Urgente"
          isSelected={selectedOption === 'urgent'}
          onClick={() => setSelectedOption('urgent')}
        />
      </nav>
      
      {/* Sección de configuraciones de usuario */}
      <div className="absolute bottom-4 w-52 space-y-2">
        <MenuButton
          icon={<Bell />}
          text={`Notificaciones (${notifications})`}
          isSelected={selectedOption === 'notifications'}
          onClick={() => setSelectedOption('notifications')}
        />
        <MenuButton
          icon={<User />} 
          text="Configuraciones de Usuario" 
          isSelected={selectedOption === 'user-settings'}
          onClick={() => setSelectedOption('user-settings')}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
