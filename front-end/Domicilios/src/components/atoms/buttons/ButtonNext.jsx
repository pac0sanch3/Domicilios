import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";

// seguir trabajando con este componente
// url para mas info
// https://nextui.org/docs/components/button

export const ButtonNext = ({
  text,
  type,
  color,
  variant,
  className,
  isIconOnly,
  onClick,
  children,
  startContent,
}) => {
  return (
    <Button
      color={color}
      type={type}
      variant={variant}
      className={className}
      isIconOnly={isIconOnly}
      onClick={onClick}
      startContent={startContent}
    >
      {children} {text}
    </Button>
  );
};

ButtonNext.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  isIconOnly: PropTypes.bool,
  onClick: PropTypes.func,
  startContent: PropTypes.any,
};
