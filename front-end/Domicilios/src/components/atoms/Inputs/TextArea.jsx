import { Alert } from "../../../index";
import { Textarea } from "@nextui-org/react";


export const TextAreaComponent = ({
                                    // eslint-disable-next-line react/prop-types
  register,
                                    // eslint-disable-next-line react/prop-types
  errors,
                                    // eslint-disable-next-line react/prop-types
  name,
                                    // eslint-disable-next-line react/prop-types
  descripcion,
                                    // eslint-disable-next-line react/prop-types
  label,
                                    // eslint-disable-next-line react/prop-types
    onChange,
                                    // eslint-disable-next-line no-unused-vars,react/prop-types
    max=5000,
  ...props
}) => {



  return (
    <>
      <Textarea
        variant="faded"
        label={label}
        placeholder="Enter your description"
        description={descripcion}
        className=""
          isInvalid={!!errors[name]}
            autoFocus
            /*  eslint-disable-next-line react/prop-types  */
            errorMessage={errors[name]?.message}
        {...register(name, {
          required: {
            value: true,
            message: `${name} es obligatorio`,
          },
           maxLength: {
                value: max,
                message: `${label} ${("excedio_el_maximo_de_caracteres")}`,
              },
              onChange: (e) => {
                if (e.target.value.length <= max) {
                  onChange(e);
                }
              },
        })}
          onChange={onChange}
        /*      ref={ref} */
        {...props}
      />
      {errors[name]?.type === "required" && (
        <Alert descripcion={errors[name].message} />
      )}
    </>
  );
};

TextAreaComponent.displayName = "TextAreaComponent";
