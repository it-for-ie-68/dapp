import { formatUnits } from "viem";
import { useBalance, useReadContract } from "wagmi";
import { secretABI, tokenABI } from "./abi";
import {
  MY_ACCOUNT_ADDRESS,
  SECRET_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
  TOKEN_SYMBOL,
} from "./env";

const urlMyAccount = `https://sepolia.etherscan.io/address/${MY_ACCOUNT_ADDRESS}`;
const urlSecret = `https://sepolia.etherscan.io/address/${SECRET_CONTRACT_ADDRESS}`;
const urlToken = `https://sepolia.etherscan.io/address/${TOKEN_CONTRACT_ADDRESS}`;

function App() {
  const useBal = useBalance({
    address: MY_ACCOUNT_ADDRESS,
  });

  const useReadSecret = useReadContract({
    address: SECRET_CONTRACT_ADDRESS,
    abi: secretABI,
    functionName: "secret",
  });

  const useReadTokenBalance = useReadContract({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: tokenABI,
    functionName: "balanceOf",
    args: [MY_ACCOUNT_ADDRESS],
  });

  const displayBalance = useBal.isLoading
    ? "...loading"
    : `${parseFloat(useBal.data?.formatted || "0").toFixed(2)} (SepoliaETH)`;
  const displaySecret = useReadSecret.isLoading
    ? "...loading"
    : useReadSecret.data || "";
  const displayToken = useReadTokenBalance.isLoading
    ? "...loading"
    : `${parseFloat(formatUnits(useReadTokenBalance.data || 0n, 18)).toFixed(
        2
      )} ${TOKEN_SYMBOL}`;

  return (
    <div className="container">
      <h1>My Blockchain Assets</h1>

      <article>
        <h3>My account balance</h3>
        <kbd>{displayBalance}</kbd>
        &nbsp;
        <a href={urlMyAccount} target="_blank">
          Link
        </a>
      </article>

      <article>
        <h3>My secret</h3>
        <kbd>{displaySecret}</kbd>
        &nbsp;
        <a href={urlSecret} target="_blank">
          Link
        </a>
      </article>

      <article>
        <h3>My Token</h3>
        <kbd>{displayToken}</kbd>
        &nbsp;
        <a href={urlToken} target="_blank">
          Link
        </a>
      </article>
    </div>
  );
}

export default App;
