export function randomIntFromInterval(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min)
}

export function generateArrayNumbers(min: number, max: number, length: number) {
  let array = []

  while (array.length < length) {
    const randomNumber = randomIntFromInterval(min, max)
    const isExisting = array.some((number: number) => number === randomNumber)

    if (!isExisting) {
      array.push(randomNumber)
    }
  }

  return array
}

export function transpose(matrix: number[][]) {
  let [row] = matrix

  return row.map((_, column) => matrix.map((row) => row[column]))
}

const COLUMN_LENGTH = 9
const ROW_LENGTH = 9


function generateMatrix() {
  const matrix = [];
  const usedNumbers = new Set();

  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 5; j++) {
      let number;
      do {
        number = Math.floor((i * 10 + j * 2) + Math.random() * 2 + 1);
      } while (usedNumbers.has(number));
      usedNumbers.add(number);
      row.push(number);
    }
    matrix.push(row);
  }

  return matrix;
}

export function generateLotoTicket({
  rows = ROW_LENGTH,
  columns = COLUMN_LENGTH,
}: {
  rows: number
  columns: number
}) {
  const conditionsGenerate = [
    generateArrayNumbers(1, 9, rows),
    generateArrayNumbers(10, 19, rows),
    generateArrayNumbers(20, 29, rows),
    generateArrayNumbers(30, 39, rows),
    generateArrayNumbers(40, 49, rows),
    generateArrayNumbers(50, 59, rows),
    generateArrayNumbers(60, 69, rows),
    generateArrayNumbers(70, 79, rows),
    generateArrayNumbers(80, 90, rows),
  ]

  const transposeColumnToRow = transpose(conditionsGenerate)


  const result = transposeColumnToRow.map((row) => {
    const randomHidden = generateArrayNumbers(
      0,
      columns - 1,
      columns === 9 ? 4 : 1,
    )

    return row.map((number, numberIndex) =>
      randomHidden.includes(numberIndex) ? 0 : number,
    )
  })

  return result
}


export const generateCallerNumbers = () => {
  const array = [];

  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j < 9; j++) {
      array.push(parseInt(`${j}${i}`));
    }
  }

  array[0] = 90

  return array
}

export const randomEnum = (anEnum: any) => {
  const enumValues = Object.values(anEnum)
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  const randomEnumValue = enumValues[randomIndex]

  return randomEnumValue;
}