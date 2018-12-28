const axios = require("axios");

// Instantiate an axios client
const api = axios.create({
  baseURL: `https://cors-anywhere.herokuapp.com/https://cbb-chain-game-api.herokuapp.com/`
});

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

exports.getWins = function(team, successCallback, errorCallback) {
  api
    .get("wins", { params: { team: team } })
    .then(teams => {
      successCallback(teams.data);
    })
    .catch(error => {
      errorCallback(error);
    });
};

exports.getChains = function(
  teamA,
  teamB,
  excludedTeams,
  successCallback,
  errorCallback
) {
  api
    .get("chains", {
      params: {
        teamA: teamA,
        teamB: teamB,
        excludedTeams: JSON.stringify(excludedTeams)
      }
    })
    .then(chains => {
      successCallback(chains.data);
    })
    .catch(error => {
      errorCallback(error);
    });
};
