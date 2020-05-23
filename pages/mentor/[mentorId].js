import React from 'react';
import StartupList from '../../components/StartupList';
import STARTUP_DATA from '../../components/StartupData';

// This page maps through each startup
class StartupsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startups: STARTUP_DATA,
      mentorChoice: null,
    };
  }
  render() {
    const { startups, mentorChoice } = this.state;
    return (
      <div className='startups-page'>
        {startups.map(({ id, ...otherProps }) => (
          <StartupList key={id} {...otherProps} mentorChoice={mentorChoice} />
        ))}
      </div>
    );
  }
}

export default StartupsPage;
