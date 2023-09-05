import { toast } from "react-hot-toast";

import { useEffect, useState } from "react";
import useApp from "../../hooks/useApp";
import { useAccount, useNetwork } from "wagmi";

export default function Pool() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [reload, setReload] = useState(Date.now());
  const [claimableTokens, setClaimableTokens] = useState(0);
  const { claimTokens, getClaimableTokens } = useApp();
  const claimButtonClicked = async () => {
    await claimTokens();
    setReload(Date.now());
  };

  const getData = async () => {
    if(chain?.unsupported) return;
    const data = await getClaimableTokens();
    setClaimableTokens(data);
  };
  useEffect(() => {
    getData();
  }, [reload, chain, address]);

  return (
    <div>
      {"claimableTokens: " + claimableTokens}
      <br></br>
      <button
        className="btn justify-center btn-primary font-semibold uppercase text-white text-center py-3 rounded"
        onClick={claimButtonClicked}
      >
        Claim
      </button>
    </div>
  );
}
