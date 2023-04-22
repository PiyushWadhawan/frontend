import React, { useState, useContext } from 'react'
import './Auth.css'
import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/util/validators'
import { useForm } from '../../shared/components/hooks/form-hook'
import Button from '../../shared/components/FormElements/Button'
import { AuthContext } from '../../shared/context/auth-context'

const Auth = () => {

    const auth = useContext(AuthContext)

    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    },
    false
    )

    const switchModeHandler = () => {

        if(!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            },
            false
            )
        }

        setIsLoginMode(prevMode => !prevMode)
    }

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    }

  return (
    <Card className="authentication">
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
            {!isLoginMode && <Input element="input" id="name" type="text" label="Your Name" validators={[VALIDATOR_REQUIRE]} errorText="Please enter a name" onInput={inputHandler} />}
            <Input element="input" id="email" type="email" label="Email" validators={[VALIDATOR_EMAIL()]} errorText="Please enter valid email address" onInput={inputHandler}/>
            <Input element="input" id="password" type="password" label="Password" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Invalid password, minimum 5 characters required" onInput={inputHandler}/>
            <Button type="submit" disabled={!formState.isValid}>
                {isLoginMode ? 'LOGIN' : 'SIGNUP'}
            </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
    </Card>
  )
}

export default Auth
