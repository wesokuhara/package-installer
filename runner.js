var PackageInstaller = require('./package-installer');

var testInput1 = ['KittenService: CamelCaser', 'CamelCaser: '];
// Output: CamelCaser. KittenService.

var testInput2 = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: Leetmeme','Ice: '];
// Output: KittenService. Ice. Cyberportal. Leetmeme. CamelCaser. Fraudstream.

var testInput3 = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: ','Ice: Leetmeme'];
// Throw Exception

var testInput4 = ['KittenService: Ghost','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: ','Ice: Leetmeme'];
// Throw Exception

var installer = new PackageInstaller();
installer.printInstallOrder(testInput1);
installer.printInstallOrder(testInput2);
