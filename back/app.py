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



def generate_strings(terminal_symbols, starting_symbol, rules, max_length=10):
    generated_strings = set()

    def generate(current_string, remaining_length):
        if remaining_length == 0:
            generated_strings.add(current_string)
            return
        for rule in rules:
            if rule[0] == starting_symbol:
                generate(current_string + rule[1], remaining_length - 1)
            elif rule[0] in current_string:
                new_string = current_string.replace(rule[0], rule[1], 1)
                generate(new_string, remaining_length)

    generate(starting_symbol, max_length)
    return generated_strings

@app.route('/generateStrings', methods=['POST'])
def generate_strings_route():
    data = request.get_json()
    
    # Extracting data from the request
    terminal_symbols = data.get('terminalSymbols')
    starting_symbol = data.get('startingSymbol')
    rules = data.get('rules')
    max_length = data.get('maxLength', 10)  # Default maximum length is 10 if not provided
    
    # Generate strings from the grammar
    generated_strings = generate_strings(terminal_symbols, starting_symbol, rules, max_length)
    
    # Convert set to list and return in the response
    return jsonify(list(generated_strings))



@app.route("/")
def home():
    return "Hi! I'm backend :)"

if __name__ == "__main__":  
    app.run(debug=True)


