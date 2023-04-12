import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig } from "wagmi";
import { client } from "../utils/wagmi";
import { ConnectKitProvider } from "connectkit";
import { ThemeProvider } from "next-themes";
import "animate.css/animate.min.css";

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="retro">
        <ThemeProvider attribute="class">
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </ThemeProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
