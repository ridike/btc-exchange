# Bitcoin exchange app

This small app allows the user to see the currency exchange values real time.
The api is being called every minute in order to update the exchange rate.

Following functionalities are present:

- remove (a) specific currency field
- add the currency back
- see value display formatted based on currency
- see counts of successful API calls
- see error message in case of an unsuccessful API call


## Technical information

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


## Folder Structure

```
btc-exchange/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    ExchangeApp.jsx
    components/
      stateless.jsx
      Form.jsx
    index.css
    index.js
    setupTests.js
    _tests_/
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, or Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.
