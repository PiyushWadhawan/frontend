import React, { useContext } from 'react'
import './PlaceForm.css'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/util/validators'
import { useForm } from '../../shared/components/hooks/form-hook'
import Button from '../../shared/components/FormElements/Button'
import { useHttpClient } from '../../shared/components/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useNavigate } from 'react-router-dom'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'

const NewPlace = () => {

  const auth = useContext(AuthContext)

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const navigate = useNavigate();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData()
      formData.append('title', formState.inputs.title.value)
      formData.append('description', formState.inputs.description.value)
      formData.append('address', formState.inputs.address.value)
      formData.append('creator', auth.userId)
      formData.append('image', formState.inputs.image.value)
      await sendRequest(
        'http://localhost:5000/api/places', 
        'POST',
        formData,
        {
          Authorization: 'Bearer ' + auth.token
        }
        )
        navigate('/'+auth.userId+'/places');

    } catch(err) {

    }
  };

  return (
    <>
    <ErrorModal error={error} onClear={clearError} />
    <form className="place-form" onSubmit={placeSubmitHandler}>
      {isLoading && <LoadingSpinner asOverlay />}
      <ImageUpload center id="image" img_size="img_size" onInput={inputHandler} errorText="Please provide an image" />
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
    </>
  );
};

export default NewPlace;
