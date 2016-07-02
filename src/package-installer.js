var Package = require('./package')

var PackageInstaller = function() {
  this.packages = {};
  this.installOrder = [];
  this.containsCycle = false;

  // Get the ordered array of packages to install
  this.getInstallOrder = function(relationships) {
    this.reset();
    this.buildPackages(relationships);
    this.dfs();

    if (this.containsCycle) {
      throw "ERROR: There exists a cycle in the dependencies.";
    }

    return this.installOrder;
  }

  // Reset fields of the Package Installer
  this.reset = function() {
    this.packages = {};
    this.installOrder = [];
    this.containsCycle = false;
  }

  // Populate the packages field with the relationship
  // between the package and its dependency
  this.buildPackages = function(relationships) {
    for (var i = 0; i < relationships.length; i ++) {
      var relationArray = relationships[i].split(':');
      var packageName = relationArray[0].trim();
      var dependencyName = relationArray[1].trim();

      var currentPackage = new Package();
      currentPackage.name = packageName;

      if (dependencyName !== '') {
        currentPackage.dependencyName = dependencyName;
      }

      this.packages[packageName] = currentPackage;
    }
  }

  // Depth First Search applying Topological storing
  this.dfs = function() {
    for (var packageName in this.packages) {
      var currentPackage = this.packages[packageName];

      if (!currentPackage.visited) {
        this.explore(currentPackage);
      }
    }
  }

  // Explore a package's dependency tree
  this.explore = function(currentPackage) {
    currentPackage.visited = true;

    var packageName = currentPackage.name;
    var dependencyName = currentPackage.dependencyName;

    if (dependencyName) {
      var dependency = this.packages[dependencyName];

      if (!dependency) {
        throw 'ERROR: No dependency package ' + dependencyName + ' exists.';
      }

      if (!dependency.visited) {
        this.explore(dependency);
      }

      else if (!dependency.done) {
        this.containsCycle = true;
      }
    }

    currentPackage.done = true;
    this.installOrder.push(packageName);
  }
}

module.exports = PackageInstaller;
