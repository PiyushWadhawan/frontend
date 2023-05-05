import React, { useState, useContext } from 'react'
import './Auth.css'
import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/util/validators'
import { useForm } from '../../shared/components/hooks/form-hook'
import Button from '../../shared/components/FormElements/Button'
import { AuthContext } from '../../shared/context/auth-context'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { useHttpClient } from '../../shared/components/hooks/http-hook'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'

const Auth = () => {

    const auth = useContext(AuthContext)

    const [isLoginMode, setIsLoginMode] = useState(true);

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

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
                name: undefined,
                image: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                },
                image: {
                    value: null,
                    isValid: false
                }
            },
            false
            )
        }

        setIsLoginMode(prevMode => !prevMode)
    }

    const authSubmitHandler = async event => {
        event.preventDefault();

        if(isLoginMode) {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/login', 
                    'POST', 
                    JSON.stringify({                        // stringify converts javascript object to json as backend expects to recieve json data 
                        email: formState.inputs.email.value,      // key-value pair to be sent to backend
                        password: formState.inputs.password.value
                    }),                              // to specify it is a POST request
                    {
                        'Content-Type': 'application/json'        // to tell the backend what type of data it is receiving so body-parser in backend can convert it to regular javascript object 
                    }
                )

                auth.login(responseData.user.id);
            } catch(err) {

            }

        } else {
            try {
                const formData = new FormData();
                formData.append('email', formState.inputs.email.value)
                formData.append('name', formState.inputs.name.value)
                formData.append('password', formState.inputs.password.value)
                formData.append('image', formState.inputs.image.value)
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/signup', 
                    'POST',                              // to specify it is a POST request
                    formData,                            // no need to soecify content type FormData does it automatically by default
                )

                auth.login(responseData.user.id);
            } catch(err) {
                
            }
        }

    }

  return (
    <>
    <ErrorModal error={error} onClear={clearError} />
    <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay/>}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
            {!isLoginMode && <ImageUpload center id="image" onInput={inputHandler} errorText="Please provide an image" />}
            {!isLoginMode && <Input element="input" id="name" type="text" label="Your Name" validators={[VALIDATOR_REQUIRE]} errorText="Please enter a name" onInput={inputHandler} />}
            <Input element="input" id="email" type="email" label="Email" validators={[VALIDATOR_EMAIL()]} errorText="Please enter valid email address" onInput={inputHandler}/>
            <Input element="input" id="password" type="password" label="Password" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Invalid password, minimum 6 characters required" onInput={inputHandler}/>
            <Button type="submit" disabled={!formState.isValid}>
                {isLoginMode ? 'LOGIN' : 'SIGNUP'}
            </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
    </Card>
    </>
  )
}

export default Auth
