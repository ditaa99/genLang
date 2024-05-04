import axios from "axios";
axios.defaults.headers.post["Access-Control-Allow-Origin"] =
  // "http://localhost:5173"
  "https://formallanguages.fly.dev/";

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

const validateRulesForDuplicates = (rules) => {
  const ruleValues = rules.map((rule) => rule.value);
  const uniqueValues = new Set(ruleValues);

  return uniqueValues.size !== ruleValues.length ? (
    <span className="warning-message">Warning: Duplicate rules found.</span>
  ) : null;
};

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
  setGeneratedData,
  setGenerationSteps,
  setRulesDuplicateWarning
) => {
  // Convert rules from objects to strings for validation
  const ruleStrings = rules.map((rule) => rule.value.trim());

  // Rule validation
  const rulesError = validateRulesForDuplicates(rules);
  setRulesError(rulesError); // Set error if there are duplicates
  setRulesDuplicateWarning(rulesError); // Set warning message for duplicate rules

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

  if (ruleStrings.length === 0) {
    setRulesError("You must have at least a rule.");
    hasError = true;
  } else {
    const hasEmptyRule = ruleStrings.some((ruleString) => ruleString === "");
    if (hasEmptyRule) {
      setRulesError("Rules cannot be empty");
      hasError = true;
    } else {
      const hasRuleWithoutDash = ruleStrings.some(
        (ruleString) => !ruleString.includes("-")
      );
      if (hasRuleWithoutDash) {
        setRulesError("Each rule should contain a '-' symbol.");
        hasError = true;
      } else {
        const nonterminalSet = new Set(nonterminalSymbols.split(","));
        const terminalSet = new Set(terminalSymbols.split(","));
        const validRuleSymbols = ruleStrings.every((ruleString) => {
          const [leftSide, rightSide] = ruleString.trim().split("-");
          const nonterminal = leftSide.trim();
          const symbols = rightSide.trim().split(/(?=\S)/); // Split each symbol without considering spaces between them

          if (!nonterminalSet.has(nonterminal)) {
            setRulesError(
              `Rule "${ruleString}" contains an invalid nonterminal symbol.`
            );
            return false;
          }

          for (const symbol of symbols) {
            if (!nonterminalSet.has(symbol) && !terminalSet.has(symbol)) {
              setRulesError(
                `Rule "${ruleString}" contains an invalid symbol: ${symbol}`
              );
              return false;
            }
          }

          if (symbols.length === 1 && !terminalSet.has(symbols[0])) {
            setRulesError(
              `Rule "${ruleString}" must be of the form "NonterminalSymbol - TerminalSymbol".`
            );
            return false;
          } else if (
            symbols.length > 1 &&
            !nonterminalSet.has(symbols[symbols.length - 1])
          ) {
            setRulesError(
              `Rule "${ruleString}" must end with a valid nonterminal symbol.`
            );
            return false;
          } else if (
            symbols.length > 2 ||
            (symbols.length === 2 && terminalSet.has(symbols[1]))
          ) {
            setRulesError(
              `Rule "${ruleString}" must be of the form "NonterminalSymbol - TerminalSymbol NonterminalSymbol".`
            );
            return false;
          }

          return true;
        });

        if (!validRuleSymbols) {
          hasError = true;
        } else {
          setRulesError(null);
        }
      }
    }
  }

  if (hasError) {
    return;
  }

  // Prepare data without duplicates
  const uniqueTerminalSymbols = Array.from(new Set(terminalSymbols.split(",")));
  const uniqueNonterminalSymbols = Array.from(
    new Set(nonterminalSymbols.split(","))
  );

  // Data to send (using processed unique symbol sets)
  const requestData = {
    terminalSymbols: uniqueTerminalSymbols.join(","),
    nonterminalSymbols: uniqueNonterminalSymbols.join(","),
    startingSymbol: startingSymbol,
    rules: ruleStrings, // Send the string representation of rules
  };

  try {
    const response = await axios.post(
      // "http://localhost:5000/fetchData",
      "https://formallanguages.fly.dev/fetchData", 
      requestData
    );
    console.log("Response from backend:", response); // Inspect the response
    setGeneratedData({
      ...response.data,
      // generationSteps: response.data.generationSteps,
      rules: response.data.rules,
    });
    setGenerationSteps(response.data.generationSteps);
  } catch (error) {
    if (error.response) {
      // Server responded with an error
      console.error("Server Error:", error.response.data);
      console.error("Server Error Status:", error.response.status);
      setGeneratedData(null);
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network Error:", error.request);
      setGeneratedData(null);
    } else {
      // Something else happened while setting up the request
      console.error("Error:", error.message);
      setGeneratedData(null);
    }
  }
};

export default handleGenerate;
