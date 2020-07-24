// Import stylesheets
import './style.css';

interface Td extends HTMLElement {
  data?: any
}

const table: HTMLElement = document.getElementById('table');
const generar$: HTMLElement = document.getElementById('generar')

const generar$: HTMLElement = document.getElementById('generar')

// patron a recordar;
let pattern: number[];

function fillArray(len: number, i = 0, arr = []) {
  if (i === len) return arr;
  arr.push(-1);
  return fillArray(len, i + 1, arr)
}

generar$.addEventListener('click', () => {
  table.innerHTML = '';
  const dimension$ = document.getElementById('dimension') as HTMLInputElement;
  const dimension = dimension$.value
  
  pattern = fillArray(+dimension * +dimension);
  console.log('pattern initialization ', pattern);

  const tds = pattern.map((v, i) => {
    const td: Td = document.createElement('td')
    td.innerHTML = '-1';
    td.data = { id: i, value: -1 }
    listener(td);
    return td;
  })

  tds.reduce((acc, curr) => {
    acc.tds.push(curr);
    acc.i = acc.i + 1;
    if (+dimension * +dimension / acc.i === +dimension) {
      const tr: HTMLElement = document.createElement('tr');
      acc.tds.forEach(td => tr.appendChild(td))
      table.appendChild(tr);
      acc.i = 0;
      acc.tds = []
    }

    return acc;
  }, {tds: [], i: 0})
});

function listener(td: HTMLElement) {
  td.addEventListener('click', (e: any) => {
    const {id, value} = e.target.data

    if(value === -1) {
      e.target.classList.add("selected")
      e.target.innerHTML = 1;
      e.target.data.value = 1;
    } else {
      e.target.classList.remove("selected")
      e.target.innerHTML = -1;
      e.target.data.value = -1;
    }

    pattern[id] = e.target.data.value;
    console.log('pattern updated', pattern);
  })
} 


