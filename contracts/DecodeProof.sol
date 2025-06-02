// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "hardhat/console.sol";

contract DecodeProof {
  function extractProof(bytes memory abiData) public pure {
    (
      bytes32[2] memory a,
      bytes32[2][2] memory b,
      bytes32[2] memory c,
      bytes32[1] memory input
    ) = abi.decode(
      abiData, 
      (
        bytes32[2], 
        bytes32[2][2], 
        bytes32[2], 
        bytes32[1]
      )
    );
    console.logBytes32(input[0]);
  }
}
