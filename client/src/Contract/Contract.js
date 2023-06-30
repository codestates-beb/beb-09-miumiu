import Web3 from 'web3';
import nft721Abi from './ERC721.abi';

let web3 = new Web3(window.ethereum);

async function getUserAccount() {
  let accounts = await web3.eth.getAccounts();;
  return accounts[0];
}

async function getUserBalance(addr) {
  return await web3.eth.getBalance(addr);
}

function fromWei(n) {
  if (typeof n !== "string")
      n = n.toString();

  return web3.utils.fromWei(n, 'ether');
}

function get721Contract(addr) {
  return new web3.eth.Contract(nft721Abi, addr);
}

export {
  getUserAccount, getUserBalance, fromWei, get721Contract
}