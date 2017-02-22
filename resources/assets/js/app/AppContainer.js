import React from 'react';
import Nav from './components/Nav';

const App = (props) => {
  return (
    <div>
      <section>
        <Nav />
      </section>
      <section>
        {props.children}
      </section>
    </div>
  );
};

export default App;
