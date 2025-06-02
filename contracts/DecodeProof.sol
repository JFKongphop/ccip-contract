// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "./interface/ISquareSumVerifier.sol";
import "hardhat/console.sol";

contract DecodeProof {
  ISquareSumVerifier public verifier;
  constructor(address _verifier) {
    verifier = ISquareSumVerifier(_verifier);
  }

  function extractProof(bytes memory abiData) public view returns (bool result){
    (
      uint[2] memory a, 
      uint[2][2] memory b, 
      uint[2] memory c, 
      uint[1] memory pubSignal
    ) = abi.decode(
      abiData, 
      (
        uint[2], 
        uint[2][2], 
        uint[2],
        uint[1]
      )
    );

    result = verifier.verifyProof(a, b, c, pubSignal);
  }
}
