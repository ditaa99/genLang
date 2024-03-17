import Menu from "./Menu";
import "./compStyling/examples.css";
import PropTypes from "prop-types";

const CustomArrow = ({ overArr }) => {
  return (
    <var className="array">
      &#x2192;<span>{overArr}</span>&nbsp;
    </var>
  );
};
CustomArrow.propTypes = {
  overArr: PropTypes.string.isRequired,
};

const Examples = () => {
  return (
    <div className="examples">
      <Menu />
      <div className="example1">
        <h3>Type 0: General Grammars</h3>
        <p>
          If given a grammar like this:
          <b></b> G=〈&#123;a,b&#125;, &#123;S, A, B&#125;, S, &#123; &#125;〉
        </p>
        <h3>Type 1: Context-dependent Grammars</h3>
        <p>
          If given a grammar like this:
          <b></b> G=〈&#123;a,b&#125;, &#123;S, A, B&#125;, S, &#123; &#125;〉
        </p>
        <h3>Type 2: Context-independent Grammars</h3>
        <p>
          If given a grammar like this:
          <b></b> G=〈&#123;a,b&#125;, &#123;S&#125;, S, &#123;S&#x2192; aSb |
          Sb | b &#125;〉
        </p>
        <p>
          Let’s see what we get from these rules. Shortest word that we can
          generate is: S <CustomArrow overArr="#1" /> aSb{" "}
          <CustomArrow overArr="#3" /> abb
        </p>
        <p>Other rules iterations give us these kinds of results:</p>
        <ul>
          <li>
            S <CustomArrow overArr="#1" /> aSb{" "}
            <span className="shrink">
              <CustomArrow overArr="#1 n-times" />
            </span>{" "}
            a<sup>n</sup>Sb<sup>n</sup> &#x2192;
          </li>
          <li className="tabbed">
            1. <CustomArrow overArr="#3" /> a<sup>n</sup> b<sup>n+1</sup>
          </li>
          <li className="tabbed">
            2. <CustomArrow overArr="#2 k-times" /> a<sup>n</sup>Sb
            <sup>n+k</sup> <CustomArrow overArr="#3" /> a<sup>n</sup>Sb
            <sup>n+k+1</sup>(this way we add more b-s)
          </li>
        </ul>
        <p>So we can generate these kinds of words:</p>
        <ul>
          <li>
            a<sup>n</sup> b<sup>n+1</sup>
          </li>
          <li>
            a<sup>n</sup> b<sup>n+k+1</sup>
          </li>
        </ul>
        <p>
          In general, we can say that the generated language is:{" "}
          <b>
            L(G) = &#123;a<sup>n</sup>b<sup>m</sup>; n,m ∈ ℕ, n &lt; m &#125;
          </b>
        </p>

        <h3>Type 3: Regular Grammar</h3>
        <p>
          If given a grammar like this:
          <b></b> G=〈&#123;a,b&#125;, &#123;S, A, B&#125;, S,
          &#123;S&#x2192;aS| aB, B&#x2192;b | aS | bA, A&#x2192;a&#125;〉
        </p>
        
        <p>
          Let’s see what we get from these rules. Shortest word that we can
          generate is: S <CustomArrow overArr="#2" /> aB{" "}
          <CustomArrow overArr="#3" /> ab
        </p>
        <p>Other rules iterations give us these kinds of results:</p>
        <ul>
          <li>
            S <CustomArrow overArr="#1" /> aS{" "}
            <span className="shrink">
              <CustomArrow overArr="#1 (n-2)times" />
            </span>{" "}
            a<sup>n-1</sup>S
            <CustomArrow overArr="#2" /> a<sup>n</sup> B &#x2192;
          </li>
          <li className="tabbed">
            1. <CustomArrow overArr="#3" /> a<sup>n</sup> b
          </li>
          <li className="tabbed">
            2. <CustomArrow overArr="#4" /> a<sup>n</sup> S (this way we add
            more a-s)
          </li>
          <li className="tabbed">
            3. <CustomArrow overArr="#5" /> a<sup>n</sup> bA{" "}
            <CustomArrow overArr="#6" /> a<sup>n</sup> ba
          </li>
        </ul>
        <p>So we can generate these kinds of words:</p>
        <ul>
          <li>
            a<sup>n</sup> b
          </li>
          <li>
            a<sup>n</sup> ba
          </li>
        </ul>
        <p>
          In general, we can say that the generated language is:{" "}
          <b>
            L(G) = &#123;a<sup>n</sup> n a<sup>k</sup>; n ∈ ℕ, n &ge; 1, and
            k=&#123;0, 1&#125;&#125;
          </b>
        </p>

        <br />

        <h3>Good to know:</h3>
        <p>It`s also good to know that not every language can be generated</p>
        <p>
          For example: &#123;{" "}
          <b>
            1<sup>p</sup>
          </b>
          , where <b>p</b> is a prime number&#125; can not be generated
        </p>
        {/* <p>TEST TEST</p>
        <ul>
          <li>
            S <CustomArrow overArr="#1" /> aSb{" "}
            <span className="shrink">
              <CustomArrow overArr="#1 n-times" />
            </span>{" "}
            a<sup>n</sup>Sb<sup>n</sup> &#x2192;
          </li>
          <li className="tabbed">1. rules</li>
          <li className="tabbed">2. rules</li>
        </ul>
        <p>TEST</p>
        <ul>
          <li>
            a<sup>n</sup> b
          </li>
          <li>
            a<sup>n</sup> ba
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default Examples;
