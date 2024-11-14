import React from 'react';
import './App.css';
import ImageComparison from './components/ImageComparison';

function App() {
  return (
    <div className="App">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <ImageComparison>
          <img src="/before.png" label="Before" />
          <img src="/after.png" label="After" />
        </ImageComparison>
      </div>
    </div>
  );
}

export default App;