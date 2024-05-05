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
  const [rules, setRules] = useState([{id: uuidv4(), value: ""}]);
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
                placeholder="0,1,a,b,c"
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
                placeholder="S,A,B"
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
          <button
            type="button"
            value="Generate"
            className="btn"
            onClick={handleGenerateClick}
          >
            Generate
          </button>
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
      placeholder="S - aS"
    />
  ))}
  <div className="error-message">{rulesError}</div>
  {rulesDuplicateWarning && <p>{rulesDuplicateWarning}</p>}
</div>
      </div>

      <div className="solution">
        <p>
          <b>Generated words:</b>
        </p>
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
        <p>
          <b>Rules applied:</b>
        </p>
        {generationSteps &&
          generationSteps.map((step, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: step }} />
          ))}
      </div>

      <div className="lang">
        <h3>Generated Language:</h3>
        {generatedData && (
          <div>
            {generatedData.language_representation ? (
              <p
                className="language"
                dangerouslySetInnerHTML={{
                  __html: `L(G) = {${generatedData.language_representation.replace(
                    /\^(\w+)/g,
                    "<sup>$1</sup>"
                  )}}`,
                }}
              ></p>
            ) : generatedData.shortest_words.length === 1 &&
              !generatedData.other_words.length ? (
              <p
                className="language"
                dangerouslySetInnerHTML={{
                  __html: `L(G) = {${generatedData.shortest_words[0].replace(
                    /\^(\w+)/g,
                    "<sup>$1</sup>"
                  )} (This language only has one word.)`,
                }}
              ></p>
            ) : (
              <p className="language">
                No clear pattern detected or multiple words generated without a
                concise pattern.
              </p>
            )}
            Please double check the words to make sure of the pattern. I am
            still learning.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
