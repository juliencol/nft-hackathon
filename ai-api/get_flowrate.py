import aiohttp
import asyncio
import re
from PIL import Image
from decouple import config

async def poll_azure(url: str, headers):
    
    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=headers) as response:
            body = await response.json()
            while body.get('status') not in { 'failed', 'succeeded' }:
                await asyncio.sleep(1)
                async with session.get(url, headers=headers) as _response:
                    body = await _response.json()
            if body.get('status', '') == 'failed':
                print('document analysis failed')
    return body

async def getNewTransriptAzureOCR(url,headers,buffer):

    transcription = ""

    async with aiohttp.ClientSession() as session:
        async with session.post(url, headers=headers, data=buffer) as response:
            
            print("Status:", response.status)
            if response.status == 200:
                results = await response.json()
                print("Body: ", results)
            elif response.status == 202:
                result_url = response.headers['Operation-Location']
                print('Polling results from Form Recognizer for image')
                results = await poll_azure(result_url, headers)
                for line in results.get('analyzeResult', { }).get('readResults', [{ }])[0].get('lines', []):
                    transcription += " " + line['text']
                print(transcription)
                return transcription
            else:
                print("Error")


def convert_to_flowrate(transcript: str):
    p = re.compile(r"(\$)(.*)(USD per hour)",re.I)
    match = re.search(p, transcript)
    extract = match.group(0)

    p2 = re.compile(r"(\d{1,3}.\d{0,2})")
    match2 = re.search(p2, extract)
    extract_final = match2.group(0)

    return float(extract_final) * 35 * 4

async def analyze_contract(img_path):
    azure_subscription_key = config('AZURE_SUBSCRIPTION_KEY')
    headers = {
        'Content-Type': 'image/jpeg',
        'Ocp-Apim-Subscription-Key': azure_subscription_key
    }

    url = 'https://ocr-service.cognitiveservices.azure.com/vision/v3.0/read/analyze'

    img = open(img_path, 'rb')
    transcript = await getNewTransriptAzureOCR(url,headers,img)

    return convert_to_flowrate(transcript)

""" img = open('Employment-Agreement-Sample.jpg', 'rb')

result = asyncio.run(analyze_contract(img))
print(result) """
