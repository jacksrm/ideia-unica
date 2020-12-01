import { useState } from 'react';

export default function Home() {
  return (
    <>
      <h1>Calculadora NextJs</h1>
      <Calculadora />
    </>
  );
}

function Calculadora() {
  const [conta, setConta] = useState('');

  function btnClick(value) {
    if (value === '=') return calcular();

    if (value === 'C') return limpar();

    if (Number.isInteger(value)) return setConta((old) => `${old}${value}`);
    else return setConta((old) => `${old} ${value} `);
  }

  function calcular() {
    const arrayNum = conta
      .split(' ')
      .filter(
        (el) =>
          el !== '+' && el !== '-' && el !== '*' && el !== '/' && el !== ''
      )
      .map((el) => parseInt(el));

    const arraySimb = conta
      .split(' ')
      .filter((el) => el === '+' || el === '-' || el === '*' || el === '/');

    console.log(arrayNum);
    console.log(arraySimb);

    if (arraySimb.length >= arrayNum.length) {
      const extra = arraySimb.length - arrayNum.length  + 1;

      for (let i = 0; i < extra; i++) {
        arraySimb.pop();
      }
    }

    console.log(arrayNum);
    console.log(arraySimb);
  }

  function limpar() {
    return setConta('');
  }

  return (
    <div className="calculadora">
      <input
        value={conta}
        onChange={(e) => setConta(e.target.value)}
        type="text"
        disabled
      />
      <Numpad handleClick={btnClick} />
    </div>
  );
}

function Numpad({ handleClick }) {
  const padCaps = [1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, '*', 'C', 0, '=', '/'];
  return (
    <div>
      <section>
        {padCaps.map((cap, ind) => (
          <button key={ind} onClick={() => handleClick(cap)}>
            {cap}
          </button>
        ))}
      </section>
    </div>
  );
}
