import React from 'react'
import PlaceList from '../components/PlaceList'
import { useParams } from 'react-router-dom'

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
    const UserPlaces = () => {


    const userId = useParams().userId;

    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)

  return <PlaceList items={loadedPlaces} />
}

export default UserPlaces
