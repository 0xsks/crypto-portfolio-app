document.addEventListener('DOMContentLoaded', function() {
  var addButton = document.getElementById('addWalletButton');
  addButton.addEventListener('click', function() {
    var name = document.getElementById('walletName').value;
    var address = document.getElementById('walletAddress').value;
    var newWallet = `${name}|${address}`;
    var wallets = getWallets();

    if (wallets.length >= 10) {
      alert('Maximum of 10 wallets reached. Please delete a wallet before adding a new one.');
      return;
    }

    // Add new wallet to the array and save back to cookies
    wallets.push(newWallet);
    saveWallets(wallets);
    displayWallets();
  });

  function getWallets() {
    var cookies = document.cookie.split('; ');
    var walletCookie = cookies.find(cookie => cookie.trim().startsWith('wallets='));
    return walletCookie ? decodeURIComponent(walletCookie.split('=')[1]).split(',') : [];
  }

  function saveWallets(wallets) {
    document.cookie = `wallets=${encodeURIComponent(wallets.join(','))}; path=/`;
  }

  function displayWallets() {
    var walletList = document.getElementById('walletList');
    var walletDetails = document.getElementById('walletDetails');
    walletList.innerHTML = ''; // Clear existing entries
    walletDetails.innerHTML = ''; // Clear wallet details

    var wallets = getWallets(); // Ensure this is defined by fetching wallets from storage

    var select = document.createElement('select');
    select.className = 'wallet-dropdown';
    select.onchange = function() {
      var selectedValue = select.value;
      if (selectedValue) {
        var [name, address] = selectedValue.split('|');
        displaySelectedWallet(name, address);
      }
    };

    wallets.forEach(walletData => {
      var [name, address] = walletData.split('|');
      var option = document.createElement('option');
      option.value = walletData;
      option.text = `Name: ${name}, Address: ${address}`;
      select.appendChild(option);
    });

    walletList.appendChild(select);
  }

  function displaySelectedWallet(name, address) {
    var walletDetails = document.getElementById('walletDetails');
    walletDetails.innerHTML = `
      <h3>${name}</h3>
      <p>${address}</p>
      <button onclick="editWallet('${name}', '${address}')">Edit</button>
      <button onclick="deleteWallet('${name}', '${address}')">Delete</button>
      <div class="wallet-value">Wallet Value: $<span id="walletValue">0.00</span></div>
      <div class="token-balances">Token Balances: <span id="tokenBalances">Loading...</span></div>
    `;
  }

  window.editWallet = function(name, address) {
    document.getElementById('walletName').value = name;
    document.getElementById('walletAddress').value = address;
    // Update the wallet in cookies
    var wallets = getWallets();
    var walletIndex = wallets.findIndex(w => w.startsWith(name + '|'));
    if (walletIndex !== -1) {
      wallets[walletIndex] = `${name}|${address}`;
      saveWallets(wallets);
    }
  };

  window.deleteWallet = function(name, address) {
    var wallets = getWallets();
    var updatedWallets = wallets.filter(w => w !== `${name}|${address}`);
    saveWallets(updatedWallets);
    displayWallets();
  };

  window.showBalance = function(element) {
    alert('Displaying balance for ' + element.textContent);
  };

  displayWallets(); // Initial display of wallets
});
