
const InputCom = ({ value, onChange }) => {
  return (
    <input
      type="text"
      id="fullName"
      name="fullName"
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 text-black"
      placeholder="Michael Jaramillo"
      required
    />
  )
}

export default InputCom
