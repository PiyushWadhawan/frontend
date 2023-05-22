import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/components/hooks/form-hook';
import './PlaceForm.css'
import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/components/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';

const UpdatePlace = () => {

  const { isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const navigate = useNavigate();

  const auth = useContext(AuthContext)

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );
  
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL+`/places/${placeId}`)
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true
            },
            description: {
              value: responseData.place.description,
              isValid: true
            }
          },
          true
        );
      } catch(err) {

      }
    }
    fetchPlace()
  }, [sendRequest, placeId, setFormData])
  
    const placeUpdateSubmitHandler = async event => {
      event.preventDefault();
      try {
        await sendRequest(
          process.env.REACT_APP_BACKEND_URL+`/places/${placeId}`,
          'PATCH',
          JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value
          }),
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token
          }
          )
          navigate('/'+auth.userId+'/places')
      } catch(err) {

      }
    };
  
    if (isLoading) {
      return (
        <div className="center">
          <LoadingSpinner/>
        </div>
      );
    }

    if (!loadedPlace && !error) {
      return (
        <div className="center">
          <Card>
            <h2>Could not find place!</h2>
          </Card>
        </div>
      );
    }
  
  
    return (
      <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace &&
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      }
      </>
    );
  };
  
  export default UpdatePlace;


