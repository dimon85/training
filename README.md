# boilerplate-react

## Contains

- [x] [Webpack 2.2](https://webpack.github.io)
- [x] [React 15.x](https://facebook.github.io/react/)
- [x] [Babel 6.x](https://babeljs.io/)

## Features

- [x] Hot Module Replacement
- [x] ES6 Source debugging in Chrome with sourcemaps
- [x] React Router

##System Requirements
Before installing the dependencies, make sure your system has the correct Node and Npm versions, otherwise you will get errors.

- Node 6.x.x
- Npm 3.x.x

## Setup

```
$ npm install
```

## Running

```
$ npm start
```

## Build

```
$ npm run build
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

Install webpack 2, and dependencies
```
$ npm i -D webpack
$ npm i -D autoprefixer postcss-cssnext postcss-import progress-bar-webpack-plugin
$ npm i -D webpack-hot-middleware webpack-dev-middleware
$ npm i -D react-hot-loader@next
```

Install compiler
```
$ npm i -D babel-core babel-loader babel-plugin-transform-class-properties babel-plugin-transform-object-rest-spread
$ npm i -D babel-plugin-transform-regenerator babel-preset-latest babel-preset-stage-2
$ npm i -D babel-preset-react-app babel-plugin-transform-runtime babel-plugin-transform-decorators-legacy
$ npm i -S babel-runtime
```
Create сonfig for bab.babelrc, 

Install material library
```
$ npm i -S material-ui  
```

Install extensions for server
```
$ npm i -S express open path 
```