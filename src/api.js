const axios = require("axios");

// Instantiate an axios client
const api = axios.create({
  baseURL: `https://api.com`
});

exports.getChains = function(
  season,
  teamOne,
  teamTwo,
  successCallback,
  errorCallback
) {};

exports.getTeams = function(successCallback, errorCallback) {
  api
    .get("teams")
    .then(teams => {
      successCallback(teams.data);
    })
    .catch(error => {
      errorCallback(error);
    });
};
