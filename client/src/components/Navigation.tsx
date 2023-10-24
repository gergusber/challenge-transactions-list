import React, { useCallback, useState } from "react";
import Onboard, { WalletState } from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import SendTransaction from "./SendTransaction";

const injected = injectedModule();

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: "123456",
      token: "ETH",
      label: "Local Ganache",
      rpcUrl: "http://localhost:8545",
    },
  ],
});

const Navigation: React.FC = () => {
  const [wallet, setWallet] = useState<WalletState>();

  const handleConnect = useCallback(async () => {
    const wallets = await onboard.connectWallet();

    const [metamaskWallet] = wallets;

    if (
      metamaskWallet?.label === "MetaMask" &&
      metamaskWallet.accounts[0].address
    ) {
      setWallet(metamaskWallet);
    }
  }, []);

  return (
    <header className="z-50 flex flex-col py-4 text-sm bg-gray-800 w-full">
    <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
      <div className="flex items-center">
        <a
          className="text-xl font-semibold dark:text-white"
          href="./"
        >
          Transactions
        </a>
      </div>
      <div className="transition-all duration-300 sm:flex-grow sm:flex sm:items-center sm:justify-end sm:mt-0 sm:pl-2">
        {wallet && (
          <>
            <SendTransaction sender={wallet.accounts[0].address} />
            <p className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-gray-200 border-2 border-gray-200 rounded-md">
              {wallet.accounts[0].address}
            </p>
          </>
        )}
        {!wallet && (
          <button
            type="button"
            onClick={handleConnect}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-gray-200 transition-all border-2 border-gray-200 rounded-md hover:text-white hover:bg-gray-500 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  </header>
  );
};

export default Navigation;
