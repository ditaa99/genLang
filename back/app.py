# ''' G =<V, W, S, P>
# V - set of terminal symbols
# W - set of non-terminal symbols
# S - starting symbol
# P - set of rules (rules for generating sentences)
# '''
# '''
# GET
# POST
# PUT
# DELETE

# a few more methods, but these are the most used ones'''


# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# cors = CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# def generate_language(terminal_symbols, nonterminal_symbols, starting_symbol, rules, max_length=20):
#     # Convert symbols to sets for faster lookup
#     terminal_symbols = set(terminal_symbols)
#     nonterminal_symbols = set(nonterminal_symbols)

#     # Create a dictionary to represent the grammar
#     grammar = {}
#     for rule in rules:
#         if "-" in rule:
#             lhs, rhs = rule.split("-")
#             lhs = lhs.strip()  # Remove any leading/trailing whitespace
#             rhs = rhs.strip()  # Remove any leading/trailing whitespace
#             if lhs in grammar:
#                 grammar[lhs].append(rhs)
#             else:
#                 grammar[lhs] = [rhs]
#         else:
#             print(f"Skipping malformed rule: {rule}")

#     # Initialize the language set
#     language = set()

#     # Helper function to generate words
#     def generate_words(current_string, current_length):
#         # If the current string consists of only terminal symbols, add it to the language
#         if all(symbol in terminal_symbols for symbol in current_string):
#             language.add(current_string)
#             return

#         # Check if the current length exceeds the maximum allowed length
#         if current_length >= max_length:
#             return

#         # Check if the current string ends with a non-terminal symbol
#         last_symbol = current_string[-1] if current_string else starting_symbol
#         if last_symbol in nonterminal_symbols:
#             for rhs in grammar.get(last_symbol, []):
#                 generate_words(current_string[:-1] + rhs, current_length + len(rhs))

#     # Call the helper function with the starting symbol
#     generate_words(starting_symbol, len(starting_symbol))

#     return language

# @app.route('/fetchData', methods=['POST'])
# def process_text():
#     data = request.get_json()

#     # Extracting data from the request
#     terminal_symbols = data.get('terminalSymbols')
#     nonterminal_symbols = data.get('nonterminalSymbols')
#     starting_symbol = data.get('startingSymbol')
#     rules = data.get('rules')

#     # Generate the language
#     language = generate_language(terminal_symbols, nonterminal_symbols, starting_symbol, rules)

#     # Prepare response data
#     response_data = {
#         'terminal_symbols': terminal_symbols,
#         'nonterminal_symbols': nonterminal_symbols,
#         'starting_symbol': starting_symbol,
#         'rules': rules,
#         'language': list(language)
#     }

#     return jsonify(response_data)

# @app.route("/")
# def home():
#     return "Hi! I'm backend :)"

# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app) 
# cors = CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


def generate_language(terminal_symbols, nonterminal_symbols, starting_symbol, rules, max_length=20):
    # Convert symbols to sets for faster lookup
    terminal_symbols = set(terminal_symbols)
    nonterminal_symbols = set(nonterminal_symbols)

    # Create a dictionary to represent the grammar
    grammar = {}
    for rule in rules:
        if "-" in rule:
            lhs, rhs = rule.split("-")
            lhs = lhs.strip()  # Remove any leading/trailing whitespace
            rhs = rhs.strip()  # Remove any leading/trailing whitespace
            if lhs in grammar:
                grammar[lhs].append(rhs)
            else:
                grammar[lhs] = [rhs]
        else:
            print(f"Skipping malformed rule: {rule}")

    # Initialize the language set
    language = set()
    shortest_words = []

    # Helper function to generate words
    def generate_words(current_string, current_length):
        nonlocal shortest_words
        # If the current string consists of only terminal symbols, add it to the language
        if all(symbol in terminal_symbols for symbol in current_string):
            language.add(current_string)
            shortest_words.append(current_string)  # Always append the shortest words
            return

        # Check if the current length exceeds the maximum allowed length
        if current_length >= max_length:
            return

        # Check if the current string ends with a non-terminal symbol
        last_symbol = current_string[-1] if current_string else starting_symbol
        if last_symbol in nonterminal_symbols:
            for rhs in grammar.get(last_symbol, []):
                generate_words(current_string[:-1] + rhs, current_length + len(rhs))

    # Call the helper function with the starting symbol
    generate_words(starting_symbol, len(starting_symbol))

    return language, shortest_words


# @app.route('/fetchData', methods=['POST'])
# def process_text():
#     data = request.get_json()

#     # Extracting data from the request
#     terminal_symbols = data.get('terminalSymbols')
#     nonterminal_symbols = data.get('nonterminalSymbols')
#     starting_symbol = data.get('startingSymbol')
#     rules = data.get('rules')

#     # Generate the language and find the shortest words
#     max_length = 20  # You can adjust this value as needed
#     language, shortest_words = generate_language(terminal_symbols, nonterminal_symbols, starting_symbol, rules, max_length)

#     # Prepare response data
#     response_data = {
#         'terminal_symbols': terminal_symbols,
#         'nonterminal_symbols': nonterminal_symbols,
#         'starting_symbol': starting_symbol,
#         'rules': rules,
#         'language': list(language),
#         'shortest_words': shortest_words,
#         'other_words': [word for word in language if word not in shortest_words]
#     }

#     return jsonify(response_data)

@app.route('/fetchData', methods=['POST'])
def process_text():
    data = request.get_json()

    # Extracting data from the request
    terminal_symbols = data.get('terminalSymbols')
    nonterminal_symbols = data.get('nonterminalSymbols')
    starting_symbol = data.get('startingSymbol')
    rules = data.get('rules')

    # Generate the language and find the shortest words
    max_length = 20  # You can adjust this value as needed
    language, shortest_words = generate_language(terminal_symbols, nonterminal_symbols, starting_symbol, rules, max_length)

    # Sort the language set by word length
    sorted_language = sorted(list(language), key=len)

    # Find the length of the shortest words
    shortest_word_length = len(sorted_language[0]) if sorted_language else 0

    # Split the sorted list into shortest words and other words
    shortest_words = [word for word in sorted_language if len(word) == shortest_word_length]
    other_words = [word for word in sorted_language if len(word) > shortest_word_length]

    # Prepare response data
    response_data = {
        'terminal_symbols': terminal_symbols,
        'nonterminal_symbols': nonterminal_symbols,
        'starting_symbol': starting_symbol,
        'rules': rules,
        'language': sorted_language,
        'shortest_words': shortest_words,
        'other_words': other_words
    }

    return jsonify(response_data)


@app.route("/")
def home():
    return "Hi! I'm backend :)"

if __name__ == "__main__":
    app.run(debug=True)