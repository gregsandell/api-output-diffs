#!/usr/local/bin/node
// console.time('Input files loaded in')
const mockStore = require('../data/mockStore.js').data
const prodStore = require('../data/prodStore.js').data
const { StoreSolver } = require('./storeSolver.js')
// console.timeEnd('Input files loaded in')

const solver = new StoreSolver(mockStore, prodStore)
const output = solver.solve()
console.log(solver.report())
solver.promptForOutput(output).then(() => process.exit(0))
// console.log(JSON.stringify(mockStore))
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
