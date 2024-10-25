import { InputforForm, V, axiosCliente, LayotuInicio } from "../../index";

import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { useState } from "react";


export const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const handleSubmitData = async (data) => {
    const numero_identificacion = data.Documento;
    /*  console.log(numero_identificacion); */
    try {
      setLoading(true);
      const res = await axiosCliente.post("user/recuperar", {
        numero_identificacion,
      });

      if (res) {
        const emailUser = String(res.data["correo_usuario: "]);
        reset();
        setEmail(emailUser);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LayotuInicio>
        <div className="hw-6/12">
          {/*  */}
          <section className="bg-gray-100 flex flex-col h-screen ">
            <div className="px-10 py-6">
              <span className="text-4xl font-bold text-gray-800 mb-4"></span>
              <div className="border-b-8 border-green-600 inline-block w-full"></div>
            </div>

            {/*   <!-- Imagen visible solo en pantallas grandes (1200px y mayores) --> */}

            <div className="w-full  flex items-center justify-center">
              <form
                onSubmit={handleSubmit(handleSubmitData)}
                className="w-full max-w-md flex flex-col gap-5 bg-white p-8 rounded-lg shadow-md"
              >
                <span className="font-semibold text-2xl lg:text-4xl text-custom-green">
                  restablecer_contresena
                </span>
                <span className="text-base lg:text-lg">
                  introduzca_numero_documento
                </span>
                <InputforForm
                  errors={errors}
                  tipo={"number"}
                  register={register}
                  name={"Documento"}
                  label={"numero_documento"}
                />
                <Button
                  type="submit"
                  radius={V.Bradius}
                  isLoading={loading ? true : false}
                  className="text-white bg-blue-600 mt-4"
                >
                  restablecer
                </Button>

                {email && (
                  <div>
                    la nueva contraseña fue enviada al correo:
                    <span className="font-bold">{email}</span>
                  </div>
                )}
              </form>
            </div>
          </section>
        </div>
      </LayotuInicio>
    </>
  );
};
