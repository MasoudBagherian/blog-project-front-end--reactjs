import React from 'react';
import Welcome from '../../../components/Welcome/Welcome';
import Main from './../../../hoc/Main';
import ProfileCard from './ProfileCard/ProfileCard';
import { BiPlusMedical as PlusIcon } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const ProfilePage = (props) => {
  const pathname = props.location.pathname;
  return (
    <Main>
      <Welcome />
      <ProfileCard />
      <Link to={`${pathname}/add-article`} className="add-btn">
        <PlusIcon className="icon-plus" />
      </Link>
    </Main>
  );
};

export default ProfilePage;
