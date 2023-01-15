export function randomIntFromInterval(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min)
}

export function transpose(matrix: number[][]) {
  let [row] = matrix

  return row.map((_, column) => matrix.map((row) => row[column]))
}

const generateTicketTemplate = () => {
  const matrix = [];
  for (let i = 0; i < 9; i++) {
    matrix.push(new Array(9).fill(0));
  }

  for (let i = 0; i < 9; i++) {
    let onesInColumn = 0;
    while (onesInColumn < 4 || onesInColumn > 6) {
      onesInColumn = 0;
      for (let j = 0; j < 9; j++) {
        matrix[j][i] = Math.floor(Math.random() * 2);
        onesInColumn += matrix[j][i];
      }
    }
  }

  for (let i = 0; i < 9; i++) {
    let onesInRow = 0;
    for (let j = 0; j < 9; j++) {
      onesInRow += matrix[i][j];
    }
    while (onesInRow !== 5) {
      const randomIndex = Math.floor(Math.random() * 9);
      if (matrix[i][randomIndex] === 0) {
        matrix[i][randomIndex] = 1;
        onesInRow++;
      } else {
        matrix[i][randomIndex] = 0;
        onesInRow--;
      }
    }
  }

  return matrix;
}

const checkConsecutiveOnes = (arr: any) => {
  let consecutiveOnes = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 1) {
      consecutiveOnes++;
      if (consecutiveOnes > 3) {
        return true;
      }
    } else {
      consecutiveOnes = 0;
    }
  }
  return false;
}

const generateTicketTemplateWrapper: any = () => {
  const templateTicket = generateTicketTemplate()

  let saveCountRow = Array(9).fill(0)
  for (let col = 0; col < templateTicket.length; col++) {
    let countColumn = 0
    for (let row = 0; row < templateTicket.length; row++) {
      if (templateTicket[col][row] === 1) {
        countColumn++
        saveCountRow[row]++
      }

      // If having 5 consecutive 1s on a column
      if (row >= 5) {
        let consecutiveArr = templateTicket.slice(row - 5, row).map(r => r[col]);
        if (consecutiveArr.every(Boolean)) {
          return generateTicketTemplateWrapper()
        }
      }

      // If not correct 5 1s on each row (not gonna happen)
      if (countColumn > 5) {
        return generateTicketTemplateWrapper()
      }
    }

    // If having 4 consecutive 1s on a row
    const consecutiveOnes = checkConsecutiveOnes(templateTicket[col])
    if (consecutiveOnes) {
      return generateTicketTemplateWrapper()
    }
  }

  // If having less than 4 or more than 6 1s on a column
  const isInvalid = saveCountRow.some(x => x < 4 || x > 6)

  if (isInvalid) {
    return generateTicketTemplateWrapper()
  }

  return templateTicket
}

export const generateArrayNumbers = (min: number, max: number, length: number) => {
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


const generateTicketRaw = () => {
  const matrix = []

  for (let i = 0; i < 9; i++) {
    const rows = []
    const usedNumbers = new Set()
    for (let j = 0; j < 9; j++) {
      let num
      do {
        const start = (i * 10) || 1
        const end =  start + (i === 8 ? 10 : 8)
        num = randomIntFromInterval(start, end)
      } while (usedNumbers.has(num))
      usedNumbers.add(num)
      rows.push(num)
    }
    matrix.push(rows)
  }

  return matrix
}

export const generatePlayerTicket = () => {
  const ticketRaw = generateTicketRaw()
  const valueTicket = transpose(ticketRaw)
  const templateTicket = generateTicketTemplateWrapper()
  const resultTicket = templateTicket.map((row: any) => row.slice())

  for (let i = 0; i < templateTicket.length; i++) {
    for (let j = 0; j < templateTicket.length; j++) {
      if (templateTicket[i][j] === 1) {
        resultTicket[i][j] = valueTicket[i][j]
      }
    }
  }

  return resultTicket
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