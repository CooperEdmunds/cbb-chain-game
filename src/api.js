import ApiCredentialsData from "./api_credentials.json";

const axios = require("axios");

// Instantiate an axios client
const api = axios.create({
  baseURL: `https://api.fantasydata.net/v3/cbb/scores/JSON/Games/`,
  headers: { "Ocp-Apim-Subscription-Key": ApiCredentialsData.api_key }
});

// Generate a graph of all of the teams' scores
makeGraph = function(season, successCallback, errorCallback) {
  api
    .get(season)
    .then(response => {
      let games = response.data;
      console.log(games);
    })
    .catch(error => {
      errorCallback(error);
    });
};

exports.getChains = function(
  season,
  teamOne,
  teamTwo,
  successCallback,
  errorCallback
) {
  makeGraph(
    season,
    graph => {
      // Search the graph
    },
    errorCallback
  );
};
