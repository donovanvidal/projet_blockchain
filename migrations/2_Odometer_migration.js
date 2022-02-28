const Odometer = artifacts.require("Odometer");

module.exports = function (deployer) {
  deployer.deploy(Odometer);
};
