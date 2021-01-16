index.js
/**
 * Required Modules
 */
const axios = require("axios");


/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.njDmvChecker = async(req, res) => {
  let locationId = req.query.id;
  let idxId = req.query.idx;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  var urlBase = "https://telegov.njportal.com/njmvc/CustomerCreateAppointments/GetAvailableDatesForMonth?duration=30";
  var dateString = '&date=' +yyyy + '-' + mm + '-' + dd + 'T05:00:00.000Z';
  var locationString = "&locationId=" + locationId;
  var appointmentString = "&appointmentId=11";
  var url = urlBase + locationString + appointmentString + dateString;
  // Invoke API.
  console.log("Fetching " + url);
  res.set('Access-Control-Allow-Origin', '*');
  var responsePayload = "";
  axios.get(url)
  .then(function (response) {
    responsePayload = response.data;
  })
  .catch(function (error) {
    responsePayload = [];
  })
  .then(function () {
    res.status(200).send({idx: idxId, id: locationId, resp: responsePayload})
  });
};



package.json

{
  "name": "sample-http",
  "version": "0.0.1",
  "dependencies": {
    "axios": "^0.19.2"
  }
}

