// eslint-disable-next-line react/prop-types
export const InputDate = ({ value, onChange, label }) => {
  return (
    <>
      {" "}
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <label htmlFor="">{label}</label>
        <input type="date" value={value} onChange={onChange} />
      </div>
    </>
  );
};
