'use strict'
const api_key = 'lwZqrB6guiPjukdb9m7e5fCLEE4szy6AGxxFzD9A';

// Fetches the data from the url and converts for json usage
function getObject(url) {
    fetch(url)
      .then(response => response.json())
      .then(responseJson => 
        showParks(responseJson))
      .catch(error => alert("That wasn't supposed to happen. Try again."));
  }

function showParks(responseJson) {
    let parkResults = '';
    // Updates parkResults to display all results and desired data
    for(let i = 0; i < responseJson.data.length; i++){
        parkResults += `<section class="parkSec">
                            <h3>${responseJson.data[i].fullName}</h3>
                            <p>${responseJson.data[i].description}</p>
                            <p><a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url}</a></p><br>
                            <h4>How do I get there?</h4>
                            <p>${responseJson.data[i].directionsInfo}</p>
                            <p><a href="${responseJson.data[i].directionsUrl}" target="_blank">${responseJson.data[i].directionsUrl}</a></p><br>
                            <h4>What's the weather like?</h4>
                            <p>${responseJson.data[i].weatherInfo}</p>
                        </section>
                        `;
    };    
    // Replaces the existing HTML with search results
    $('.results-sec').replaceWith(
      `<div class="results-sec">
      <h2>Park Results: ${responseJson.data.length}</h2>
        ${parkResults}
      </div>`
    )
    // Unhides the results section
    $('.results').removeClass('hidden'); 
}

// Creates the url for the API based on the user's selection
function formEvent() {
    $('#parkForm').submit(event => {
      event.preventDefault();
      let parkURL = 'https://developer.nps.gov/api/v1/parks?stateCode=' + $( "#stateCode" ).val() + '&limit=' + $( "#quantity" ).val() + '&api_key=' + api_key;
      getObject(parkURL);
    });
  }

// Runs at the start of the page
$(function() {
    console.log('Loaded');
    formEvent();
  });