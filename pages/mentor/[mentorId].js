import React from 'react';
import StartupList from '../../components/StartupList';
import STARTUP_DATA from '../../components/StartupData';

// This page maps through each startup
class StartupsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startups: STARTUP_DATA,
      mentorChoice: '',
    };
  }

  handleChange = (e) => {
    this.setState({ mentorChoice: e.target.value });
  };

  render() {
    const { startups, mentorChoice } = this.state;
    console.log({ mentorChoice });
    return (
      <div className='startups-page'>
        <form
          action=''
          onSubmit={async (e) => {
            e.preventDefault();
          }}>
          {startups.map(({ id, handleChange, ...otherProps }) => (
            <StartupList
              key={id}
              {...otherProps}
              handleChange={this.handleChange}
            />
          ))}
          <button type='submit'>Save Choices</button>
        </form>
      </div>
    );
  }
}

export default StartupsPage;
