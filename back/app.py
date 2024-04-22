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
from flask_cors import cross_origin
from itertools import permutations
import re


app = Flask(__name__)
# cors = CORS(app) 
# cors = CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

def find_repeating_unit(word):
    """Tries to find the largest repeating unit at the start of the word."""
    for i in range(1, len(word) // 2 + 1):  # Check different unit lengths
        unit = word[:i]
        if word.startswith(unit * (len(word) // i)):
            return unit
    return None


def generate_language(terminal_symbols, nonterminal_symbols, starting_symbol, rules, max_length=20):
    # Convert symbols to sets for faster lookup
    terminal_symbols = set(terminal_symbols)
    nonterminal_symbols = set(nonterminal_symbols)

    # Create a dictionary to represent the grammar
    grammar = {}
    for rule in rules:
        if "->" in rule:
            lhs, rhs = rule.split("->")
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
            if not shortest_words:
                shortest_words.append(current_string)  # Add the first word as the shortest word
            elif len(current_string) == len(shortest_words[0]):
                shortest_words.append(current_string)  # Add words with the same length as the shortest words
            return

        # Check if the current length exceeds the maximum allowed length
        if current_length >= max_length:
            return

        # Expand the current string by applying the grammar rules
        for i in range(len(current_string)):
            symbol = current_string[i]
            if symbol in nonterminal_symbols:
                for rhs in grammar.get(symbol, []):
                    new_string = current_string[:i] + rhs + current_string[i+1:]
                    generate_words(new_string, current_length + len(rhs) - 1)

    # Call the helper function with the starting symbol
    generate_words(starting_symbol, len(starting_symbol))

    # Separate other words from shortest words
    other_words = [word for word in language if word not in shortest_words]

    # Detect the pattern
    detected_pattern = detect_pattern(other_words)

    # Return the language, shortest words, other words, and the detected pattern
    return detected_pattern



'''def detect_pattern(base_words, words):
    if not words:
        return []

    # Find the set of unique symbols
    symbols = set(''.join(words))

    patterns = []

    # Check if the language consists of only one symbol
    if len(symbols) == 1:
        patterns.append(f"{symbols.pop()}^n")

    # Check if the language consists of two or more symbols
    # if len(symbols) >= 2:
    #     # Create a sorted string of symbols for matching
    #     sorted_symbols = ''.join(sorted(symbols))
    if len(symbols) >= 2:
        # Combine symbols into a single string for easier pattern matching
        # combined_symbols = ''.join(symbols)
        sorted_symbols = ''.join(sorted(symbols))
        pattern = f"{sorted_symbols}"  # Match any order of symbols
        pattern = re.compile(pattern)  # Compile the pattern for efficiency

        if all(pattern.search(word) for word in base_words):
            patterns.append(pattern.pattern)  # Append the full pattern string

    # Check for Consecutive Substrings (more general than your previous permutation check)
    all_substrings = set()
    for word in words:
        for i in range(1, len(word)):
            for j in range(len(word) - i + 1):
                substring = word[j:j+i]
                all_substrings.add(substring) 

    for substring in all_substrings:
        if all(substring in word for word in base_words):
            patterns.append(substring)

    # Check for Alternating Patterns
    for word in words:
        if len(word) % 2 == 0:  # Check only words suitable for alternation
            prefix = word[:len(word)//2]
            if all(w.startswith(prefix) for w in base_words):
                patterns.append(f"({prefix})*") 
    
    
        # Check for permutations of symbols within words
        # for perm in permutations(sorted_symbols):
        #     pattern = "".join(f"{symbol}^n" for symbol in perm)
        #     if all(word.startswith(pattern) for word in base_words):  # Compare to original words
        #         patterns.append(pattern)
        #         break
        for perm in permutations(sorted_symbols):
            pattern = "".join(f"{symbol}" for symbol in perm)  # No "^n" for substring matching
            if all(pattern in word for word in base_words): 
                patterns.append(pattern)
                # break  # You might want to find all matching patterns, not just the first one

    return patterns  
'''

# def detect_pattern(words):
#     if not words:
#         return []

#     # Find the set of unique symbols
#     symbols = set(''.join(words))

#     patterns = []

#     # Check if the language consists of only one symbol
#     if len(symbols) == 1:
#         patterns.append(f"{symbols.pop()}^n")

#     # Check if the language consists of multiple symbols with one being a prefix of the other
#     else:
#         sorted_symbols = sorted(symbols)
#         symbol_counts = [0] * len(sorted_symbols)
#         for word in words:
#             for i, symbol in enumerate(sorted_symbols):
#                 if word.startswith(symbol):
#                     symbol_counts[i] += 1
#                     break

#         pattern_parts = []
#         exponent_letters = ['n', 'm', 'j', 'k', 'l']  # Use different letters for exponents
#         for symbol, count in zip(sorted_symbols, symbol_counts):
#             if count > 0:
#                 exponent_letter = exponent_letters.pop(0)
#                 pattern_parts.append(f"{symbol}^{exponent_letter}")

#         if pattern_parts:
#             patterns.append(''.join(pattern_parts))

#     # If no clear pattern is detected, return an empty list
#     return patterns


'''def detect_pattern(words):
    if not words:
        return []

    # Find the set of unique symbols
    symbols = set(''.join(words))

    patterns = []

    # Check if the language consists of only one symbol
    if len(symbols) == 1:
        patterns.append(f"{symbols.pop()}^n")

    # Check if the language consists of multiple parts separated by different symbols
    else:
        sorted_symbols = sorted(symbols)
        symbol_counts = [0] * len(sorted_symbols)
        pattern_parts = []
        exponent_letters = ['n', 'm', 'j', 'k', 'l']

        for word in words:
            current_index = 0
            current_part = []

            while current_index < len(word):
                symbol = word[current_index]
                symbol_index = sorted_symbols.index(symbol)
                symbol_counts[symbol_index] += 1

                # Check if the current symbol is the same as the previous symbol in the current part
                if current_part and current_part[-1][0] == symbol:
                    current_part[-1][1] += 1
                else:
                    current_part.append([symbol, 1])

                current_index += 1

            for part in current_part:
                symbol, count = part
                if exponent_letters:
                    exponent_letter = exponent_letters.pop(0)
                    pattern_part = f"{symbol}^{exponent_letter}"
                    pattern_parts.append(pattern_part)

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
        symbol_counts = [0] * len(sorted_symbols)
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



"""def detect_pattern(words):
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
        for word in words:
            for i, symbol in enumerate(sorted_symbols):
                if word.startswith(symbol):
                    symbol_counts[i] += 1
                    break

        pattern_parts = []
        for symbol, count in zip(sorted_symbols, symbol_counts):
            if count > 0:
                pattern_parts.append(f"{symbol}^n")

        if pattern_parts:
            patterns.append(''.join(pattern_parts))

    # If no clear pattern is detected, return an empty list
    return patterns
"""


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
    max_length = 30  # This is the maximum length of the words we are printing from the language
    # language, shortest_words = generate_language(terminal_symbols, nonterminal_symbols, starting_symbol, rules, max_length)
    language, shortest_words, other_words_or_error_message, _ = generate_language(terminal_symbols, nonterminal_symbols, starting_symbol, rules, max_length)
    # Sort the language set by word length
    sorted_language = sorted(list(language), key=len)

    # Find the length of the shortest words
    shortest_word_length = len(sorted_language[0]) if sorted_language else 0

    # Split the sorted list into shortest words and other words
    shortest_words = [word for word in sorted_language if len(word) == shortest_word_length]
    other_words = [word for word in sorted_language if len(word) > shortest_word_length]
    
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
            'errorMessage': other_words_or_error_message
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
            # 'language_representation': disp_lang()
            'language_representation': detected_pattern if detected_pattern else 'No clear pattern detected'    
    }

    return jsonify(response_data)


@app.route("/")
def home():
    return "Hi! I'm backend :)"

if __name__ == "__main__":
    app.run(debug=True)
    