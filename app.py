from flask import Flask, jsonify, render_template, request
import requests

app = Flask(__name__)

# rendering the homepage
@app.route('/')
def Genus():
    return render_template('index.html')

# the analyze API
@app.route('/analyze',methods=['POST'])
def analyze():
    data = request.get_json()
    DNA = data['sequence']
    querystring = {"dna":DNA}
    headers = {"X-RapidAPI-Key": "57d2ebe92emshd9c13c29ad3c629p1c7fd3jsn9e3f3e41e491","X-RapidAPI-Host": "dna2protein.p.rapidapi.com"}
    url = "https://dna2protein.p.rapidapi.com/DNA2AminoAcid"
    response = requests.get(url, headers=headers, params=querystring)
    return response.json()

#running the server
if __name__ == '__main__':
    app.run()