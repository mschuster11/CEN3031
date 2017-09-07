'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
var listingData = [];

fs.readFile('listings.json', 'utf8', function(err, data) {
  if(err) throw err;
  // Save the passed JSON data from the file into the global 'listingData' variable for future use.
  listingData = JSON.parse(data);
  for(var i=0;i<listingData.entries.length;i++){
      var currentListing = new Listing({
        code: listingData.entries[i].code,
        name: listingData.entries[i].name,
        coordinates: listingData.entries[i].coordinates,
        address: listingData.entries[i].address
    });
      
    currentListing.save(function(err) {
      if (err) throw err;
      console.log("Listing added")
    });
  }

});

/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */