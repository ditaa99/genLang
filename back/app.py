''' G =<V, W, S, P>
V - set of terminal symbols
W - set of non-terminal symbols
S - starting symbol
P - set of rules (rules for generating sentences)
'''
'''
GET
POST
PUT
DELETE

a few more methods, but these are the most used ones'''

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/fetchData', methods=['POST'])
def process_text():
    data = request.get_json()
    
    # Extracting data from the request
    terminal_symbols = data.get('terminalSymbols')
    nonterminal_symbols = data.get('nonterminalSymbols')
    starting_symbol = data.get('startingSymbol')
    rules = data.get('rules')
    
    # Constructing the dictionary
    grammar_dict = {
        'terminal_symbols': terminal_symbols,
        'nonterminal_symbols': nonterminal_symbols,
        'starting_symbol': starting_symbol,
        'rules': rules
    }

    # Print received data and constructed dictionary to the console
    print("Received data:", grammar_dict)
    
    # Return the constructed dictionary in the response
    return jsonify(grammar_dict)


@app.route("/")
def home():
    return "Hi! I'm backend :)"

if __name__ == "__main__":  
    app.run(debug=True)
