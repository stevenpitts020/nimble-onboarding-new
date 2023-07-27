
# Nimble Account Request
Home for Nimble Account Request Web application (frontend).

## Local Development Setup

Requires **node.js > 16**

1. Clone this repo and `cd` into it's folder
2. Run `yarn install`
3. Run `yarn start`

The steps above will launch the app locally connecting to the remote development api.

**To run the api locally too:**
1. Setup the API locally following the steps at [nimble-core](https://github.com/nimblefi/nimble-core)
2. Add `REACT_APP_API_URL="https://local.api.url/v1"` to `.env` file
3. Run `yarn start` (changes to .env require restart)

## Using config.js to change Environment Variables

This application loads configs from `/public/config.js`.
On build time, these configurations are copied to the `/public` folder.

To customize your configs in local development, simply edit `/public/config.js` directly or copy one of our premade configs from `/config/{env}.js` to `/public`.

## Mocking API Calls

If you want to run the app with the API mocked. In the file `/public/config.js`, change REACT_APP_MOCK_API_CALLS to true.

This will use the mocks used in the tests so you can navigate to most places.
To edit the mocks, go to the `/src/support/msw/handers.js` file and change accordingly.
We are using the Mock Service Workers library.

Not supported at the moment:
- multiple signers
- mocking response from third party services like BlinkId


## Available Scripts

- `yarn start`
    Runs the app in the development mode.

- `yarn generate`
    Quickly generate a component or a hook. See `plopfile.js`

- `yarn test`
    Launches the test runner in the interactive watch mode.
    More info at https://facebook.github.io/create-react-app/docs/running-tests

- `yarn lint`
    Run tslint fixes.

- `yarn run storybook`
    View and test components in isolation at http://localhost:9009

- `yarn build`
    Builds the app for production to the `build` folder.
    More info at https://facebook.github.io/create-react-app/docs/deployment


---

## Dev Stack

- React (with Create React App)
- Typescript
- React Router (see [Hooks](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/hooks.md) documentation)
- React Testing Library & Jest for testing
- Axios for HTTP Requests
- StoryBook for displaying documentation for UI components. (WIP)
- [Debug](https://github.com/visionmedia/debug) for better solution than console.log.

## File Structure

- Components - React components that are reused through the app. Keep each component in a folder with a test if they have sub-components
- Hooks - Hooks are functions that let you use state and other React features without writing a class.
- Services - Place Classes that handle expensive or business logic in organized files with unit tests. For example, ShuftiService is a class that handles uploading photos, authentication with Shufti API.
- Contexts - Place React [Context Providers](https://reactjs.org/docs/context.html) in this folder, together with reducers.
- Styles - place Style theming in this folder (WIP)
- Types - Types from libraries and interfaces for typescript that are reused in several places.
- Utils - Small Helper functions that get reused in several places in the app. For example, a data format function.
- Plop-Templates - Place all templates for plop generators inside this folder. These are called by plopfile.js in the root folder.

## Styles Structure

- settings - This is where all the global and brand variables stored
- tools - This is where all the mixins and functions housed
- generic - Ground Zero styles like Normalize.css, global box-sizing rules, go here
- elements - bare HTML elements (like H1, A, etc.).
- components - Designed components, chunks of UI, go here
- utilities - This is the only place where !important declarations will be accepted.
- vendor - External css from other libraries (example: bootstrap, a map library, etc)

## Test Configs

See `.env.test` to know which environment variables are used in the app during the test environment.
See the [official docs](https://create-react-app.dev/docs/adding-custom-environment-variables) for more details on how environment variables are loaded.

## Logging

1. Call the Log class

    import { log } from '../../services'

2. Use one of it’s methods, such as log.info(), log.error()

3. This method does however have a couple of drawbacks though. For example, you cannot log both a string and an object/array in the same message. So something like this won’t work:
```javascript
    // The following won't work as expected:
    const loginInfo = {firstName: 'Donald', lastName: 'McDonald'};
    log.info(`login info: ${loginInfo}`, 'App Component');

    // Whereas this will work:
    log.info(loginInfo, 'App Component');
```

You will either need to remove the surrounding string, or use JSON.stringify().

## Using Generators

Currently this project contains 2 generators:

- Functional Components
- Hooks

Run the command and follow the prompts:
```bash
$ yarn generate
```


## Using Storybook

Create a *.stories.tsx file and it will be added to Storybook automatically. You can start the app by running the command:

```bash
$ yarn run storybook
```

You can access the APP on the browser by pointing at:
<http://localhost:9009>

## Running with Docker

To run project using docker (production like) please execute the following steps:
NOTE: Not suitable for development as hot-reloading isn't active.

1. Build the docker image by running from the project root folder
```bash
$ docker build -t nimble-onboarding:dev .
```

Run a docker container mapped to port `8080`
```bash
$ docker run -p 8080:80 nimble-onboarding:dev
```

Open http://localhost:8080

---

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
