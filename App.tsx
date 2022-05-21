import React from 'react';
import React, { useState } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const App = () => {
  //  Fungsi Tasbih mulai dari 0 state
  const [counter, setCounter] = useState(0);

  // Fungsi Tasbih tambah 1 angka ketika di klik
  const handleClick1 = () => {
    // Tambah 1 angka
    setCounter(counter + 1);
  };

  // Fungsi Tasbih kembali ke 0 angka ketika di klik
  const handleClick2 = () => {
    // Kembalikan angka menjadi 0
    setCounter(0);
  };

  return (
    <MuiThemeProvider>
      <div></div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '300%',
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: '-15%',
        }}
      >
        Tasbih Digital
        <div
          style={{
            fontSize: '250%',
            position: 'relative',
            top: '10vh',
          }}
        >
          {counter}
        </div>
        <div className="buttons">
          <RaisedButton
            style={{
              fontSize: '60%',
              position: 'relative',
              top: '20vh',
              marginRight: '10px',
              padding: '10px',
            }}
            onClick={handleClick1}
          >
            Hitung
          </RaisedButton>
          <RaisedButton
            style={{
              fontSize: '60%',
              position: 'relative',
              top: '20vh',
              marginLeft: '10px',
              padding: '10px',
            }}
            onClick={handleClick2}
          >
            Reset
          </RaisedButton>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
