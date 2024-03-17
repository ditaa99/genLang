// import React from "react";
import icon from "../assets/icon.png";
import Menu from "./Menu";
import "./compStyling/info.css";
import git from "../assets/github.png";
import linkedin from "../assets/linkedin.png";

const Info = () => {
  //   const { index, invoice } = props;

  return (
    <div className="info">
      <Menu />
      <div className="content">
        <h3>Basic bakcground</h3>
        <p>
          The <b>Chomsky hierarchy</b> consists of four types of grammars and
          languages, each corresponding to a type of automaton:
        </p>
        <ul className="input-list">
          <li>
            <b>Type 0:</b> General Grammar
          </li>
          <li>
            <b>Type 1:</b> Context Dependent Grammar
          </li>
          <li>
            <b>Type 2:</b> Context Independent Grammar
          </li>
          <li>
            <b>Type 3:</b> Regular Grammar
          </li>
        </ul>

        <p>
          This software is supposed to help you (users) understand how to find
          the language that your given grammar generates.
        </p>
        <p>The software handles only <b>Regular Grammars</b> so far.</p>

        <h3>How to use:</h3>

        <p>On your left hand side input your:</p>
        <ul>
          <li><b>Terminal symbol(s)</b> - denoted by lowercase letters or numbers.</li>
          <li><b>Nonterminal symbol(s)</b> - denoted by uppercase letters.</li>
          <li><b>Starting symbol</b> is one of the nonterminal symbols</li>
        </ul>
        <p>
        • When inputting multiple symbols separate them with commas and no
          space.
        </p>
        <p>On your right hand side input your set of rules. <br/> Rules consist of a <b>nonterminal</b> symbol followed by a dash (-) and then a <b>terminal</b> symbol or <b>terminal nonterminal</b> symbol.
       </p>
       {/* <p>left handside (left from the dash) one capital (nonterminal symbol only) and the right handside one or two elements (either one terminal only or nonterminal terminal)</p> */}
        <p>
        • When inputting the rules, make sure to have space in between terminal and nonterminal symbols </p>
        <p>The accepted forms of the rules are: <br/>
        • nontermial - terminal<br/>
        • nontermial - terminal nontermial
        </p>
        <p>The non-accepted forms of the rules are: <br/>
        • nontermial - nontermial <br/>
        • nontermial - nontermial terminal <br/>
        • terminal - (anything) <br/>
        </p>
        <p>
          Click on the <i>Generate</i> button and wait for the magic to happen
          😊
        </p>

        <div className="imgContainer">
          <img src={icon} alt="Icon" className="icon" />
        </div>
      </div>

      <div className="copyright">
        <p>
          <b>© 2024</b> Dita Pelaj
          <br /> All Rights Reserved.
        </p>
        <a
          href="https://github.com/ditaa99"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={git} alt="GitHub Logo" className="logo" />
        </a>
        <a
          href="https://www.linkedin.com/in/dita-pelaj/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedin} alt="LinkedIn Logo" className="logo" />
        </a>
      </div>
    </div>
  );
};

export default Info;
