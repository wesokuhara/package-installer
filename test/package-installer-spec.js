var assert = require('chai').assert;
var PackageInstaller = require('../src/package-installer');
var installer = new PackageInstaller();

describe('Package Installer', function() {
  it('should work for small amount of packages ', function () {
    var testInput = ['KittenService: CamelCaser', 'CamelCaser: '];
    var actual = installer.getInstallOrder(testInput);
    var expected = ['CamelCaser', 'KittenService'];

    assert.deepEqual(actual, expected);
  });

  it('should work for larger amount of packages ', function () {
    var testInput = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: Leetmeme','Ice: '];
    var actual = installer.getInstallOrder(testInput);
    var expected = ['KittenService', 'Ice', 'Cyberportal', 'Leetmeme', 'CamelCaser', 'Fraudstream'];

    assert.deepEqual(actual, expected);
  });

  it('should throw an error if there is a cycle in the dependencies', function () {
    var testInput = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: ','Ice: Leetmeme'];

    assert.throws(function() {
      installer.getInstallOrder(testInput);
    }, 'ERROR: There exists a cycle in the dependencies.');
  });

  it('should throw an error if there is a dependency package that does not exist', function () {
    var testInput = ['KittenService: Ghost','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: ','Ice: Leetmeme'];

    assert.throws(function() {
      installer.getInstallOrder(testInput);
    }, 'ERROR: No dependency package Ghost exists.');
  });
});
