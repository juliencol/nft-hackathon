import json
from flask import Flask, request, jsonify
from get_flowrate import analyze_contract
import aiohttp
import asyncio
import re
from PIL import Image
import os



app = Flask(__name__)

@app.route('/flowrate', methods=['GET'])
def upload():
    filename = request.args.get('filename')
    result = asyncio.run(analyze_contract(filename))
    return jsonify({'monthly_amount': result})

app.run(debug=True)

