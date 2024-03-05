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


@app.route('/fetchData', methods=['POST'])
def process_text():
  data = request.get_json()
  terminal_symbols = data.get('terminalSymbols')
  nonterminal_symbols = data.get('nonterminalSymbols')
  starting_symbol = data.get('startingSymbol')
  rules = data.get('rules')
  # Print received data to the console
  print(f"Received data: \nterminal_symbols: {terminal_symbols}\nnonterminal_symbols: {nonterminal_symbols}\nstarting_symbol: {starting_symbol}\nrules: {rules}")
  return jsonify({'message': 'Data received successfully!'})



@app.route("/")
def home():
    return "Hello :)"

if __name__ == "__main__":  
    app.run(debug=True)
#   app.run(host='0.0.0.0', debug=True)




    
