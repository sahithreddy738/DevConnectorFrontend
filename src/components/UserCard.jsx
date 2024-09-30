import React from 'react'

const UserCard = ({user}) => {
  return (
    <div className="card bg-base-300 w-80 mx-auto  h-[75%] shadow-xl mt-2">
    <figure>
      <img
        src={user?.photoURL}
        alt="user-photo" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{user?.firstName+" "+user?.lastName}</h2>
      <h2 className="card-title">{ user?.age+","+user?.gender}</h2>
      <p>{user?.about}</p>
      <div className="card-actions justify-center mt-2">
        <button className="btn bg-pink-700">Ignore</button>
        <button className="btn bg-indigo-600">Interested</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard