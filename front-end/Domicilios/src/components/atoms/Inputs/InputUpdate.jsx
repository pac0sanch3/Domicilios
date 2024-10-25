import React from "react";
import { Input } from "@nextui-org/react";

export const InputUpdate = React.forwardRef(
  (
    {
      errors,
      value,
      name,
      label,
      tipo,
      onChange,
      isUpdating = false,
      isDisabled = false,
      ...props
    },
    ref
  ) => {
    const handleValidation = () => {
      if (isUpdating && !value) {
        return `${label} es obligatorio`;
      }
      return errors[name]?.message;
    };

    return (
      <div className="z-0 w-full mb-5">
        <label
          className="mb-3 block text-green-500 dark:text-gray-400text-sm font-medium "
          htmlFor="fullName"
        >
          {label}
        </label>
        <Input
          type={tipo}
          variant="bordered"
          isDisabled={isDisabled}
          name={name}
          id={name}
          label={label}
          isInvalid={Boolean(handleValidation())}
          autoFocus
          errorMessage={handleValidation()}
          autoComplete="off"
          value={isUpdating ? value : undefined}
          onChange={isUpdating ? onChange : undefined}
          {...props}
        />
      </div>
    );
  }
);

InputUpdate.displayName = "InputUpdate";
