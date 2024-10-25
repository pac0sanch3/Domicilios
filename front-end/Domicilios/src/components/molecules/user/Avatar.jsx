import { useAuth, Icons } from "../../../index";
import { DropDown } from "../navigation/Dropdown";
import { User } from "@nextui-org/react";
import { Link } from "react-router-dom";


import {
  UserCircleIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export const AvatarCom = () => {
  const { logout, user, loading } = useAuth();

  const ItemsDrop = [
    <>
      <p className="font-bold">{`${user.us_nombre} ${user.us_apellidos}`}</p>
      <p className="font-bold">{user.us_correo}</p>
    </>,
    <>
      <Link to={"/perfil"} className="flex gap-4">
        <Icons icon={UserCircleIcon} /> <p>{("administrar_perfil_usuario")}</p>
      </Link>
    </>,
    <>
      <Link to={"/ayuda"} className="flex gap-4">
        <Icons icon={QuestionMarkCircleIcon} />{" "}
        <p>
          {t("ayuda")} & {t("retroalimentacion")}
        </p>
      </Link>
    </>,
    <>
      <div className="flex gap-4" onClick={logout}>
        <Icons icon={ArrowRightOnRectangleIcon} />
        <p> {("salir")}</p>
      </div>
    </>,
  ];

  return (
    <>
      <DropDown
        DropdownTriggerElement={
          <User
            className="cursor-pointer font-bold"
            avatarProps={{
              isBordered: true,
            }}
            name={
              loading ? ("loading") : `${user.us_nombre} ${user.us_apellidos}`
            }
          />
        }
        dropdown={ItemsDrop}
      />
    </>
  );
};
