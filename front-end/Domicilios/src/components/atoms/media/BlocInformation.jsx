// eslint-disable-next-line react/prop-types
export const BlocInformation = ({titulo, contenido})=> {
  return (
    <>
        <div className="  p-2 rounded-lg text-zinc-700 " >
            <p className=" mb-1 font-medium text-gray-700 "> {titulo} :</p>
            <p>{contenido}</p>
        </div>
    </>
  )
}
