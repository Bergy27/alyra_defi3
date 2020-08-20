pragma solidity ^0.5.17;
contract Epinglage {
    
  string[] fichiers;
  event NouveauFichier(string s);
  
  function payerStockage(string memory s) payable public {
    require(msg.value >= 0.1 ether, "Vous devez payer 0.1 ether pour stocker votre ficher");
    emit NouveauFichier(s);
    fichiers.push(s);
  }
  
  function getNombreFichiers() view public returns (uint){
    return fichiers.length;
  }

  function recuperer(uint ind) view public returns (string memory) {
    return fichiers[ind];
  }
}