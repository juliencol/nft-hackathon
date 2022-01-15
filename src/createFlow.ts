import { Framework } from '@superfluid-finance/sdk-core';
import { ethers } from 'ethers';
import { INFURA_PROJECT_ID, PRIVATE_KEY } from './constants';

export const createFlow = async (
  senderAddress: string,
  receiverAddress: string,
  flowRate: string
) => {
  const provider = new ethers.providers.InfuraProvider(
    'kovan',
    INFURA_PROJECT_ID
  );

  const sf = await Framework.create({
    networkName: 'kovan',
    provider,
  });

  const signer = sf.createSigner({
    privateKey: PRIVATE_KEY,
    provider: provider,
  });

  const DAIx = '0xe3cb950cb164a31c66e32c320a800d477019dcff';

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
    Network: Kovan
    Super Token: DAIx
    Sender: 0xD74bBD48E59958925C8b718b5820F9F08c3dBa82
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
