import { Switch } from "@nextui-org/react";

// eslint-disable-next-line react/prop-types
export const Toggles = ({ onClick, isSelected }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Switch isSelected={isSelected} onValueChange={onClick}></Switch>

      </div>
    </>
  );
};
