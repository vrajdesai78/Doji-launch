// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Token.sol";

error ONLY_ONWER_CAN_CALL();
error SEND_SUFFICIENT_ETH();
error NOT_ENOUGH_BALANCE();
error TRANSFER_FAILED();


contract LaunchPad {

    uint private totalCap;
    uint private initialTokenMinted;
    address private creator;

    // LaunchPad contract onwer
    address private launchPadOwner;

    // number of Tokens Created
    uint256 private numOfTokensCreated;

    // Amount to pay to create token
    uint256 private tokenCreationPrice;

    event WithdrawMoney(address withdrawAddress, uint amount);

    // struct to store all the data of Token and LaunchPad contract
    struct TokenStruct {
        address launchPadAddress;
        address tokenAddress;
        address creator;
        string name;
        string symbol;
        bool wantTotalCap;
        uint totalCap;
        bool wantInitialMint;
        uint initialMint;
        address[] whiteListAddresses;
    }

    // searching the struct data of Token and LaunchPad using creator address
    mapping(address => TokenStruct[]) public allTokenData;

    // creator address to check the addresses of token created
    // creator => token addresses
    mapping(address => address[]) public tokenAddresses;

    // modifier to allow onwer to call the function
    modifier onlyOwner() {
        if(msg.sender != launchPadOwner){
            revert ONLY_ONWER_CAN_CALL();
        }
        _;
    }

    /**
     * @dev constructor to get the owner address of this contract factory
     */
    constructor(address _launchPadOwner, uint256 _tokenCreationPrice) {
        launchPadOwner = _launchPadOwner;
        tokenCreationPrice = _tokenCreationPrice;
    }

    /**
     * @dev function to create the contract MultiSigWallet
     */
    function CreateToken(address _creator, string memory _name, string memory _symbol, bool _wantTotalCap, uint _totalCap, bool _wantInitialMint, uint _initialMint, address[] memory _whiteListAddresses) payable public {
        if(msg.value < tokenCreationPrice){
            revert SEND_SUFFICIENT_ETH();
        }

        totalCap = _totalCap;
        initialTokenMinted = _initialMint;
        if(_wantTotalCap == false){
            totalCap = type(uint256).max;
        }

        if(_wantInitialMint == false ){
            initialTokenMinted = 0;
        }
        
        // Create a new Wallet contract
        Token token =  new Token(
            _creator,
            _name,
            _symbol,
            totalCap,
            initialTokenMinted,
            _whiteListAddresses
        );
        // Increment the number of Tokens Created
        ++numOfTokensCreated;

        // Add token data to the mapping
        allTokenData[_creator].push(
            TokenStruct(
            address(this),
            address(token),
            _creator,
            _name,
            _symbol,
            _wantTotalCap,
            totalCap,
            _wantInitialMint,
            initialTokenMinted,
            _whiteListAddresses
            )
        );


        // search the profile by using creator address
        // Solidity mappings with array type keys are not a good idea to use in practice, 
        // as the key data is stored in the contract storage and it will consume a lot of storage and gas cost.
        tokenAddresses[_creator].push(address(token));
    }

    /**
     * @dev function to set new onwer
     * @param _newOnwer address of new onwer
     */
    function setNewOwner(address _newOnwer) public onlyOwner {
        launchPadOwner = _newOnwer;
    }

    function setNewPrice(uint256 _newTokenCreationPrice) public onlyOwner{
        tokenCreationPrice =  _newTokenCreationPrice;
    }

    // function to withdraw the funds from Launchpad contract
    function withdraw(uint256 _amount, address _receiver) payable external onlyOwner {
        if(msg.sender != launchPadOwner){
            revert ONLY_ONWER_CAN_CALL();
        }
       
        if(address(this).balance < _amount){
            revert NOT_ENOUGH_BALANCE();
        }

        (bool success, ) = _receiver.call{value: _amount}("");
        if(!success){
            revert TRANSFER_FAILED();
        }
        emit WithdrawMoney(_receiver , _amount);
    }


    // get the address of Launchpad contract
    function getAddressOfLaunchpadContract() public view returns (address) {
        return address(this);
    }

    // get the address of Launchpad contract owner
    function getAddressOfLaunchpadOwner() public view returns (address) {
        return launchPadOwner;
    }

    // get all the wallet addresses deployed by creator address
    function getTokensCreatedByCreator(address _creatorAddress) public view returns(address[] memory){
        return tokenAddresses[_creatorAddress];
    }

    // get the total token minted
    function getTotalToken() public view returns(uint){
        return numOfTokensCreated;
    }

    // get the price of the token
    function getTokenCreationPrice() public view returns(uint){
        return tokenCreationPrice;
    }

    // receive function is used to receive Ether when msg.data is empty
    receive() external payable {}

    // Fallback function is used to receive Ether when msg.data is NOT empty
    fallback() external payable {}
}