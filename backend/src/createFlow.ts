import { Framework } from '@superfluid-finance/sdk-core';
import { BigNumber } from '@ethersproject/bignumber';
import { ethers } from 'ethers';
import {
  DAIX_SMART_CONTRACT,
  INFURA_PROJECT_ID,
  PRIVATE_KEY,
} from './constants';

export const createFlow = async (
  sender: string,
  receiver: string,
  monthlyAmount: number
) => {
  const network: string = 'kovan';
  const flowRate: string = calculateFlowRate(monthlyAmount).toString();
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
      sender: sender,
      receiver: receiver,
      flowRate: flowRate,
      superToken: DAIx,
    });

    console.log('Creating stream...');
    const result = await createFlowOperation.exec(signer);
    console.log(
      `Congrats - you've just created a money stream!
    View Your Stream At: https://app.superfluid.finance/dashboard/${receiver}
    Network: ${network}
    Super Token: DAIx
    Sender: ${sender}
    Receiver: ${receiver},
    FlowRate: ${flowRate}
    `
    );
    return result;
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
    return error;
  }
};

const calculateFlowRate = (monthlyAmountInUSD: number): number => {
  const monthlyAmount: any = ethers.utils.parseEther(
    monthlyAmountInUSD.toString()
  );
  const calculatedFlowRate = Math.floor(monthlyAmount / (3600 * 24 * 30));
  return calculatedFlowRate;
};

const testCreateFlow = async () => {
  const sender: string = '0xb3EeFD96741d7d5Bf0CF416B196c80F191120CF3';
  const receiver: string = '0x191648DD89A1c3336A0CDaf429bFf9cDB3F2e1c3';
  const monthlyAmount: number = 1000;

  return await createFlow(sender, receiver, monthlyAmount).catch(
    (error: Error) => console.error(error)
  );
};
