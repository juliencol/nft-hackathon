import axios from 'axios';

export const getMonthlyPayment = async (): Promise<number> => {
  console.log('Calling AI API...');
  const endpoint = 'http://127.0.0.1:5000/flowrate';

  const params: any = {
    filename: 'Employment-Agreement-Sample.jpg',
  };

  const res = await axios.get(endpoint, { params: params });

  return res.data.monthly_amount;
};
