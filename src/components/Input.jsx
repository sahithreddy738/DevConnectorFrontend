import PropTypes from 'prop-types';

const Input = ({labelName,value,onChange}) => {
  const handleInputChange=(e)=>{
     onChange(e.target.value);
  }
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{labelName}</span>
      </div>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className="input input-bordered w-full max-w-xs"
      />
    </label>
  );
};

Input.propTypes = {
    labelName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,               
    onChange: PropTypes.func.isRequired
  };


export default Input;

