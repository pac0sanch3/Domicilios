import { Input } from "@nextui-org/react";


// eslint-disable-next-line react/prop-types
export const InputforForm = ({ register, errors, value, name, tipo, onChange, label, maxLength = 120 }) => {
  return (
    <>
      <div className="mb-5">
        <div className=" z-0 w-full">
          <label
            htmlFor={name}
            className=" text-sm text-green-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75  -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 "
          >
            {label}:
          </label>
          <Input
            type={tipo}
            variant="bordered"
            radius="sm"
            name={name}
            id={name}
            label={label}
            isInvalid={errors[name] ? true : false}
            autoFocus
            /*  eslint-disable-next-line react/prop-types  */
            errorMessage={errors[name]?.message}
            autoComplete="off"
            {...register(name, {
              required: {
                value: true,
                message: `${label} ${("es_obligatorio")}`,
              },
              maxLength: {
                value: maxLength,
                message: `${label} ${("no_puede_exceder_60_caracteres")}`,
              },
              onChange: (e) => {
                if (e.target.value.length <= 60) {
                  onChange(e);
                }
              },
            })}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};


