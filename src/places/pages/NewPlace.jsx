import React, { useCallback } from 'react'
import './NewPlace.css'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/util/validators'

const NewPlace = () => {

  const titleInputHandler = useCallback((id, value, isValid) => {}, [])    // useCallback used so that titlInputHandler doesn't cause an infinite rendering due to useEffect in Input.jsx 
  
  const descriptionInputHandler = useCallback((id, value, isValid) => {}, [])    // useCallback used so that descriptionInputHandler doesn't cause an infinite rendering due to useEffect in Input.jsx 

  return (
    <form className="place-form">
      <Input 
        id="title"
        element="input" 
        type="text" 
        label="Title" 
        validators={[VALIDATOR_REQUIRE()]} 
        errorText="Please enter a valid title" 
        onInput={titleInputHandler}/>

<Input 
        id="description"
        element="textarea"  
        label="Description" 
        validators={[VALIDATOR_MINLENGTH(5)]} 
        errorText="Minimum 5 words required" 
        onInput={descriptionInputHandler}/>
    </form>
  )
}

export default NewPlace
