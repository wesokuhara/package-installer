'use strict'
var Package = require('./package')

class PackageInstaller {
  constructor() {
    this.initialize()
  }

  initialize() {
    this.packages = {}
    this.installOrder = []
    this.containsCycle = false
  }

  getInstallOrder(relationships) {
    this.initialize()
    this.buildPackages(relationships)
    this.dfs()

    if (this.containsCycle) {
      throw "ERROR: There exists a cycle in the dependencies."
    }

    return this.installOrder
  }

  buildPackages(relationships) {
    for (let i = 0; i < relationships.length; i ++) {
      let relationArray = relationships[i].split(':')
      let packageName = relationArray[0].trim()
      let dependencyName = relationArray[1].trim()
      let currentPackage = new Package(packageName, dependencyName)

      this.packages[packageName] = currentPackage
    }
  }

  dfs() {
    for (let packageName in this.packages) {
      let currentPackage = this.packages[packageName]

      if (!currentPackage.visited) {
        this.explore(currentPackage)
      }
    }
  }

  explore(currentPackage) {
    currentPackage.visited = true

    let packageName = currentPackage.name
    let dependencyName = currentPackage.dependencyName

    if (dependencyName) {
      let dependency = this.packages[dependencyName]

      if (!dependency) {
        throw `ERROR: No dependency package ${dependencyName} exists.`
      }

      if (!dependency.visited) {
        this.explore(dependency)
      }

      else if (!dependency.done) {
        this.containsCycle = true
      }
    }

    currentPackage.done = true
    this.installOrder.push(packageName)
  }
}

module.exports = PackageInstaller
