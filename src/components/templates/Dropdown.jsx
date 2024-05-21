import React from 'react'

const Dropdown = ({title,options,handleChange}) => {
  return (
             <div className="h-[60%] p-1 select-dropdown">
	              <select defaultValue="0" onChange={handleChange}>
                    <option value="0" disabled>{title.toUpperCase()}</option>
                    {options.map((option,index)=>( <option key={index}  value={option}>{option.toUpperCase()}</option>))}
	             </select>
            </div>
   
  )
}

export default Dropdown