const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Leona", "Zyra", "Morgana"], // Names
    [
      "https://i.imgur.com/5e8TLf3.jpeg", // Images
      "https://i.imgur.com/cPH8CT7.gif",
      "https://i.imgur.com/kVz5aIM.jpeg",
    ],
    [500, 200, 300], // HP values
    [50, 500, 200], // Attack damage values
    "Viego", // Boss name
    "https://i.imgur.com/5KTHbuw.jpeg", // Boss image
    10000, // Boss hp
    50 // Boss attack damage
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;
  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  console.log("Done!");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
