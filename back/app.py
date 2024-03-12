''' G =<V, W, S, P>
V - set of terminal symbols
W - set of non-terminal symbols
S - starting symbol
P - set of rules (rules for generating sentences)
'''
from flask import Flask, request, jsonify
from flask_cors import CORS
'''
GET
POST
PUT
DELETE

a few more methods, but these are the most used ones'''


app = Flask(__name__)
CORS(app)
# CORS(app, origins=['http://localhost:5173'], methods=["POST"]) # Restrict origin and method

# Example function to generate a formal language from grammar rules and symbols
@app.route("/api/generate-languages", methods=["POST"])
def generate_languages(grammar_rules, symbols):
  data = request.get_json()
  terminal_symbols = data["terminal_symbols"]
  # This is just a placeholder function; replace it with your actual implementation
  return "Example formal language generated"


# @app.route('/fetchData', methods=['POST'])
# def process_text():
#   data = request.get_json()
#   terminal_symbols = data.get('terminalSymbols')
#   nonterminal_symbols = data.get('nonterminalSymbols')
#   starting_symbol = data.get('startingSymbol')
#   rules = data.get('rules')
#   # Print received data to the console
#   print(f"Received data: \nterminal_symbols: {terminal_symbols}\nnonterminal_symbols: {nonterminal_symbols}\nstarting_symbol: {starting_symbol}\nrules: {rules}")
#   return jsonify({'message': 'Data received successfully!'})

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
        'V': terminal_symbols,
        'W': nonterminal_symbols,
        'S': starting_symbol,
        'P': rules
    }

    # Print received data and constructed dictionary to the console
    print(f"Received data: \nterminal_symbols: {terminal_symbols}\nnonterminal_symbols: {nonterminal_symbols}\nstarting_symbol: {starting_symbol}\nrules: {rules}")
    print("Constructed dictionary:", grammar_dict)
    
    return jsonify({'message': 'Data received successfully!'})



@app.route("/")
def home():
    return "Hi! I'm backend :)"

if __name__ == "__main__":  
    app.run(debug=True)
  # app.run(host='0.0.0.0', debug=True)




    
