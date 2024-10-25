import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

export const DropDown = ({ DropdownTriggerElement, dropdown, onClick }) => {
  return (
    <>
      <Dropdown radius="sm">
        <DropdownTrigger className="cursor-pointer">
          {DropdownTriggerElement}
        </DropdownTrigger>
        <DropdownMenu variant="flat" className="p-7">
          {dropdown.map((item, index) => (
            <DropdownItem
              key={index}
              textValue={`item ${index}`}
              onClick={onClick}
              className="cursor-pointer flex text-center"
            >
              {item}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

DropDown.propTypes = {
  children: PropTypes.any,
  DropdownTriggerElement: PropTypes.any.isRequired,
  dropdown: PropTypes.any,
  onClick: PropTypes.func,
};
