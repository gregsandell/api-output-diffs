#!/usr/local/bin/node

const mockStore = require('../data/mockStore.js').data
const prodStore = require('../data/prodStore.js').data
const { StoreSolver } = require('./storeSolver.js')

const solver = new StoreSolver(mockStore, prodStore)
const output = solver.solve()
console.log(solver.report())
solver.promptForOutput(output).then(() => process.exit(0))
