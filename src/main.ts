import { createFlow } from './createFlow';

const main = async () => {
  const senderAddress: string = '0xb3EeFD96741d7d5Bf0CF416B196c80F191120CF3';
  const receiverAddress: string = '0x191648DD89A1c3336A0CDaf429bFf9cDB3F2e1c3';
  const flowrate: string = '10000000000000';

  // Create a flow
  return await createFlow(senderAddress, receiverAddress, flowrate).catch(
    (error: Error) => console.error(error)
  );
};

main();
