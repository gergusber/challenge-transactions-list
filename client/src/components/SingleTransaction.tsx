import React from "react";
import { useQuery } from "@apollo/client";
import { GetSingleTransaction } from "../queries";
import { SingleTransactionData } from "../types";
import Loading from "./UI/Loading";
import BackButton from "./UI/BackBtn";

interface SingleTransactionProps {
  id: string | null;
}

const SingleTransaction: React.FC<SingleTransactionProps> = ({ id }) => {
  function convertWeiToEth(
    weiValue: number,
    decimalPlaces: number = 4
  ): string {
    // Convert WEI to ETH
    const ethValue: number = weiValue / 10 ** 18;

    // Format the ETH value to the desired number of decimal places
    const formattedEth: string = ethValue.toFixed(decimalPlaces);

    return formattedEth;
  }

  const { loading, error, data } = useQuery<SingleTransactionData>(
    GetSingleTransaction,
    { variables: { hash: id } }
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex flex-col mt-20">
        <div className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between text-red-600 font-bold">
          Error: {error.message}
        </div>
      </div>
    );
  }

  const { hash, to, from, value } = data?.getTransaction || {};

  const valueParsed = value ? convertWeiToEth(parseInt(value)) : 0;
  return (
    <div>
      <div className="flex flex-col mt-20">
        <div className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
          <BackButton />
        </div>
      </div>
      <div className="mt-20">
        <div className="max-w-[85rem] w-full mx-auto px-4">
          <h1 className="text-2xl mb-10">Transaction</h1>
          <p>
            <span className="font-bold">Transaction Hash:</span> {hash}
          </p>
          <p>
            <span className="font-bold">Sender Address:</span> {from}
          </p>
          <p>
            <span className="font-bold">Recipient Address:</span> {to}
          </p>
          <p>
            <span className="font-bold">Amount:</span> {valueParsed} ETH
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleTransaction;
