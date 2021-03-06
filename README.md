# boilerplate-react

## Contains

- [x] [Webpack 4.x](https://webpack.github.io)
- [x] [React 16.x](https://facebook.github.io/react/)
- [x] [React-router 4.x](https://github.com/ReactTraining/react-router)
- [x] [Babel 6.x](https://babeljs.io/)

## Features

- [x] ES6 Source debugging in Chrome with sourcemaps
- [x] React Router v4
- [x] Redux
- [x] Hot Module Replacement
- [x] Using Redux DevTools Chrome extension

##System Requirements
Before installing the dependencies, make sure your system has the correct Node and Npm versions, otherwise you will get errors.

- Node 6.x.x
- Npm 3.x.x

## Setup

```
$ npm install
```

## Running in dev mode

```
$ npm start
```

## Build and run product mode

```
$ npm run build
$ npm run server:build
$ npm run server:run
```
Create project:

```
$ mkdir react-app && cd react-app
$ npm init
```

Install core:
```
$ npm i -S react react-dom prop-types
```

Install webpack 3, and dependencies
```
$ npm i -D webpack
$ npm i -D autoprefixer postcss-cssnext postcss-import progress-bar-webpack-plugin
$ npm i -D webpack-dev-middleware webpack-hot-middleware
$ npm i -D react-dev-utils
$ npm i -D style-loader css-loader postcss-loader node-sass sass-loader url-loader
```

Install compiler
```
$ npm i -D babel-core babel-loader babel-plugin-transform-class-properties babel-plugin-transform-object-rest-spread
$ npm i -D babel-plugin-transform-regenerator babel-preset-env babel-preset-stage-2
$ npm i -D babel-preset-react-app babel-plugin-transform-runtime babel-plugin-transform-decorators-legacy
```
Create сonfig for bab.babelrc, 

Install material library
```
$ npm i -S material-ui react-tap-event-plugi
```

Install extensions for server
```
$ npm i -S express chalk path open
```

Install redux
```
$ npm i -S redux react-redux redux-thunk redux-immutable-state-invariant 
```

Install react-router
```
$ npm i -S react-router-dom
```