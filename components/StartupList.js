// TODO: Connect Airtable API with this to bring in startups dynamically
// After taking in the name, pic, desciption, we can probably style with tailwind easily I think?
// Learning the Airtable API, so using madeup dummy data
import React from 'react';
import Header from './Header';
import STARTUP_DATA from './StartupData';

class ListOfStatups extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startups: STARTUP_DATA,
    };
  }
  render() {
    const { startups } = this.state;
    return (
      <div>
        {startups.map(({ id, ...otherProps }) => (
          <div key={id} {...otherProps}>
            Startup Name Here
          </div>
        ))}
      </div>
    );
  }
}

export default ListOfStatups;
