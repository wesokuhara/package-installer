class Package {
  constructor(name, dependencyName) {
    this.name = name;
    this.dependencyName = dependencyName;
    this.visited = false;
    this.done = false;
  }
}

module.exports = Package;
