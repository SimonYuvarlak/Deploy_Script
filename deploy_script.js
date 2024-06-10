import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import stargateModule from "@cosmjs/stargate";
const { GasPrice, calculateFee } = stargateModule;
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

// Define the sender's private key
// const privateKey = "your_private_key_here";
// Create a signer object using the private key
// const wallet = await DirectSecp256k1Wallet.fromKey(privateKey);

const mnemonic = process.env.POSEIDON_MNEMONIC;

const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
  prefix: "xion",
});

// Initialize a CosmWasm client with the signer
const client = await SigningCosmWasmClient.connectWithSigner(
  "https://xion-test-priv-rpc.kingnodes.com/",
  wallet,
  {
    gasPrice: GasPrice.fromString("0.025uxion"),
  }
);

// Define the sender's address and the contract address
const [account] = await wallet.getAccounts();
const senderAddress = account.address;

const wasm1 = fs.readFileSync("./wasm/the_vault.wasm");

const result1 = await client.upload(senderAddress, wasm1, "auto");

// instantiate
const codeId1 = result1.codeId;
console.log("Challenge code id: ", codeId1);

let data = await client.instantiate(
  senderAddress,
  codeId1,
  {
    name: "the_vault",
    expected_denom: "uxion",
  },
  "The Vault",
  "auto",
  {
    admin: senderAddress,
  }
);
console.log("The Vault Contract Address: ", data.contractAddress);
