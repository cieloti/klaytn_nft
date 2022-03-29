brew update
brew upgrade
brew tap ethereum/ethereum
brew install solidity@5
solc --abi --bin upload-contract/contracts/YourTokenFlatten.sol > YourTokenFlatten.abi
