// TODO: Connect Airtable API with this to bring in startups dynamically
// TODO: Add styling, startup logos, query params for each mentor/startup
import React from 'react';

const ListOfStartUps = ({ name, description, location, mentorChoice }) => (
  <div className='startup-list'>
    <form action=''>
      <div className='each-startup'>
        <h1 className='startup-name'>{name}</h1>
        <p className='startup-location'>{location} </p>
        <h3 className='startup-description'>{description}</h3>
        <label htmlFor=''>Yes</label>
        <input
          type='radio'
          name='mentor-choice'
          value='mentorChoice'
          className='mentor-choice'
        />
        <label htmlFor=''>No</label>
        <input
          type='radio'
          name='mentor-choice'
          value='mentorChoice'
          className='mentor-choice'
        />
      </div>
    </form>
    <button>Save Choices</button>
  </div>
);

export default ListOfStartUps;
