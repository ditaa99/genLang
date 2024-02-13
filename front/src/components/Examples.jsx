// import React from 'react';
import Menu from "./Menu";
import "./compStyling/examples.css";
import PropTypes from 'prop-types'; 

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
        <h3>Type 3: Regular Grammar</h3>
        <p>
          If given a grammar like this:
          <b></b> G=〈&#123;a,b&#125;, &#123;S, A, B&#125;, S,
          &#123;S&#x2192;aS| aB, B&#x2192;b | aS | bA, A&#x2192;a&#125;〉
        </p>
        <div>
          <p>[ &#x2192; ]</p>
          <var className="array">
            &#x2192;<span>a</span>
          </var>
        </div>
        <CustomArrow overArr="a" />
        {/* <div className="equation">
          <div className="equation-content">
            <span className="equation-part">A</span>
            <div className="arrow">
              <span className="rule-label">#</span>
              <div className="arrowblock">
                <div className="arrowright"></div>
                <div className="rectcontainer">
                  <div className="rect"></div>
                  <div className="rect"></div>
                  <div className="rect"></div>
                </div>
              </div>
            </div>
            <span className="equation-part">B</span>
          </div>
        </div> */}
        <p>
          Let’s see what we get from these rules. Shortest word that we can
          generate is: S <CustomArrow overArr="#2" /> aB <CustomArrow overArr="#3" /> ab
        </p>
        <p>Other rules iterations give us these kinds of results:</p>
        <ul>
          <li>
            S <CustomArrow overArr="#1" /> aS <span className="shrink"><CustomArrow overArr="#1 (n-2)times" /></span> a<sup>n-1</sup>S
            <CustomArrow overArr="#2" /> a<sup>n</sup> B &#x2192;
          </li>
          <li className="tabbed">
            1. <CustomArrow overArr="#3" /> a<sup>n</sup> b
          </li>
          <li className="tabbed">
            2. <CustomArrow overArr="#4" /> a<sup>n</sup> S (this way we add more a-s)
          </li>
          <li className="tabbed">
            3. <CustomArrow overArr="#5" /> a<sup>n</sup> bA <CustomArrow overArr="#6" /> a<sup>n</sup> ba
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
      </div>
    </div>
  );
};

export default Examples;
