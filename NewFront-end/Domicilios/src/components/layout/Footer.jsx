


export const Footer = () => {



  let hoy = new Date();
  let ahora = hoy.toLocaleDateString();
  const ID = "2669959";
  const Domicilios = "Domicilios";
  return (
    <>
      <footer className="bg-gradient-to-r from-green-500 to-green-700 text-white mt-10 shadow">
        <div className="max-w-screen-xl mx-auto p-6 flex flex-col items-center">
          <span className="text-3xl font-bold mb-2">{Domicilios}</span>
          <p className="text-xl italic mb-4 text-center">
            escuche que te gustan los chicos y las chicas, pues yo soy un chico y la tengo chica *la seduce*
          </p>
          <hr className="w-full border-green-400 my-4 opacity-30" />
          <div className="flex flex-col items-center">
            <span className="text-sm">
              © {ahora} {Domicilios}™
            </span>
            <span className="text-sm mt-2">ID: {ID}</span>
          </div>
        </div>
      </footer>
    </>
  );
};
