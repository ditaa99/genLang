import axios from "axios";

const handleGenerate = async (
  terminalSymbols,
  nonterminalSymbols,
  startingSymbol,
  rules,
  setTerminalSymbolsError,
  setNonterminalSymbolsError,
  setStartingSymbolError,
  setRulesError,
  setTerminalDuplicateWarning,
  setNonTerminalDuplicateWarning,
  setGeneratedData
) => {
  // Validation
  let hasError = false;

  if (!validateTerminalSymbols(terminalSymbols)) {
    setTerminalSymbolsError(
      "Terminal symbols should be small letters or numbers separated by commas."
    );
    hasError = true;
  } else {
    setTerminalSymbolsError(null);
  }

  if (!validateNonterminalSymbols(nonterminalSymbols)) {
    setNonterminalSymbolsError(
      "Nonterminal symbols should be capital letters separated by commas."
    );
    hasError = true;
  } else {
    setNonterminalSymbolsError(null);
  }

  if (!validateStartingSymbol(startingSymbol)) {
    setStartingSymbolError(
      "Starting symbol should be a single capital letter."
    );
    hasError = true;
  } else {
    setStartingSymbolError(null);
  }

  if (!nonterminalSymbols.includes(startingSymbol)) {
    setStartingSymbolError(
      "Starting symbol must be a valid nonterminal symbol."
    );
    hasError = true;
  }

  // Check for duplicates in Terminal Symbols
  const terminalSymbolsArray = terminalSymbols.split(",");
  const hasTerminalDuplicates =
    new Set(terminalSymbolsArray).size !== terminalSymbolsArray.length;

  // Check for validity of nonterminal and terminal symbols in rules
  const nonterminalSet = new Set(nonterminalSymbols.split(","));
  const terminalSet = new Set(terminalSymbols.split(","));

  if (hasTerminalDuplicates) {
    setTerminalDuplicateWarning(
      "Warning: You have entered duplicate symbols in Terminal symbols."
    );
  } else {
    setTerminalDuplicateWarning(null);
  }

  // Check for duplicates in Nonterminal Symbols
  const nonTerminalSymbolsArray = nonterminalSymbols.split(",");
  const hasNonTerminalDuplicates =
    new Set(nonTerminalSymbolsArray).size !== nonTerminalSymbolsArray.length;

  if (hasNonTerminalDuplicates) {
    setNonTerminalDuplicateWarning(
      "Warning: You have entered duplicate symbols in Nonterminal symbols."
    );
  } else {
    setNonTerminalDuplicateWarning(null);
  }

  if (rules.length === 0) {
    setRulesError("You must have at least a rule.");
    hasError = true;
  } else {
    // Check for empty rules
    const hasEmptyRule = rules.some((rule) => rule === "");
    if (hasEmptyRule) {
      setRulesError("Rules cannot be empty");
      hasError = true;
    } else {
      // Check for rules without '-'
      const hasRuleWithoutDash = rules.some((rule) => !rule.includes("-"));
      if (hasRuleWithoutDash) {
        setRulesError("Each rule should contain a '-' symbol.");
        hasError = true;
      } else {
        // More specific rule validation
        const validRuleSymbols = rules.every((rule) => {
          const [leftSide, rightSide] = rule.trim().split("-");
          const nonterminal = leftSide.trim();
          const symbols = rightSide.trim().split(/\s+/);

          // Check if the nonterminal symbol is in the set of nonterminal symbols
          if (!nonterminalSet.has(nonterminal)) {
            setRulesError(
              `Rule "${rule}" contains an invalid nonterminal symbol.`
            );
            return false;
          }

          // Check if all symbols on the right side are either in the terminal or nonterminal sets
          for (const symbol of symbols) {
            if (!nonterminalSet.has(symbol) && !terminalSet.has(symbol)) {
              setRulesError(
                `Rule "${rule}" contains an invalid symbol: ${symbol}`
              );
              return false;
            }
          }

          // Check if the rule is of the form "nonterminal - terminal" or "nonterminal - terminal nonterminal"
          if (symbols.length === 1 && !terminalSet.has(symbols[0])) {
            setRulesError(
              `Rule "${rule}" must be of the form "NonterminalSymbol - TerminalSymbol".`
            );
            return false;
          } else if (
            symbols.length > 1 &&
            !nonterminalSet.has(symbols[symbols.length - 1])
          ) {
            setRulesError(
              `Rule "${rule}" must end with a valid nonterminal symbol.`
            );
            return false;
          } else if (
            symbols.length > 2 || // Rule contains more than two symbols
            (symbols.length === 2 && terminalSet.has(symbols[1])) // Rule has two symbols, but the second one is terminal
          ) {
            setRulesError(
              `Rule "${rule}" must be of the form "NonterminalSymbol - TerminalSymbol NonterminalSymbol".`
            );
            return false;
          }

          return true;
        });

        if (!validRuleSymbols) {
          hasError = true;
        }
        else {setRulesError(null)}
      }
    }

    if (hasError) {
      return;
    }
  }

  // Prepare data without duplicates
  const uniqueTerminalSymbols = Array.from(new Set(terminalSymbols.split(",")));
  const uniqueNonterminalSymbols = Array.from(
    new Set(nonterminalSymbols.split(","))
  );

  if (!validateTerminalSymbols(terminalSymbols)) {
    setTerminalSymbolsError("Terminal symbols should be... ");
  } else {
    setTerminalSymbolsError(null); // Reset error if validation passes
  }
  

  // Data to send (using processed unique symbol sets)
  const requestData = {
    terminalSymbols: uniqueTerminalSymbols.join(","), // Join back into comma-separated strings
    nonterminalSymbols: uniqueNonterminalSymbols.join(","),
    startingSymbol: startingSymbol,
    rules: rules,
  };

  try {
    const response = await axios.post(
      "http://localhost:5000/fetchData",
      requestData
    );
    setGeneratedData(response.data); // Store received data
  } catch (error) {
    console.error("Error generating language:", error);
  }
};

// Validation functions
const validateTerminalSymbols = (symbols) => {
  const regex = /^[a-z0-9,]+$/; // Allows small letters, numbers, and commas
  return regex.test(symbols.trim());
};

const validateNonterminalSymbols = (symbols) => {
  const regex = /^[A-Z,]+$/; // Allows capital letters and commas
  return regex.test(symbols.trim());
};

const validateStartingSymbol = (symbol) => {
  const regex = /^[A-Z]$/; // Allows a single capital letter
  return regex.test(symbol.trim());
};

export default handleGenerate;
