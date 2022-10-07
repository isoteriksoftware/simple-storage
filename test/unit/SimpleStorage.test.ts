import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { deployments, ethers } from "hardhat";
import { SimpleStorage } from "../../typechain-types";

describe("FundMe", () => {
  let simpleStorage: SimpleStorage;
  let account2: SignerWithAddress;

  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    account2 = accounts[1];

    await deployments.fixture(["simpleStorage"]);
    simpleStorage = await ethers.getContract("SimpleStorage");
  });

  it("sets the initial value to zero", async () => {
    const response = await simpleStorage.retrieveValue();
    assert.equal(response.toString(), "0");
  });

  it("updates the stored value", async () => {
    const transactionResponse = await simpleStorage.storeValue("30");
    await transactionResponse.wait(1);

    const response = await simpleStorage.retrieveValue();
    expect(response.toString()).to.be.equal("30");
  });

  it("updates the right address", async () => {
    const transactionResponse = await simpleStorage.storeValue("30");
    await transactionResponse.wait(1);

    await (await simpleStorage.connect(account2).storeValue("56")).wait(1);

    const response = await simpleStorage.retrieveValue();
    expect(response.toString()).to.be.equal("30");
  });
});
