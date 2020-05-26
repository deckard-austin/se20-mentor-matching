// SWR is a fetching package by the creators of Next.js
// It takes care of a lot of the heavy lifting normally involved in fetching data
// For example it can auto refetch the data every 30secs for you, or even every time you switch tabs and come back to the tab your app is open in. It can do a bunch of extra stuff you can read about here: https://swr.now.sh/

// Just npm install swr and them import it into your component/page.
import useSWR from 'swr';

const MyComponent = () => {
  // This is just telling the swr how you want to fetch the data, you should just be able to copy and paste this as is
  const fetcher = (url) => fetch(url).then((r) => r.json());

  // Here we are just pass swr the API route we want to fetch data from, and then the fetcher above
  // This returns four values:
  // data: Whatever has been returned by the fetch request, it's undefined if nothing has been returned yet
  // error: Contains the error object if it encountered one while it was trying to fetch, otherwise is undefined
  // isValidating: A boolean, it will be true if it's currently fetching or false if not
  // mutate: Once you fetch data with swr, it saves it into a cache (like Apollo did in Wes Bos tutorial). This just allows you to edit that cache. You can also attach mutate to a button click or something and it will just auto refetch the data.
  // You can omit any of these if you're not using them eg. const { data } = useSWR("/api/mentors", fetcher);
  const { data, error, isValidating, mutate } = useSWR('/api/mentors', fetcher);

  // If isValidating true, return a loading message
  if (isValidating) return <div>Fetching data...</div>;
  // If an error occured, show an error message
  if (error) return <div>Failed to load.</div>;
  // If there were no mentors found, show a message that says so
  if (data.length === 0) return <div>No mentors found.</div>;
  // Otherwise return a list of mentors and a button to manually refetch the mentors.
  return (
    <div>
      <ul>
        {data.map((mentor) => (
          <li key={mentor.id}>{mentor.fields[Name]}</li>
        ))}
      </ul>
      <button type='button' onClick={mutate}>
        Refresh Data
      </button>
    </div>
  );
};

export default MyComponent;
