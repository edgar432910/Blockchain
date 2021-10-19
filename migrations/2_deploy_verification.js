const Verificador = artifacts.require("Verificador");

module.exports = function (deployer) {
  deployer.deploy(Verificador);
};
