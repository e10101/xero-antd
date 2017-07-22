# Xero Task

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
