from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_cors import cross_origin
from itertools import permutations
import re
import os

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

    # If no rule terminates, return an empty dictionary
    if not terminates:
        return {}, []

    # Initialize word tracking dictionary and generation steps list
    words_with_rules = {}
    generation_steps = []

    # Helper function to generate words with their derivation histories
    def generate_words_with_rules(current_string, current_length, derivation_history):
        # Check if the current string consists of only terminal symbols
        if all(symbol in terminal_symbols for symbol in current_string):
            words_with_rules[current_string] = derivation_history.copy()
            # Construct the string representing applied rules and generated word
            applied_rules = "; ".join(derivation_history)
            # print(f"{applied_rules} word generated: {current_string}")
            # Inside the backend function where generation steps are constructed
            generation_steps.append(f"<span class='words'>{applied_rules};</span> <span class='word-generated'>word generated: {current_string}</span>")
            # generation_steps.reverse() 
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
    generation_steps.sort(key=len)
    # Return the dictionary of words with their rules and the generation steps
    return words_with_rules, generation_steps

#PATTERN
def detect_pattern(words):
    if not words:
        return "No language was generated"

    # Check if all words are made of the same character
    first_char = words[0][0]
    if all(word == first_char * len(word) for word in words):
        # Check if lengths of words are consecutive numbers
        lengths = [len(word) for word in words]
        if sorted(lengths) == list(range(min(lengths), max(lengths) + 1)):
            print (f"{first_char}^n")
            return f"{first_char}^n"

    # Detect all symbols used in the language and maintain order of appearance
    symbols = []
    observed_symbols = set()
    for word in words:
        for char in word:
            if char not in observed_symbols:
                observed_symbols.add(char)
                symbols.append(char)

    # Single symbol repeated across all words
    if len(symbols) == 1:
        symbol = symbols[0]
        counts = [word.count(symbol) for word in words]
        if all(count > 6 for count in counts):
            return f"{symbol}^n"
        return f"{symbol}" * counts[0]  # All words will be the same in this case

    # Prepare to analyze multiple symbols
    exponent_letters = ['n', 'm', 'j', 'k', 'l']
    patterns = []

    # Check if all words follow the pattern a^n b^n
    a_counts = [word.count('a') for word in words]
    b_counts = [word.count('b') for word in words]
    if all(a_count <= 1 and b_count > 6 for a_count, b_count in zip(a_counts, b_counts)):
        patterns.append('a')
        patterns.append(f"b^{exponent_letters.pop(0)}")
        print(' '.join(patterns))
        return ' '.join(patterns)

    # Check if all words follow the pattern b^n a^n
    b_counts = [word.count('b') for word in words]
    a_counts = [word.count('a') for word in words]
    if all(b_count <= 6 and a_count > 6 for b_count, a_count in zip(b_counts, a_counts)):
        patterns.append(f"b^{exponent_letters.pop(0)}")
        patterns.append(f"a^{exponent_letters.pop(0)}")
        print(' '.join(patterns))
        return ' '.join(patterns)

    # Analyze patterns by checking all words start with the same repeating unit
    common_start = find_repeating_unit(words[0])
    if common_start and all(word.startswith(common_start) for word in words):
        repeat_count = len(common_start)
        if repeat_count > 6:
            patterns.append(f"{common_start[0]}^n")
        else:
            patterns.append(common_start)

        # Remove the common part and recurse on the rest
        remaining_parts = [word[len(common_start):] for word in words if len(word) > len(common_start)]
        if remaining_parts:
            next_pattern = detect_pattern(remaining_parts)
            patterns.append(next_pattern)

    # If patterns are complex and involve different starts
    else:
        pattern_parts = []
        for symbol in symbols:  # Using order of appearance for consistent pattern representation
            counts = [word.count(symbol) for word in words]
            max_count = max(counts)
            if max_count > 6:
                if exponent_letters:
                    pattern_parts.append(f"{symbol}^{exponent_letters.pop(0)}")
                else:
                    pattern_parts.append(f"{symbol}^n")
            elif max_count > 0:
                pattern_parts.append(f"{symbol}" * max_count)

        if pattern_parts:
            patterns.extend(pattern_parts)


    if patterns:
        print(' '.join(patterns))
        return ' '.join(patterns)
    else:
        return "No clear pattern detected"

def find_repeating_unit(word):
    # Tries to find the largest repeating unit at the start of the word.
    for i in range(1, len(word) // 2 + 1):  # Check different unit lengths
        unit = word[:i]
        if word.startswith(unit * (len(word) // len(unit))):
            return unit
    return None

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
    language, shortest_words, other_words_or_error_message, _ = generate_language(terminal_symbols, nonterminal_symbols, starting_symbol, rules, max_length = 32)
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
            'language_representation': detected_pattern,
            # 'language_representation': detected_pattern if detected_pattern else 'No clear pattern detected',
            'words_with_rules': words_and_rules,
            'generationSteps': generation_steps
    }


    return jsonify(response_data)


@app.route("/")
def home():
    return "Hi! I'm backend :)"

if __name__ == "__main__":
    app.run(debug=True)
    