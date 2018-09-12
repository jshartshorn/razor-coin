const RazorToken = artifacts.require("RazorToken");
const util = require("util");
const fs = require("fs");
const path = require("path");
const writeFile = util.promisify(fs.writeFile);

module.exports = async function(deployer) {
  const razorToken = await deployer.deploy(RazorToken);
  const addresses = {
    tokenAddress: RazorToken.address
  };

  await writeFile(
    path.join(__dirname, "..", "front", "src", "addresses.json"),
    JSON.stringify(addresses)
  );
};
