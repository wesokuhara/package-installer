'use strict'
const assert = require('chai').assert
const PackageInstaller = require('../src/package-installer')
let installer = new PackageInstaller()

describe('Package Installer', () => {
  context('Expected functionality', () => {
    it('should work for small amount of packages ', () => {
      let testInput = ['KittenService: CamelCaser', 'CamelCaser: ']
      let actual = installer.getInstallOrder(testInput)
      let expected = ['CamelCaser', 'KittenService']

      assert.deepEqual(actual, expected, 'Result did not match expected')
    })

    it('should work for larger amount of packages ', () => {
      let testInput = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: Leetmeme','Ice: ']
      let actual = installer.getInstallOrder(testInput)
      let expected = ['KittenService', 'Ice', 'Cyberportal', 'Leetmeme', 'CamelCaser', 'Fraudstream']

      assert.deepEqual(actual, expected, 'Result did not match expected')
    })
  })

  context('Error cases', () => {
    it('should throw an error if there is a cycle in the dependencies', () => {
      let testInput = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: ','Ice: Leetmeme']

      assert.throws(() => {
        installer.getInstallOrder(testInput)
      }, 'ERROR: There exists a cycle in the dependencies.', 'There exists a cycle in the dependencies')
    })

    it('should throw an error if there is a dependency package that does not exist', () => {
      let testInput = ['KittenService: Ghost','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: ','Ice: Leetmeme']

      assert.throws(() => {
        installer.getInstallOrder(testInput)
      }, 'ERROR: No dependency package Ghost exists.', 'A dependency package does not exist')
    })
  })
})
