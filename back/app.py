from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/', methods=['POST'])
def run_python_code():
    try:
        data = request.get_json()

        # Check if the 'inputData' key is present in the request
        if 'inputData' in data:
            user_input = data['inputData']

            # Your Python code logic here
            modified_result = f"Modified: {user_input.upper()}"

            return jsonify({'result': modified_result})
        else:
            return jsonify({'error': 'No inputData provided in the request'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
