// app.js
//BEGIN COPYRIGHT
//*************************************************************************
//
// IBM Confidential
// OCO Source Materials
// 5725-N02
// (C) Copyright IBM Corporation 2015.
// The source code for this program is not published or otherwise
// divested of its trade secrets, irrespective of what has been
// deposited with the U.S. Copyright Office.
//
//*************************************************************************
//END COPYRIGHT

var express = require('express');
var request = require('request');
var cfenv = require('cfenv');

var app = express();
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
var weather_host = appEnv.services["weatherinsights"] 
        ? appEnv.services["weatherinsights"][0].credentials.url // Insights for Weather credentials passed in
        : ""; // or copy your credentials url here for standalone

function weatherAPI(path, qs, done) {
    var url = weather_host + path;
    console.log(url, qs);
    request({
        url: url,
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        },
        qs: qs
    }, function(err, req, data) {
        if (err) {
            done(err);
        } else {
            if (req.statusCode >= 200 && req.statusCode < 400) {
                try {
                    done(null, JSON.parse(data));
                } catch(e) {
                    console.log(e);
                    done(e);
                }
            } else {
                console.log(err);
                done({ message: req.statusCode, data: data });
            }
        }
    });
}

app.get('/api/forecast/daily', function(req, res) {
    weatherAPI("/api/weather/v2/forecast/daily/10day", {
        geocode: req.query.geocode || "34.53,84.50",
        units: req.query.units || "m",
        language: req.query.language || "en"
    }, function(err, result) {
        if (err) {
            res.send(err).status(400);
        } else {
            res.json(result);
        }
    });
});

app.get('/api/forecast/hourly', function(req, res) {
    weatherAPI("/api/weather/v2/forecast/hourly/24hour", {
        geocode: req.query.geocode || "45.42,-75.68",
        units: req.query.units || "m",
        language: req.query.language || "en"
    }, function(err, result) {
        if (err) {
            res.send(err).status(400);
        } else {
            res.json(result);
        }
    });
});

app.listen(appEnv.port, appEnv.bind, function() {
  console.log("server starting on " + appEnv.url);
});

