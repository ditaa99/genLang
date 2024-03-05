from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# CORS(app, origins=['http://localhost:5173'], methods=["POST"]) # Restrict origin and method



# Example function to generate a formal language from grammar rules and symbols
def generate_language(grammar_rules, symbols):
    # Your logic to generate the formal language based on the provided grammar rules and symbols
    # This is just a placeholder function; replace it with your actual implementation
    '''generated_language = generate_language(grammar_rules, terminal_symbols)  # Replace grammar_rules with your actual grammar rules
    return jsonify({"generated_language": generated_language})
'''
    return "Example formal language generated"

# Route for handling POST requests to generate formal language
'''@app.route("/api/generate-languages", methods=["POST"])
def generate_languages():
    # Your logic to generate languages from grammar rules and symbols
    # Return the generated languages as a JSON response
    # Example:
    return jsonify({"generated_language": "Your generated language here"})
'''
@app.route("/api/generate-languages", methods=["POST"])
def generate_languages():
  data = request.get_json()
  terminal_symbols = data["terminal_symbols"]
  # ... rest of your logic using terminal_symbols


@app.route('/newRule', methods=['POST'])
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
# if __name__ == "__main__":
#     app.run(host='0.0.0.0', debug=True)


# @app.route('/newRule', methods=['POST'])
# def process_text():
#     text = request.json.get('text')  # Retrieve text data from request body
#     print('Adding Rule:', text)  # Print text data on the backend console

#     # You can perform additional processing or return a response if needed
#     # processed_text = text.upper()  # Example processing: converting text to uppercase
#     return jsonify({'Adding Rule:': text})






'''
GET
POST
PUT
DELETE

a few more methods, but these are the most used ones'''

    
    
    
    
# from flask import Flask, jsonify, request
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# @app.route('/', methods=["POST", "GET"])
# def run_python_code():

#     try:
#         data = request.get_json()

#         # Check if the 'inputData' key is present in the request
#         if 'inputData' in data:
#             user_input = data['inputData']

#             # make all upper case
#             modified_result = f"Modified: {user_input.upper()}"

#             return jsonify({'result': modified_result})
#         else:
#             return jsonify({'error': 'No inputData provided in the request'}), 400

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)