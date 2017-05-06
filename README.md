# Weather Company Data for IBM Bluemix demo app
A demo app that uses Weather Company Data for IBM Bluemix.

# Overview

The Weather Company Data demo app uses your current location (or a location that you select from the drop-down list) 
to display the current weather conditions, the 24-hour forecast, and the 10-day forecast, using the Weather Company weather data.

This app demonstrates how quickly you can build an app on Bluemix using the Weather Company Data service.

## Application Requirements
You can use this app in any browser.

## Run the app on Bluemix
You can deploy your own instance of Weather Company Data demo app to Bluemix. 
To do this, you can either use the _Deploy to Bluemix_ button for an automated deployment or follow the steps below to create and deploy your app manually.

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy)

1. Create a Bluemix Account.

    [Sign up][bluemix_signup_url] for Bluemix, or use an existing account.

2. Download and install the [Cloud-foundry CLI][cloud_foundry_url] tool.

3. Clone the app to your local environment from your terminal using the following command:

  ```
  git clone https://github.com/IBM-Bluemix/weather-company-data-demo.git
  ```

4. `cd` into this newly created directory.

5. Edit the `manifest.yml` file and change the `<name>` and `<host>` to something unique.

  ```
applications:
- disk_quota: 1024M
  name: weather-company-data-demo
  host: weather-company-data-demo
  command: node app.js
  path: .
  domain: mybluemix.net
  instances: 1
  memory: 512M
  ```
  The host you use will determinate your application URL initially, for example, `<host>.mybluemix.net`.

6. Connect to Bluemix in the command line tool and follow the prompts to log in:

  ```
  $ cf api https://api.ng.bluemix.net
  $ cf login
  ```

7. Create the Weather Company Data service in Bluemix. **Note**: You might need to target a space by selecting a space or by using the `cf target -s SPACE` command.

  ```
  $ cf create-service weatherinsights Free-v2 weathercompanydata-service
  ```

8. Push the service to Bluemix. You need to perform additional steps when it is deployed, so you must add the option --no-start argument.

  ```
  $ cf push --no-start
  ```
  
9. Now, bind the service to your app. **Note**: The name *weather-company-data-demo* must be updated to reflect the name that you chose in step 5.

  ```
  $ cf bind-service weather-company-data-demo weathercompanydata-service
  ```

10. Finally, start your app. You can also do this from the Bluemix dashboard. **Note**: The name *weather-company-data-demo* must be updated to reflect the name that you chose in step 5.

  ```
  $ cf start weather-company-data-demo
  ```

Congratulations! You now have your very own instance of the Weather Company Data demo app running on Bluemix. Try it out at `https://<host>.mybluemix.net`, where `host` is the value that you set in your `manifest.yml` file.

## Run the app locally
1. Create a Bluemix Account. You will need this account to create a Weather Company Data service and grab the credentials later on.

    [Sign up][bluemix_signup_url] in Bluemix, or use an existing account.

2. If don't have node.js already, [download node.js][download_node_url] and install it on your local machine.

3. Clone the app to your local environment from your terminal using the following command:

  ```
  git clone https://github.com/IBM-Bluemix/weather-company-data-demo.git
  ```

4. `cd` into this newly created directory.

5. Install the required npm and bower packages using the following command:

  ```
  npm install
  ```

6. Start your app locally with the following command:

  ```
  node app
  ```

Your app will be automatically assigned to a port that will be logged to your terminal. For example, you might see the following:
  ```
  server starting on http://localhost:6001
   ```

To access the app,  you need to bind manually by copying the URL from the credentials into your app.js file. Now, go to localhost:PORT in your browser (for example, PORT is 6001 in the example above).

## API documentation
The Weather Company Data demo app uses REST APIs to retrieve historical and real-time weather data from The Weather Company. 
You can try out the [REST APIs](https://twcservice.mybluemix.net/rest-api/) to get started with your own app. 

## Contribute
We are happy to accept external contributions to this project, either in the form of issues or pull requests. 
If you find a bug, please report it using the [Issues section](https://github.com/IBM-Bluemix/weather-company-data-demo/issues) or even better, fork the project and submit a pull request with your fix! 
Pull requests will be evaluated on an individual basis based on value added to the sample application.

## Troubleshooting

The primary source of debugging information for your Bluemix app is the logs. To see them, run the following command using the Cloud Foundry CLI:

  ```
  $ cf logs <application-name> --recent
  ```
For more detailed information on troubleshooting your application, see the [Troubleshooting section](https://www.ng.bluemix.net/docs/troubleshoot/tr.html) in the Bluemix documentation.

## Privacy Notice

The Weather Company Data demo app includes code to track deployments to Bluemix and other Cloud Foundry platforms. 
The following information is sent to a [Deployment Tracker](https://github.com/cloudant-labs/deployment-tracker) service on each deployment:

* Application Name (application_name)
* Space ID (space_id)
* Application Version (application_version)
* Application URIs (application_uris)

This data is collected from the VCAP_APPLICATION environment variable in IBM Bluemix and other Cloud Foundry platforms. 
This data is used by IBM to track metrics around deployments of sample applications to IBM Bluemix. 
Only deployments of sample applications that include code to ping the Deployment Tracker service will be tracked.

### Disabling Deployment Tracking

Deployment tracking can be disabled by removing `require("cf-deployment-tracker-client").track();` from the beginning of the `app.js` main server file.

### Useful links
[IBM Bluemix](https://bluemix.net/)  
[IBM  Bluemix Documentation](https://www.ng.bluemix.net/docs/)  
[IBM Bluemix Developers Community](http://developer.ibm.com/bluemix)

[bluemix_signup_url]: https://console.ng.bluemix.net/registration/
[cloud_foundry_url]: https://github.com/cloudfoundry/cli
[download_node_url]: https://nodejs.org/download/
