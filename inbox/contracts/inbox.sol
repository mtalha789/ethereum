// SPDX-License-Identifier: MIT
pragma solidity ^0.4.17;

contract Inbox {
    string public message;

    function Inbox(string newMessage) public{
        message = newMessage;
    }
    function setMessage (string nMsg) public{
        message = nMsg;
    }
}