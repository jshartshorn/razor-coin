pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract RazorToken is ERC721Token, Ownable {
  string public constant name = "RazorToken";
  string public constant symbol = "GRAD";

  struct Razor {
    string outer;
    string inner;
  }

  Razor[] public razors;

  function getRazor( uint _razorId ) public view returns(string outer, string inner){
    Razor memory _grad = razors[_razorId];

    outer = _grad.outer;
    inner = _grad.inner;
  }

  function mint(string _outer, string _inner) public payable onlyOwner{
    Razor memory _razor = Razor({ outer: _outer, inner: _inner });
    uint _razorId = razors.push(_razor) - 1;

    _mint(msg.sender, _razorId);
  }
}
