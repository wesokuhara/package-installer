# Package Installer

A coding exercise applying Topological sorting.  Given a list of packages and their dependencies, determine the order of installation for those packages.  

### Examples

#### Test 1
For: `['KittenService: CamelCaser', 'CamelCaser: ']`

Output: `['CamelCaser, KittenService']`

#### Test 2
For: `['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser:
KittenService','Fraudstream: Leetmeme','Ice: ']`

Output: `['KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream']`

#### Test 3
For: `['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser:
KittenService','Fraudstream: ','Ice: Leetmeme']`

Output: Error, there is a dependency cycle

## Installation

```
npm install
npm install -g mocha
```

## Usage

Write your test cases in the `test` directory

Run tests with `npm run test` OR `npm run watch-test`
