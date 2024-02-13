// import React from 'react';
import Menu from './Menu';
import './compStyling/examples.css';

const Examples = () => {
  return (
    <div className="examples">
      <Menu />
      <div className="example1">
        <h3>Type 3: Regular Grammar</h3>
        <p>
          If given a grammar like this:
          <b></b> G=〈&#123;a,b&#125;, &#123;S, A, B&#125;, S, &#123;S&#x2192;aS| aB, B&#x2192;b | aS | bA, A&#x2192;a&#125;〉
        </p>
        <div>
          <p>
          [ &#x2192; ]
          </p>
        <var className="vector">&#x2192;<span>a</span></var>
        </div>
        <p>
          Let’s see what we get from these rules.
          Shortest word that we can generate is:
          S-&gt; (#2) aB -&gt; ab (#3)
        </p>
        <p>
          Other rules iterations give us these kinds of results:
        </p>
        <ul>
          <li>S --(#1)--&gt; aS --(#1 n-2 times)--&gt; a<sup>n-1</sup>S --(#2)--&gt; a<sup>n</sup> B -&gt;</li>
          <li className="tabbed">1. --(#3)--&gt; a<sup>n</sup> b</li>
          <li className="tabbed">2. --(#4)--&gt; a<sup>n</sup> S (this way we add more a-s)</li>
          <li className="tabbed">3. --(#5)--&gt; a<sup>n</sup> bA --(#6)--&gt; a<sup>n</sup> ba</li>
        </ul>
        <p>
          So we can generate these kinds of words:
        </p>
        <ul>
          <li>a<sup>n</sup> b</li>
          <li>a<sup>n</sup> ba</li>
        </ul>
        <p>
          In general, we can say that the generated language is: <b>L(G) = &#123;a<sup>n</sup> n a<sup>k</sup>; n ∈ ℕ, n &ge; 1, and k=&#123;0, 1&#125;&#125;</b>
        </p>
      </div>
    </div>
  );
};

export default Examples;
