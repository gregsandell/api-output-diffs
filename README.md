# Store API Output Diffs

## Statement for LuluLemon
First: I wasn't sure on the exact manner of using *codeSandbox.io* that was expected for the solution.
I wasn't able to get clarification in time, so I made my own
decision to write a Node.js script to run in a terminal. 

Second:  I was a little confused by the requirement:
```javascript
...as well as fields from the mock API that are not
present in the production one.
```

...because the two have a different schema.  They do have a common 
`attributes` element which field which may be compared, but there are zero
fields in *Mock* which aren't also in *Prod*.  So, I wondered if the
problem was really intended to be:
```javascript
...as well as fields from the production API that are not
present in the mock one.
```
...because this gives a non-zero number, this is the requirement 
I chose.

## Instructions
Assumption:  Node.js v.14 is installed, with npm.

2. In terminal:  `nvm use` (assuming you have nvm installed)
3. In terminal:  `npm install`
4. In terminal:  `node src/index.js`.  The script prompts the
user to type input before the final output data is shown.

## Purpose
This script was written as a programming challenge from [luluLemon](http://lululemon.com) in December, 2020.  

The challenge instructions are:
```javascript
/**
 * Find the difference between two store API outputs.
 *
 * searching specifically for the ids of all stores that are not in the other,
 * as well as the fields from the mock API that are not
 * present in the production one.
 *
 * Example return format
 * {
 *   stores: [
 *     { storeId: 'XXXXX', missingFrom: 'prod || mock' },
 *     ...
 *  ],
 *  fields: [ 'field1', 'field2', ... ]
 * }
 *
 */
```
The code for the solution is at the public repo [gregsandell/api-output-diffs](https://github.com/gregsandell/api-output-diffs).

The two data input files in the challenge are in this project 
in the [data](https://github.com/gregsandell/api-output-diffs/tree/master/data) directory.
. 

## Stylistic Preferencess
1. I prefer the 'no semicolons' approach favored by [Standard JS](https://standardjs.com).
