import React from 'react'
import UsersList from '../components/UsersList'

const Users = () => {

  const USERS = [
    {
      id: 'u1',
      name: 'Luna Pierce',
      image: 'https://i.insider.com/59b6c4bfba785e36f932a317?width=1000&format=jpeg&auto=webp',
      places: '3',
    },
    {
      id: 'u2',
      name: 'Jack Finnegan',
      image: 'https://us.123rf.com/450wm/fizkes/fizkes2007/fizkes200701793/152407909-profile-picture-of-smiling-young-caucasian-man-in-glasses-show-optimism-positive-and-motivation-head.jpg?ver=6',
      places: '2',
    },
  ]

  return (
    <UsersList items={USERS}/>
  )
}

export default Users
