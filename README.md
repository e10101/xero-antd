# Xero Task

This project based on React / Express (API) / MongoDB.
## Setup
Because this project is based on MongoDB, you can run `mongod` on `localhost:27017`, OR

Set the `MONGO_URL` environment variables to your MongoDB  database, for example (my mLab):
```
export MONGO_URL=mongodb://user:pass@ds035633.mlab.com:35633/jack
```
run `echo $MONGO_URL` to check your settings:
```
mongodb://user:pass@ds035633.mlab.com:35633/jack
```

## Run
```
yarn install
npm start
```
OR
```
yarn install
yarn start
```

*Please use `yarn install` to install the dependencies, the `npm install` will cause compile problem. still trying to fix this problem.*

Now the front-end should run at [http://localhost:3000/](http://localhost:3000/) and the backend should run at [http://localhost:8000/api/](http://localhost:8000/api/)

## Test
```
npm test
```

## PROBLEM SOLVE PROGRESS

## ESLint
 - http://eslint.org/docs/rules/class-methods-use-this

### .eslintignore
 - http://eslint.org/docs/user-guide/configuring

## Jest
### React testing
 - https://facebook.github.io/jest/docs/en/tutorial-react.html#content
### transform
#### CSS import
 - https://stackoverflow.com/questions/39418555/syntaxerror-with-jest-and-react-and-importing-css-files
 - https://www.npmjs.com/package/jest-css-modules
#### Babel
 - https://github.com/ant-design/ant-design/blob/master/.jest.js
### JSdom missing
```
matchMedia not present, legacy browsers require a polyfill
```
 - https://github.com/jquense/teaspoon/issues/12
 - https://github.com/ant-design/ant-design/blob/master/tests/setup.js
 - https://github.com/ant-design/ant-design/blob/master/.jest.js

### Transform class properties plugin
```
...src/components/FindPeople.js: Unexpected token (25:19)
        23 |     this.newSearch();
        24 |   }
      > 25 |   onAfterChangeAge = (value) => {
           |                    ^
        26 |     const max = value[1];
        27 |     this.setState({
        28 |       ageRange: value,
```
 - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 - https://stackoverflow.com/questions/39495306/arrow-function-is-considered-unexpected-token-in-react-component-using-babel
 - https://babeljs.io/docs/plugins/transform-class-properties/

### npm start
```
Failed to compile.

./~/antd/es/version/index.js
2:15-22 '../../package.json' does not contain an export named 'version'.
```
Run `yarn start` ok, but `npm start` did not work. check the `npm` version 5.3. then reinstall `node`.
 - https://docs.npmjs.com/cli/install
 - https://stackoverflow.com/questions/11177954/how-do-i-completely-uninstall-node-js-and-reinstall-from-beginning-mac-os-x
 - https://docs.npmjs.com/troubleshooting/try-clearing-the-npm-cache
