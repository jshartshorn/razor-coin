import assertRevert from "zeppelin-solidity/test/helpers/assertRevert";

const RazorToken = artifacts.require("RazorToken");

contract("Razor token", accounts => {
  it("Should make first account an owner", async () => {
    let instance = await RazorToken.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });

  describe("mint", () => {
    it("creates token with specified outer and inner colors", async () => {
      let instance = await RazorToken.deployed();
      let owner = await instance.owner();

      let token = await instance.mint("#ff00dd", "#ddddff");

      let tokens = await instance.tokensOf(owner);
      let razors = await instance.getRazor(tokens[0]);
      assert.deepEqual(razors, ["#ff00dd", "#ddddff"]);
    });

    it("allows to mint only to owner", async () => {
      let instance = await RazorToken.deployed();
      let other = accounts[1];

      await instance.transferOwnership(other);
      await assertRevert(instance.mint("#ff00dd", "#ddddff"));
    });
  });
});
