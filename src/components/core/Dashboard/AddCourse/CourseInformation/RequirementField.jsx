import React, { useEffect, useState } from 'react'

const RequirementField = ({
    name,
    label,
    register,
    setValue,
    getValue,
    errors
}) => {

    const [requirement , setRequirement] = useState("")
    const [requirementList , setRequirementList] = useState([]);

    //register on first render 
    useEffect(() => {
        register(name , {
            required:true,
            validate: (value) => value.length >0
        })
    },[])

    //have to check
    useEffect(() => {
        setValue(name , requirementList)
    }, [requirementList])

    const addRequirementHandler  = () => {
        if(requirement){
            setRequirementList([...requirementList , requirement])
            setRequirement("");
        }
    }

    const removeRequirementHandler  = (index) => {
        const updateRequirementList = [...requirementList];
        updateRequirementList.splice(index ,1);
        setRequirementList(updateRequirementList);
    }

  return (
    <div>
        <label>
            {label} <sup>*</sup>
            <input
                type='text'
                name={name}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className='w-full'
            />
            <button
                type='button'
                onClick={addRequirementHandler}
                className='font-semibold text-yellow-50'
            >
                Add
            </button>
        </label>

        {
            requirementList.length > 0 && (
                <ul>
                    {
                        requirementList.map((requirement , index) => {
                            return (
                                <li key={index} className='flex items-center gap-x-2'>
                                    <span>{requirement}</span>
                                    <button
                                        type='button'
                                        onClick={() => removeRequirementHandler(index)}
                                        className='text-xs text-pure-greys-300'
                                    >
                                        remove
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
            ) 
        }
        {
            errors[name] && (<span>
                    {label} is required
                </span>)
                
            }
        
    </div>
  )
}

export default RequirementField