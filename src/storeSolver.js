const showPerformance = false
const waitForUserInput = require('wait-for-user-input')

class storeSolver {
  constructor (mockStore, prodStore) {
    this.mockStore = mockStore
    this.prodStore = prodStore
    this.stores = []
    this.fields = []
    showPerformance && console.log(`There are ${this.mockStore.length} mock records`)
    showPerformance && console.log(`There are ${this.prodStore.length} prod records`)
    showPerformance && console.time('mockStore sorted in')
    this.mockStore.sort(sortObjA)
    showPerformance && console.timeEnd('mockStore sorted in')
    showPerformance && console.time('prodStore sorted in')
    this.prodStore.sort(sortObjA)
    showPerformance && console.timeEnd('prodStore sorted in')
  }

  solve () {
    let i = 0
    let j = 0
    const mockKeys = {}
    const prodKeys = {}
    let iter = 0
    showPerformance && console.time('solve executed in')
    while (i < this.mockStore.length && j < this.prodStore.length) {
      ++iter
      const mockRecord = this.mockStore[i]
      const prodRecord = this.prodStore[j]
      const mockId = mockRecord.id
      const prodId = prodRecord.id

      // Add to README:  verified there were no cases like 00139 vs 139
      if (mockId === prodId) {
        addAbsentKeys(prodKeys, prodRecord)
        addAbsentKeys(mockKeys, mockRecord)
        i++; j++
      } else if (mockId > prodId) {
        this.stores.push({ storeId: prodId.toString(), missingFrom: 'mock' })
        addAbsentKeys(prodKeys, prodRecord)
        j++
      } else if (prodId > mockId) {
        this.stores.push({ storeId: mockId.toString(), missingFrom: 'prod' })
        addAbsentKeys(mockKeys, mockRecord)
        i++
      }
    }
    showPerformance && console.log(`total iterations:  ${iter}`)
    showPerformance && console.timeEnd('solve executed in')
    this.fields = Object.keys(prodKeys).filter(key => !(key in mockKeys))
    return { stores: this.stores, fields: this.fields }
  }

  report () {
    return [
      `Stores in mock not in Prod: ${this.stores.filter(rec => rec.missingFrom === 'prod').length}`,
      `Stores in prod not in Mock: ${this.stores.filter(rec => rec.missingFrom === 'mock').length}`,
      `Mock attributes not found in Prod: ${this.fields.length}`
    ].join('\n')
  }

  async promptForOutput (output) {
    await waitForUserInput('Type anything to output returned data: ')
    console.log(JSON.stringify(output, null, 2))
  }
}

const addAbsentKeys = (accumulator, record) => {
  Object.keys(record.attributes).forEach(key => {
    if (!(key in accumulator)) {
      accumulator[key] = true // any value will do
    }
  })
}
const getKeysAtAllLevels = (obj) => {
  const outcome = []
  const _worker = (_obj, _outcome) => {
    Object.keys(_obj).forEach(key => {
      if (typeof (_obj[key]) === 'object' && _obj[key] !== null && !Array.isArray(_obj[key])) {
        _outcome.push(key)
        return _worker(_obj[key], _outcome)
      }
      _outcome.push(key)
    })
  }
  _worker(obj, outcome)
  return outcome
}
const input = { wow: 1, foo: 2, sniff: { ha: 2, bear: 2, hoopla: { ungy: 2, bungy: 4 } } }
const output = []
getKeysAtAllLevels(input, output)

const sortObjA = (a, b) => {
  if (a.id < b.id) {
    return -1
  }
  if (a.id > b.id) {
    return 1
  }
  return 0
}
// const findIntersection =
module.exports = {
  StoreSolver: storeSolver
}
