import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploySimpleStorage: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number = network.config.chainId!;

  log("------------------------------------------------------");
  log("Deploying SimpleStorage and waiting for confirmations...");

  const simpleStorage = await deploy("SimpleStorage", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 1,
  });

  log(`SimpleStorage deployed at ${simpleStorage.address}`);
};

deploySimpleStorage.tags = ["all", "simpleStorage"];
export default deploySimpleStorage;
