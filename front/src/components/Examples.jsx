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
          There is no restriction in the rules of general grammars. So, the
          language generated by general grammars includes all possible
          combinations of symbols of the alphabet.
        </p>
        <h3>Type 1: Context-dependent Grammars</h3>
        <p>
          If given a grammar like this:
          <b></b> G=〈&#123;a,b&#125;, &#123;S, A, B, C&#125;, S, &#123;S → aSBC
          | aBC, CB → BC, aB → ab, bB → bb, bC → bc, cC → cc &#125;〉
        </p>
        <p>
          This grammar works as follows:
          <br />• <b>Rule 1</b> generates strings of a-s followed by an equal
          number of B-s and C-s. It also allows the derivation to terminate by
          switching from ‘S’ to ‘aBC’.
          <br />• <b>Rules 2</b> through <b>6</b> are used to move B-s to the
          left of C-s and convert B-s to b-s and C-s to c-s, ensuring that the
          number of a-s, b-s, and c-s remain equal.
        </p>
        <p>Shortest word can be generated this way: 
        S <CustomArrow overArr="#2" /> aBC <CustomArrow overArr="#4" /> abC <CustomArrow overArr="#6" />  abc.
        </p>
        <p>
          To generate a string in L, such as “aaabbbccc” (where n=3), you would
          follow these derivation steps:
        <br/>
        S <CustomArrow overArr="#1" /> aSBC <CustomArrow overArr="#1" /> aaSBCBC <CustomArrow overArr="#2" /> aaaBCBCBC <CustomArrow overArr="#3" /> aaaBBCCBC <CustomArrow overArr="#3" /> aaaBBBCCC <CustomArrow overArr="#4" /> aaabBBCCC <CustomArrow overArr="#5" /> aaabbBCCC <CustomArrow overArr="#5" /> aaabbbCCC <CustomArrow overArr="#6" /> aaabbbcCC <CustomArrow overArr="#7" /> aaabbbccC <CustomArrow overArr="#7" /> aaabbbccc </p>
        <p>So in general, the amount of repetition of first rule, will define how much n is in the expression a<sup>n</sup>b<sup>n</sup>c<sup>n</sup>.
        <br/>
        S<CustomArrow overArr="#1" />aSBC<CustomArrow overArr="#1 (n-2)times" /> a<sup>n-1</sup>S(BC)<sup>n-1</sup> <CustomArrow overArr="#2" /> a<sup>n</sup>BCBCBC...BC<CustomArrow overArr="#3" />a<sup>n</sup>BBCCBC...BC <CustomArrow overArr="#3 (n-1)times" /> a<sup>n</sup>B<sup>n</sup>C<sup>n</sup> 
        <CustomArrow overArr="#4" />a<sup>n</sup>bB<sup>n-1</sup>C<sup>n</sup> <CustomArrow overArr="#5 (n-1)times" /> a<sup>n</sup>b<sup>n</sup>C<sup>n</sup> <CustomArrow overArr="#6" /> a<sup>n</sup>b<sup>n</sup>cC<sup>n-1</sup> 
 <CustomArrow overArr="#7 (n-1)times" />a<sup>n</sup>b<sup>n</sup>c<sup>n</sup> 
        </p>
        <p>We can say that the generated language is:{" "}
          <b>
            L(G) = &#123;a<sup>n</sup>b<sup>n</sup>c<sup>n</sup>; n∈ ℕ &#125;
          </b></p>
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

        <h3>Type 3: Regular Grammars</h3>
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
            L(G) = &#123;a<sup>n</sup> b a<sup>k</sup>; n ∈ ℕ, n &ge; 1, and
            k=&#123;0, 1&#125;&#125;
          </b>
        </p>

        <br />

      </div>
    </div>
  );
};

export default Examples;
