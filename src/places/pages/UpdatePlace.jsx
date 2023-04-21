import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/components/hooks/form-hook';
import './PlaceForm.css'
import Card from '../../shared/components/UIElements/Card';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: "Niagara Falls",
        description: "Famous, towering waterfalls at the boundary of Canada & the United States, with tours & boat rides.",
        imageUrl: "https://media.cntraveler.com/photos/5b311699fe04d40b64b22c9e/16:9/w_2560,c_limit/Niagara-Falls_GettyImages-959566100.jpg",
        address: "Niagara Falls, NY 14303, United States",
        location: {
            lat: 43.0828162,
            lng: -79.0741629
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: "The Algarve",
        description: "Famous for its cliff-backed beaches, mouthwatering seafood and picturesque villages.",
        imageUrl: "https://www.pandotrip.com/wp-content/uploads/2014/05/Caves-in-Algarve-980x551.jpg",
        address: "Farp District, Portugal, Europe",
        location: {
            lat: 37.2454205,
            lng: -8.1952103
        },
        creator: 'u2'
    },
]

const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().placeId;
  
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
  
    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);
  
    useEffect(() => {
      if (identifiedPlace) {
        setFormData(
          {
            title: {
              value: identifiedPlace.title,
              isValid: true
            },
            description: {
              value: identifiedPlace.description,
              isValid: true
            }
          },
          true
        );
      }
      setIsLoading(false);
    }, [setFormData, identifiedPlace]);
  
    const placeUpdateSubmitHandler = event => {
      event.preventDefault();
      console.log(formState.inputs);
    };
  
    if (!identifiedPlace) {
      return (
        <div className="center">
          <Card>
            <h2>Could not find place!</h2>
          </Card>
        </div>
      );
    }
  
    if (isLoading) {
      return (
        <div className="center">
          <h2>Loading...</h2>
        </div>
      );
    }
  
    return (
      <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters)."
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form>
    );
  };
  
  export default UpdatePlace;


