// TODO: Connect Airtable API with this to bring in startups dynamically
// TODO: Add styling, startup logos, query params for each mentor/startup
import React from 'react';

const ListOfStartUps = ({ name, description, location, handleChange }) => (
  <div className='startup-list'>
    <div className='each-startup'>
      <h1 className='startup-name'>{name}</h1>
      <p className='startup-location'>{location} </p>
      <h3 className='startup-description'>{description}</h3>
      <label htmlFor=''>Yes</label>
      <input
        type='radio'
        value='yes'
        name='mentor-choice'
        onChange={handleChange}
        className='mentor-choice'
      />
      <label htmlFor=''>No</label>
      <input
        type='radio'
        value='no'
        name='mentor-choice'
        onChange={handleChange}
        className='mentor-choice'
      />
    </div>
  </div>
);

export default ListOfStartUps;
