import React, { useEffect } from "react";
import Layout from "@/components/layout";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import Input from "@/components/form-elements/input";
import Button from "@/components/form-elements/button";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ABI from "../utils/ABI.json";
import { useToast } from "@chakra-ui/react";
import { contractAddress } from "@/utils/constants";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("0");
  const [totalCap, setTotalCap] = useState("0");
  const [whitelist, setWhitelist] = useState([]);
  const [capFlag, setCapFlag] = useState(true);
  const [supplyFlag, setSupplyFlag] = useState(true);

  const { address } = useAccount();

  const toast = useToast();

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: ABI,
    functionName: "CreateToken",
    args: [
      address,
      name,
      symbol,
      capFlag,
      ethers.utils.parseEther(totalCap || "0"),
      supplyFlag,
      ethers.utils.parseEther(supply || "0"),
      whitelist,
    ],
    overrides: {
      value: ethers.utils.parseEther("0.0001"),
    },
    onError: (error) => {
      console.log("Error", error);
    },
    onSuccess: (result) => {
      console.log(ethers.utils.parseEther(totalCap || "0"));
      console.log("Success", result);
    },
  });

  const { data, write, error } = useContractWrite(config);

  const { isSuccess } = useWaitForTransaction({ hash: data?.hash });

  useEffect(() => {
    console.log("isSuccess", isSuccess);
    console.log("error", error);
    if (isSuccess) {
      toast({
        title: "Token Created",
        description: "Your token has been created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    if (error) {
      toast({
        title: "Error",
        description: "There was an error creating your token: " + error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSuccess, error]);

  useEffect(() => {
    console.log(capFlag, supplyFlag);
  }, [supply, totalCap]);

  return (
    <Layout>
      <Head>
        <title>Create Token</title>
        <meta name="description" content="tokenverse" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col space-y-8 justify-center items-center max-w-[800px] mx-auto pb-32 pl-[60px] lg:pl-0">
        <div className="flex items-center w-[90%] md:w-full bg-gradient-to-r from-emerald-500 to-lime-600 rounded-[30px] overflow-hidden shadow-lg">
          <div className="hidden md:flex mx-auto justify-center">
            <Image src="/token.png" width="200" height="200" alt="Icon" />
          </div>
          <div className="px-10 py-8 text-white text-right">
            <div className="font-bold text-xl mb-2">TOKEN</div>
            <div className="font-bold text-md mb-2">
              Mint a personal or a community token on a fixed supply Already
              have a token? Import token into Tokenverse
            </div>
          </div>
        </div>
        <form className="flex flex-col space-y-3 w-[90%] md:max-w-[600px] mx-auto">
          <Input
            id="name"
            name="name"
            label="Name"
            placeholder="Forefront"
            type="text"
            onChange={(e) => setName(e.target.value)}
            helper="This Can Be A Discord Server, Project Or Your Own Name."
          />
          <Input
            id="symbol"
            name="symbol"
            label="Symbol"
            placeholder="FF"
            type="text"
            onChange={(e) => setSymbol(e.target.value)}
            helper="Your Token Symbol (1-7 Characters), No '$' Sign Required."
          />
          <Checkbox
            onChange={(e) => setCapFlag(e.target.checked)}
            defaultChecked
          >
            Set Total Cap
          </Checkbox>
          <Input
            id="supply"
            name="supply"
            label="Total Cap"
            placeholder="0"
            type="number"
            onChange={(e) => setTotalCap(e.target.value)}
            helper="Recommended Supply - 10 Million Tokens."
          />
          <Checkbox
            onChange={(e) => setSupplyFlag(e.target.checked)}
            defaultChecked
          >
            Set Initial Supply
          </Checkbox>
          <Input
            id="supply"
            name="supply"
            label="Initial Supply"
            placeholder="0"
            type="number"
            onChange={(e) => setSupply(e.target.value)}
            helper="Recommended Supply - 10 Million Tokens."
          />
          <Input
            id="whitelist"
            name="whitelist"
            label="Enter addresses for whitelist"
            placeholder="Enter comma separated addresses"
            type="text"
            onChange={(e) => {
              const addresses = e.target.value.split(",");
              setWhitelist(addresses);
            }}
            helper="Only whitelisted addresses will be able to mint your token."
          />
          <Button
            label="Create"
            onClick={(e) => {
              e.preventDefault();
              write();
            }}
          />
        </form>
      </div>
    </Layout>
  );
};

export default Dashboard;
