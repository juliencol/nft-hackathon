import { Framework } from '@superfluid-finance/sdk-core';
import { ethers } from 'ethers';
import {
  DAIX_SMART_CONTRACT,
  INFURA_PROJECT_ID,
  PRIVATE_KEY,
} from './constants';

export const createFlow = async (
  senderAddress: string,
  receiverAddress: string,
  flowRate: string,
  network: string
) => {
  const provider = new ethers.providers.InfuraProvider(
    network,
    INFURA_PROJECT_ID
  );

  const sf = await Framework.create({
    networkName: network,
    provider,
  });

  const signer = sf.createSigner({
    privateKey: PRIVATE_KEY,
    provider: provider,
  });

  const DAIx = DAIX_SMART_CONTRACT;

  try {
    const createFlowOperation = sf.cfaV1.createFlow({
      sender: senderAddress,
      receiver: receiverAddress,
      flowRate: flowRate,
      superToken: DAIx,
    });

    console.log('Creating your stream...');
    const result = await createFlowOperation.exec(signer);
    console.log(result);

    console.log(
      `Congrats - you've just created a money stream!
    View Your Stream At: https://app.superfluid.finance/dashboard/${receiverAddress}
    Network: ${network}
    Super Token: DAIx
    Sender: ${senderAddress}
    Receiver: ${receiverAddress},
    FlowRate: ${flowRate}
    `
    );
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
};
