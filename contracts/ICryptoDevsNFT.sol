// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * Minimal interface for CryptoDevsNFT containing only two functions
 * that we are interested in
 */
interface ICryptoDevsNFT {
/// @dev balanceOf returns the number of NFTs owned by the given address
    /// @param owner - address to fetch number of NFTs for
    /// @return Returns the number of NFTs owned
    // this will return full tokens as it's NFT (non-divisible) unlike ERC20 that return amount/qty. in wei (not full tokens)
    function balanceOf(address owner) external view returns (uint256);

    /// @dev tokenOfOwnerByIndex returns a tokenID at given index for owner
    /// @param owner - address to fetch the NFT TokenID for
    /// @param index - index of NFT in owned tokens array to fetch
    /// @return Returns the TokenID of the NFT
    function tokenOfOwnerByIndex(address owner, uint256 index)
        external
        view
        returns (uint256);
}