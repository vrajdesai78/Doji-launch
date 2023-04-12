import React from "react";
import { BigNumber, utils } from "ethers";

const Table = ({ headers, data }) => {
  return (
    <table className="min-w-full divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          {headers.map((header) => {
            return (
              <>
                <th
                  scope="col"
                  className="capitalize px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  {header}
                </th>
              </>
            );
          })}
        </tr>
      </thead>
      <tbody className="capitalize divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
        {data.map((i) => {
          return (
            <>
              <tr>
                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                  <div className="font-medium text-gray-800 dark:text-white ">
                    {i.name}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-left">
                  <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                    {i.symbol}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <div className="text-gray-700 dark:text-gray-200">
                    {utils.formatEther(BigNumber.from(i.totalSupply ?? 0))}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <div className="text-gray-700 dark:text-gray-200">
                    {utils.formatEther(BigNumber.from(i.totalCap ?? 0))}
                  </div>
                </td>

                <td className="px-1 py-4 text-sm whitespace-nowrap">
                  <div className="text-gray-700 dark:text-gray-200">
                    <button
                      className="bg-green-400 dark:bg-green-500 text-gray-700 dark:text-gray-700 font-bold py-2 px-4 rounded-full inline-flex items-center"
                      onClick={() => {
                        if (typeof window.ethereum !== "undefined") {
                          window.ethereum
                            .request({
                              method: "wallet_watchAsset",
                              params: {
                                type: "ERC20",
                                options: {
                                  address: i.tokenAddress,
                                  symbol: i.symbol,
                                  decimals: 18,
                                },
                              },
                            })
                            .then((success) => {
                              if (success) {
                                console.log("Token added successfully!");
                              } else {
                                console.log("Oops! Error adding this token");
                              }
                            });
                        }
                      }}
                    >
                      Add me
                    </button>
                  </div>
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
