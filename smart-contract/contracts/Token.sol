// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

error TOTALCAP_EXCEED();

contract Token is ERC20 {
    uint internal totalCap;
    uint internal totalTokenMinted;
    address internal creator;

    /**
     * @dev mapping to keep track of whitelisted addresses
     * (whitelisted address => true)
     * (not whitelisted address => false)
     */
    mapping (address => bool) internal whiteListed;

    // modifier to check that only creator and whiltlisted addresses can mint tokens
    modifier onlyAllowList(){
        require(whiteListed[msg.sender] || msg.sender == creator,"not allowed");
        _;
    }

    /**
     * @notice contructor to mint initial erc20 token and set initial values
     */
    constructor(address _creator, string memory _name, string memory _symbol, uint _totalCap, uint _initialMint, address[] memory _whiteListAddresses) ERC20(_name, _symbol) {
        totalCap = _totalCap;
        totalTokenMinted = _initialMint;
        creator = _creator;
        require(totalTokenMinted <= totalCap,"Limit exceed");
        _mint(_creator, totalTokenMinted);

        uint8 length = uint8(_whiteListAddresses.length);
        for(uint8 i=0; i < length; i++){
            whiteListed[_whiteListAddresses[i]] = true;
        }
    }

    /**
     * @notice function to mint erc20 token
     * @param _to address of receiver
     * @param _amount amount to be minted
     */
    function mint(address _to, uint256 _amount) public onlyAllowList {
        if(totalTokenMinted + _amount > totalCap){
            revert TOTALCAP_EXCEED();
        }
        _mint(_to, _amount);
        totalTokenMinted += _amount;
    }

    // get the total supply allowed of the token by the creator
    function getTotalCap() public view returns(uint){
        return totalCap;
    }

    // get the total Token minted
    function getTotalTokenMint() public view returns(uint){
        return totalTokenMinted;
    }

    // get the address of the creator
    function getCreator() public view returns(address){
        return creator;
    }
}