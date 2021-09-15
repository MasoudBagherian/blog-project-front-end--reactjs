import React from 'react';

import UserCard from './UserCard/UserCard';

const UserList = (props) => {
  return (
    <div className="user-cards">
      {props.users.map((user) => (
        <UserCard
          key={user.id}
          avatar={user.avatar}
          username={user.username}
          firstname={user.firstname}
          lastname={user.lastname}
          email={user.email}
          date={user.date}
          id={user.id}
        />
      ))}
    </div>
  );
};

export default UserList;
