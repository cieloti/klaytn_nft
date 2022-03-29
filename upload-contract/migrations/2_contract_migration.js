var YourTokenFlatten = artifacts.require('YourTokenFlatten');

module.exports = function(deployer) {
  deployer.deploy(YourTokenFlatten, "name", "symbol")
};
