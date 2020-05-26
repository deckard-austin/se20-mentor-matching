// Example GET list of Mentors route
// Eg. .../api/mentors

// Import the Airtable package, you'll need to install this with NPM first.
const Airtable = require("airtable");

// Create a connection with Airtable, you'll need to replace the AIRTABLE_API_KEY and AIRTABLE_BASE_ID with the actual values
// A good practice would be to store the keys in your .env file though and reference them here with process.env.AIRTABLE_BASE_ID instead though
const base = new Airtable({ apiKey: "AIRTABLE_API_KEY" }).base(
  "AIRTABLE_BASE_ID"
);

// This is the actual API route code
// req stores all the details about the incoming request to the route. Eg. query parameters (req.query.example), form submission data (req.body.example), etc.
// res just has some helper functions attached to it to help us simply return the data back to our front-end client
export default (req, res) => {
  // This makes sure it's a GET request, if they send a POST/PATCH/PUT/DELETE request, we can send them an error message saying that's not allowed on this route.
  // If you need to accept multiple request types on this route you could use "else if (req.method === 'POST')" as well, or you could just use a Javascript switch statement instead.
  if (req.method === "GET") {
    // We use the "base" const set above and pass the table name we're looking for (eg. Mentors)
    // The all() function actually isn't well documented in the Airtable docs. You would have read in the docs that when retrieving records, it grabs a max of 100 at once, then you have to iterate this multiple times to get the all. This function just automatically takes care of all of that.
    // I've converted this to use promises instead of callbacks as it's much simpler to read.

    // To convert to promises this first part remains the same.
    base("Mentors")
      .select()
      .all()
      // Then this is just saying, once the above lookup is done, "then" do this
      .then((records) => {
        // records is just an array of objects, we simply use these res functions I mentioned above to return the data
        // We set the status to 200 (meaning everything worked) and return records inside the .json function
        res.status(200).json(records);
      })
      // If anything went wrong with the Airtable lookup, this section with "catch" the error and do something with it
      .catch((error) => {
        // We just set the status of the response to the error code, then return the error so we can display it on the front-end.
        res.status(error.status || 500).json(error);
      });
  } else {
    // If someone tries to send any type of request other than GET (eg.POST/PATCH/PUT/DELETE) to this route, we'll return a 405 error with a message.
    res.status(405).json({
      message: `The ${req.method} request method is not allowed on this route.`,
    });
  }
};

// And here is the above route code with all the comments removed, pretty short and simple
const Airtable = require("airtable");
const base = new Airtable({ apiKey: "AIRTABLE_API_KEY" }).base(
  "AIRTABLE_BASE_ID"
);

export default (req, res) => {
  if (req.method === "GET") {
    base("Mentors")
      .select()
      .all()
      .then((records) => {
        res.status(200).json(records);
      })
      .catch((error) => {
        res.status(error.status || 500).json(error);
      });
  } else {
    res.status(405).json({
      message: `The ${req.method} request method is not allowed on this route.`,
    });
  }
};

// If you're only wanting a subset of filtered mentors then you can pass some options into the .select() function
// Lets say the API route we used is /api/mentors?startup=rec087gd09f7gfdg and we're grabbing a mentor from this table: https://airtable.com/tblcWp1nCB3KMw2AM/viwvWNh39XoNcOGyu
// This isn't exactly how the final database would be structured but is just an example of how you can do a basic filter on a column
export default (req, res) => {

  // We can grab the startup's id from the URL like this
  const startupID = req.query.startup;

  // We can create an options object for the query
  const airtableOptions = {
    // We'll sort all results alphabetically by the 'Name' column in Airtable
    sort =[{ field: "Name", direction: "desc" }],
    // We'll only return mentors whose "Startup" column value matches startupID
    // The format of this formula is the same as if you were creating a formula column in Airtable.
    // So if you made a column with the formula IF(StartupFilterExample="rec087gd09f7gfdg", TRUE(), FALSE()), whichever records returned TRUE would be returned
    filterByFormula = `StartupFilterExample="${startupID}"`,
    }

  if (req.method === "GET") {
    base("Mentors")
      // pass in the airtableOptions to the select() function
      .select(airtableOptions)
      .all()
      .then((records) => {
        res.status(200).json(records);
      })
      .catch((error) => {
        res.status(error.status || 500).json(error);
      });
  } else {
    res.status(405).json({
      message: `The ${req.method} request method is not allowed on this route.`,
    });
  }
};
