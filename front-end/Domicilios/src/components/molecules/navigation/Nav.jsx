import { Icons, menus, V, useLenguage } from "../../../index";
import { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { Select, SelectItem, Tooltip } from "@nextui-org/react";

// eslint-disable-next-line react/prop-types
export const Nav = ({ rol }) => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(() => {
    const saved = localStorage.getItem("submenuOpen");
    return saved ? JSON.parse(saved) : {};
  });

  const { onChangeTransalate, lenguage } = useLenguage();

  const menuss = useMemo(() => menus(t), [t]);

  const handleSubmenuToggle = (name) => {
    setSubmenuOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSelectionChange = (value) => {
    onChangeTransalate(value.target.value);
  };

  useEffect(() => {
    const storedSubmenuOpen = JSON.parse(localStorage.getItem("submenuOpen"));
    if (storedSubmenuOpen !== null) {
      setSubmenuOpen(storedSubmenuOpen);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("submenuOpen", JSON.stringify(submenuOpen));
  }, [submenuOpen]);

  return (
    <nav className="flex gap-6 w-64  h-screen  border-gray-200">
      <div
        className={`min-h-screen bg-white shadow-md  border-r-4 ${
          open ? "w-full" : "w-20"
        } duration-500 text-black px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <ul className="mt-9 flex flex-col gap-4 relative">
          {menuss?.map(
            (menu, i) =>
              (menu.name !== ("panel_control") || rol === "Administrador") && (
                <li key={i} className="relative">
                  <Link
                    to={menu?.link}
                    className={`${
                      menu?.margin && "mt-96"
                    }  flex border h-12 text-sm gap-3.5 font-medium p-2 items-center    hover:bg-gray-100 rounded-full transition-colors ${
                      V.radius
                    }`}
                    onClick={(e) => {
                      if (menu?.submenu) {
                        e.preventDefault();
                        handleSubmenuToggle(menu.name);
                      }
                    }}
                  >
                    <div className=" rounded-full group-hover:scale-110 transition-transform duration-200">
                      <Icons icon={menu.icon} />
                    </div>
                    <span
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      {menu?.name}
                    </span>
                  </Link>
                  {menu?.submenu && (
                    <div
                      className={`ml-2  mt-2 flex flex-col gap-2 transition-all duration-500 ease-in-out transform ${
                        submenuOpen[menu.name]
                          ? "max-h-40 opacity-100 translate-y-0 pointer-events-auto"
                          : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
                      }`}
                    >
                      {menu?.submenus.map((submenu, j) => (
                        <Link
                          to={submenu?.link}
                          key={j}
                          className={`text-sm font-medium p-2 hover:shadow-md hover:border-l-4 border-l-green-500 transition-all
                          hover:bg-gray-100 rounded-md flex items-center gap-1 ${
                            open ? "" : "border"
                          } overflow-hidden text-ellipsis whitespace-nowrap`}
                        >
                          {open ? (
                            <>
                              <Icons icon={submenu.logo} /> {submenu?.name}
                            </>
                          ) : (
                            <Tooltip content={submenu?.name} color="foreground">
                               {submenu?.name}
                            </Tooltip>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              )
          )}
        </ul>
        <Select
          value={lenguage}
          aria-label="Seleccionar idioma"
          label="Elige un idioma"
          onChange={handleSelectionChange}
          className="max-w-xs pt-20"
          variant="bordered"
          color="primary"
          size="md"
          startContent={<Icons icon={V.GlobeAltIcon} />}
        >
          <SelectItem key="en" value="en">
            Inglés
          </SelectItem>
          <SelectItem key="es" value="es">
            Español
          </SelectItem>
        </Select>
      </div>
    </nav>
  );
};
