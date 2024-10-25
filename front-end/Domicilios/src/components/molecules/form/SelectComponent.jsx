export const SelectComponent = ({
                                  // eslint-disable-next-line react/prop-types
  options,
                                  // eslint-disable-next-line react/prop-types
  name,
                                  // eslint-disable-next-line react/prop-types
  register,
                                  // eslint-disable-next-line react/prop-types
  placeholder,
                                  // eslint-disable-next-line react/prop-types
  label,
                                  // eslint-disable-next-line react/prop-types
  onChange,
                                  // eslint-disable-next-line react/prop-types
  value = true,
  ...restProps
}) => {
  const props = { ...restProps };
  return (
    <>
      <div className="max-w-sm mx-auto flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {label}
        </label>
        <select
          id={name}
          name={name}
          onChange={onChange}
          {...register(name, {
            required: {
              value: value,
              message: `${name} es requerido`,
            },
          })}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 transition-colors duration-150 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
        >
          <option value="">{placeholder}</option>
          {options.map((item, index) => (
            <option key={index} value={item[props.valueKey]}>
              {item[props.textKey]}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
