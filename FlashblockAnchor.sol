// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

/**
 * @title FlashblockAnchor
 * @dev On-chain settlement contract blueprint validating sequenced block-builder roots.
 */
contract FlashblockAnchor {
    address public sequencerAddress;
    uint256 public canonicalBlockHeight;
    bytes32 public canonicalStateRoot;

    event CanonicalBlockSettled(uint256 indexed height, bytes32 stateRoot);

    constructor(address _sequencer) {
        sequencerAddress = _sequencer;
    }

    /**
     * @notice Packages multiple accumulated off-chain Flashblock streams into a formal canonical L2 block.
     */
    function settleCanonicalState(uint256 nextHeight, bytes32 aggregatedRoot) external {
        require(msg.sender == sequencerAddress, "AuthError: Caller must be authorized sequencer");
        require(nextHeight == canonicalBlockHeight + 1, "SequenceError: Gap detected in block submission");

        canonicalBlockHeight = nextHeight;
        canonicalStateRoot = aggregatedRoot;

        emit CanonicalBlockSettled(nextHeight, aggregatedRoot);
    }
}
