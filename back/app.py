from flask import Flask, request, jsonify

app = Flask(__name__)

# Example function to generate a formal language from grammar rules and symbols
def generate_language(grammar_rules, symbols):
    # Your logic to generate the formal language based on the provided grammar rules and symbols
    # This is just a placeholder function; replace it with your actual implementation
    return "Example formal language generated"

# Route for handling POST requests to generate formal language
@app.route("/api/generate-languages", methods=["POST"])
def generate_languages():
    # Your logic to generate languages from grammar rules and symbols
    # Return the generated languages as a JSON response
    # Example:
    return jsonify({"generated_language": "Your generated language here"})

@app.route("/")
def home():
    return "Hello :)"

if __name__ == "__main__":  
    app.run(debug=True)




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