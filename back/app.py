from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_cors import cross_origin
from itertools import permutations
import re


app = Flask(__name__)
cors = CORS(app) 


# words generated
def generate_language(terminal_symbols, nonterminal_symbols, starting_symbol, rules, max_length):
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

    # Check if any rule terminates
    terminates = False
    for lhs, rhss in grammar.items():
        for rhs in rhss:
            if all(symbol in terminal_symbols for symbol in rhs):
                terminates = True
                break

    # If no rule terminates, return an error message
    if not terminates:
        return [], [], "You didn't have any terminating rules. This language cannot be generated."

    # Initialize the language set
    language = set()
    shortest_words = []

    # Helper function to generate words
    def generate_words(current_string, current_length):
        nonlocal shortest_words
        # If the current string consists of only terminal symbols, add it to the language
        if all(symbol in terminal_symbols for symbol in current_string):
            language.add(current_string)
            if not shortest_words:
                shortest_words.append(current_string)  # Add the first word as the shortest word
            elif len(current_string) == len(shortest_words[0]):
                shortest_words.append(current_string)  # Add words with the same length as the shortest words
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

    # If only one word can be generated, handle the cases
    if len(language) == 1:
        print("Language contains a single word")
        word = list(language)[0]
        if not shortest_words:
            shortest_words = [word]
        other_words = ["This language only has one word."]
    else:
        other_words = [word for word in language if word not in shortest_words]
        # Sort the 'other_words' list by word length
        other_words.sort(key=len)

        
        
    # Return the language, shortest words, and other words
    return language, shortest_words, other_words, ''

# words with rules

def words_rules(terminal_symbols, nonterminal_symbols, starting_symbol, rules, max_length):
    # Convert symbols to sets for faster lookup
    terminal_symbols = set(terminal_symbols)
    nonterminal_symbols = set(nonterminal_symbols)

    # Create a dictionary to represent the grammar
    grammar = {}
    for rule in rules:
        if "-" in rule:
            lhs, rhs = rule.split("-")
            lhs = lhs.strip()
            rhs = rhs.strip()
            if lhs in grammar:
                grammar[lhs].append(rhs)
            else:
                grammar[lhs] = [rhs]
        else:
            print(f"Skipping malformed rule: {rule}")

    # Check if grammar has terminals 
    terminates = False
    for lhs, rhss in grammar.items():
        for rhs in rhss:
            if all(symbol in terminal_symbols for symbol in rhs):
                terminates = True
                break

    # If no rule terminates, return an error message
    if not terminates:
        return {}, []

    # Initialize word tracking dictionary and generation steps list
    words_with_rules = {}
    generation_steps = {}

    # Helper function to generate words with their derivation histories
    def generate_words_with_rules(current_string, current_length, derivation_history):
        # Check if the current string consists of only terminal symbols
        if all(symbol in terminal_symbols for symbol in current_string):
            words_with_rules[current_string] = derivation_history.copy()
            generation_steps[current_string] = derivation_history.copy()  # Store the derivation history for the current word
            return

        # Check if the current length exceeds the maximum allowed length
        if current_length >= max_length:
            return

        # Check if the current string ends with a non-terminal symbol
        last_symbol = current_string[-1] if current_string else starting_symbol
        if last_symbol in nonterminal_symbols:
            for rhs in grammar.get(last_symbol, []):
                new_derivation_history = derivation_history.copy()
                new_derivation_history.append(f"{last_symbol} → {rhs}")
                generate_words_with_rules(current_string[:-1] + rhs, current_length + len(rhs), new_derivation_history)

    # Start generating words with an empty derivation history
    generate_words_with_rules(starting_symbol, len(starting_symbol), [])

    # Return the dictionary of words with their rules and the generation steps
    return words_with_rules, list(generation_steps.values())

# PATTERN
def find_repeating_unit(word):
    # Tries to find the largest repeating unit at the start of the word.
    for i in range(1, len(word) // 2 + 1):  # Check different unit lengths
        unit = word[:i]
        if word.startswith(unit * (len(word) // i)):
            return unit
    return None

# PATTERN
def detect_pattern(words):
    # print(words)
    if not words:
        return []

    # Find the set of unique symbols
    symbols = set(''.join(words))

    patterns = []

    # Check if the language consists of only one symbol
    if len(symbols) == 1:
        patterns.append(f"{symbols.pop()}^n")

    # Check if the language consists of multiple symbols with one being a prefix of the other
    else:
        sorted_symbols = sorted(symbols)
        symbol_counts = [0] * len(sorted_symbols)
        # symbol_counts = [1] * len(sorted_symbols)
        for word in words:
            for i, symbol in enumerate(sorted_symbols):
                if word.startswith(symbol):
                    symbol_counts[i] += 1
                    break

        pattern_parts = []
        exponent_letters = ['n', 'm', 'j', 'k', 'l']  # Use different letters for exponents
        for symbol, count in zip(sorted_symbols, symbol_counts):
            if count >= 0:
                exponent_letter = exponent_letters.pop(0)
                pattern_parts.append(f"{symbol}^{exponent_letter}")

        if pattern_parts:
            patterns.append(''.join(pattern_parts))

    # If no clear pattern is detected, return an empty list
    return patterns

'''
def detect_pattern(words):
    if not words:
        return []

    # Find the set of unique symbols
    symbols = set(''.join(words))

    patterns = []

    # Check if the language consists of only one symbol
    if len(symbols) == 1:
        patterns.append(f"{symbols.pop()}^n")

    # Check if the language consists of multiple symbols with one being a prefix of the other
    else:
        sorted_symbols = sorted(symbols)
        symbol_counts = [0] * len(sorted_symbols) #not sorted but to go in the pattern order, needs to be modified
        for word in words:
            for i, symbol in enumerate(sorted_symbols):
                if word.startswith(symbol):
                    symbol_counts[i] += 1
                    break

        pattern_parts = []
        exponent_letters = ['n', 'm', 'j', 'k', 'l']  # Use different letters for exponents
        for symbol, count in zip(sorted_symbols, symbol_counts):
            if count > 0:
                exponent_letter = exponent_letters.pop(0)
                pattern_parts.append(f"{symbol}^{exponent_letter}")

        if pattern_parts:
            patterns.append(''.join(pattern_parts))

    # If no clear pattern is detected, return an empty list
    return patterns
'''
# PATTERN
def disp_lang(pattern):
    # Provides a displayable representation of the language pattern.
    return pattern if pattern else "No clear pattern detected"


@app.route('/fetchData', methods=['POST'])
@cross_origin(origin='http://localhost:5173')
def process_text():
    data = request.get_json()

    # Extracting data from the request
    terminal_symbols = data.get('terminalSymbols')
    nonterminal_symbols = data.get('nonterminalSymbols')
    starting_symbol = data.get('startingSymbol')
    rules = data.get('rules')

    # Generate the language and find the shortest words
    # max_length = 500  # This is the maximum length of the words we are printing from the language, for some reason it goes up till half of this
    language, shortest_words, other_words_or_error_message, _ = generate_language(terminal_symbols, nonterminal_symbols, starting_symbol, rules, max_length = 30)
    # Sort the language set by word length
    sorted_language = sorted(list(language), key=len)

    # Find the length of the shortest words
    shortest_word_length = len(sorted_language[0]) if sorted_language else 0

    # Split the sorted list into shortest words and other words
    shortest_words = [word for word in sorted_language if len(word) == shortest_word_length]
    other_words = [word for word in sorted_language if len(word) > shortest_word_length]
    words_and_rules, generation_steps = words_rules(terminal_symbols, nonterminal_symbols, starting_symbol, rules, max_length=30)

    
    # Detect the pattern
    detected_pattern = detect_pattern(other_words)
    # detected_pattern = detect_pattern(other_words, other_words)


    if isinstance(other_words_or_error_message, str):
        # It's an error message
        response_data = {
            'terminal_symbols': terminal_symbols,
            'nonterminal_symbols': nonterminal_symbols,
            'starting_symbol': starting_symbol,
            'rules': rules,
            'errorMessage': other_words_or_error_message,
            # 'errorMessageRules' : error_message_rules
        }
    else:
        # It's a list of other words
        response_data = {
            'terminal_symbols': terminal_symbols,
            'nonterminal_symbols': nonterminal_symbols,
            'starting_symbol': starting_symbol,
            'rules': rules,
            'language': list(language),
            'shortest_words': shortest_words,
            'other_words': other_words_or_error_message,
            # 'language_representation': disp_lang(pattern),
            'language_representation': detected_pattern if detected_pattern else 'No clear pattern detected',
            'words_with_rules': words_and_rules,
            'generationSteps': generation_steps
    }


    return jsonify(response_data)


@app.route("/")
def home():
    return "Hi! I'm backend :)"

if __name__ == "__main__":
    app.run(debug=True)
    