
const Input = ({ labelName, value, onChange }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{labelName}</span>
      </div>
      {labelName === "Password" ? (
        <input
          type="password"
          value={value}
          onChange={handleInputChange}
          className="input input-bordered w-full max-w-xs"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          className="input input-bordered w-full max-w-xs"
        />
      )}
    </label>
  );
};


export default Input;
