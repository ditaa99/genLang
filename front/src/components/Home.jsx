import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../index.css";
import Menu from "./Menu";
import Rule from "./Rule";
import handleGenerate from "./handleGenerate";

const Home = () => {
  const [terminalSymbols, setTerminalSymbols] = useState("");
  const [nonterminalSymbols, setNonterminalSymbols] = useState("");
  const [startingSymbol, setStartingSymbol] = useState("");
  const [rules, setRules] = useState([]);
  const [terminalSymbolsError, setTerminalSymbolsError] = useState(null);
  const [nonterminalSymbolsError, setNonterminalSymbolsError] = useState(null);
  const [startingSymbolError, setStartingSymbolError] = useState(null);
  const [rulesError, setRulesError] = useState(null);
  const [terminalDuplicateWarning, setTerminalDuplicateWarning] =
    useState(null);
  const [nonTerminalDuplicateWarning, setNonTerminalDuplicateWarning] =
    useState(null);
  const [generatedData, setGeneratedData] = useState(null);
  const [generationSteps, setGenerationSteps] = useState([]);

  const [rulesDuplicateWarning, setRulesDuplicateWarning] = useState(null);

  const addRule = () => {
    setRules((prevRules) => [...prevRules, { id: uuidv4(), value: "" }]);
  };

  const handleRuleChange = (id, updatedValue) => {
    setRules((prevRules) => {
      const updatedRules = prevRules.map((rule) =>
        rule.id === id ? { ...rule, value: updatedValue.trim() } : rule
      );
      return updatedRules;
    });
  };

  const onRemove = (id) => {
    setRules((prevRules) => prevRules.filter((rule) => rule.id !== id));
  };

  // const onInputChange = (index, updatedValue) => {
  //   handleRuleChange(index, updatedValue);
  // };

  const handleGenerateClick = () => {
    handleGenerate(
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
    );
  };

  return (
    <div className="App">
      <Menu />

      <div className="symb_rules">
        <div className="symbols">
          <div className="symbol-row">
            <div className="input-wrapper">
              <p className="label">Terminal symbols:</p>
              <textarea
                rows="1"
                cols="5"
                placeholder="Enter terminal symbol(s) here"
                value={terminalSymbols}
                onChange={(e) => setTerminalSymbols(e.target.value)}
              ></textarea>
            </div>
            {terminalSymbolsError && (
              <div className="error-message">{terminalSymbolsError}</div>
            )}

            {terminalDuplicateWarning && (
              <div className="warning-message">{terminalDuplicateWarning}</div>
            )}
          </div>
          <div className="symbol-row">
            <div className="input-wrapper">
              <p className="label">Nonterminal symbols:</p>
              <textarea
                rows="1"
                cols="5"
                placeholder="Enter nonterminal symbol(s) here"
                value={nonterminalSymbols}
                onChange={(e) => setNonterminalSymbols(e.target.value)}
              ></textarea>
            </div>{" "}
            <div className="error-message">{nonterminalSymbolsError}</div>
            {nonTerminalDuplicateWarning && (
              <div className="warning-message">
                {nonTerminalDuplicateWarning}
              </div>
            )}
          </div>
          <div className="symbol-row">
            <div className="input-wrapper">
              <p className="label">Starting symbol:</p>
              <textarea
                rows="1"
                cols="5"
                placeholder="S"
                value={startingSymbol}
                onChange={(e) => setStartingSymbol(e.target.value)}
              ></textarea>
            </div>{" "}
            <div className="error-message">{startingSymbolError}</div>
          </div>
        </div>

        <div className="rules">
          <div className="rules-top">
            <p className="label">Rules:</p>
            <button type="button" value="New" className="btn" onClick={addRule}>
              New
            </button>
          </div>
          {rules.map((rule, index) => (
            <Rule
              key={rule.id}
              id={rule.id}
              index={index}
              value={rule.value}
              onRemove={onRemove}
              onInputChange={handleRuleChange}
            />
          ))}
          <div className="error-message">{rulesError}</div>
          {rulesDuplicateWarning && <p>{rulesDuplicateWarning}</p>}
        </div>
      </div>

      <div className="solution">
        <button
          type="button"
          value="Generate"
          className="btn"
          onClick={handleGenerateClick}
        >
          Generate
        </button>
        {generatedData && (
          <div>
            {generatedData.language && generatedData.language.length > 0 ? (
              <div>
                {generatedData.shortest_words &&
                  generatedData.shortest_words.length > 0 && (
                    <p>
                      Shortest word(s):{" "}
                      {generatedData.shortest_words.join(", ")}
                    </p>
                  )}

                {generatedData.other_words &&
                generatedData.other_words.length > 0 &&
                generatedData.other_words[0] ===
                  "This language only has one word." ? (
                  <p>
                    This language only has one word:{" "}
                    {generatedData.shortest_words[0]}
                  </p>
                ) : (
                  <div className="words">
                    Other words:
                    {/* Filter out the shortest words */}
                    {generatedData.other_words
                      .filter(
                        (word) => !generatedData.shortest_words.includes(word)
                      )
                      .map((word, index) => (
                        <div key={index}>{word}</div>
                      ))}
                  </div>
                )}
              </div>
            ) : (
              <p>
                No words can be generated from the given grammar.
                <br /> Please write a terminating rule!
              </p>
            )}
          </div>
        )}
      </div>

      <div className="generationSteps">
        <p>Rules applied:</p>
        {generationSteps &&
          generationSteps.map((step, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: step }} />
          ))}
      </div>

      <div className="lang">
  <h3>Generated Language:</h3>
  {generatedData && (
    <div>
      {/* Check if there's a clear pattern or a special message */}
      {generatedData.language_representation ? (
        <p className="language">
          L(G) = &#123; {generatedData.language_representation} &#125;
        </p>
      ) : generatedData.shortest_words.length === 1 && !generatedData.other_words.length ? (
        // Check if there's only one word in the language
        <p className="language">
          L(G) = &#123; {generatedData.shortest_words[0]} &#125; (This language only has one word.)
        </p>
      ) : (
        // Fallback if no pattern detected and more than one word exists
        <p className="language">
          No clear pattern detected or multiple words generated without a concise pattern.
        </p>
      )}
    </div>
  )}
</div>

    </div>
  );
};

export default Home;
