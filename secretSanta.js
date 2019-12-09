const nameTypes = {
  BASIA: 'Basia',
  POPS: 'Pops',
  ANIA: 'Ania',
  MACIEK: 'Maciek',
  PATI: 'Pati',
  KONRAD: 'Konrad',
  DOROTKA: 'Dorotka',
  MICHO: 'Micho',
}

const secondNames = {
  TYMEK: 'Tymek',
  MAKSIU: 'Maks',
  ZOSIA: 'Zosia',
  BABCIA_RENIA: 'Babcia Renia',
  BABCIA_ZOSIA: 'Babcia Zosia',
  DZIADZIU_MIECIU: 'Dziadziu Mieciu',
  MADZIA: 'Madzia',
  TEO: 'Teo'
}

const excludeMap = {
  ANIA: [secondNames.TYMEK],
  MACIEK: [secondNames.TYMEK],
  BASIA: [],
  POPS: [],
  DOROTKA: [],
  MICHO: [],
  KONRAD: [secondNames.MAKSIU, secondNames.ZOSIA],
  PATI: [secondNames.MAKSIU, secondNames.ZOSIA],
};

const emailMap = {
  ANIA: 'ania@wp.pl',
  MACIEK: 'Maciek@interia.pl',
  BASIA: 'Basia',
  POPS: 'Pops',
  DOROTKA: 'Dorotka',
  KONRAD: 'Konrad',
  MICHO: 'Micho',
  PATI: 'Pati',
}

// sorted by random shuffle function from internet
let namesFirstDraw = Object.keys(nameTypes).map(key => nameTypes[key]).sort(() => .5 - Math.random());
let namesSecondDraw = Object.keys(secondNames).map(key => secondNames[key]);

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawNames(namesThatDraw) {
  namesThatDraw.map(nameThatDraws => {
    const first = drawOne(nameThatDraws);
    const second = drawTwo(nameThatDraws);

    removeDrawnFromLists(first, second);
    sendEmailWithResult(nameThatDraws, first, second);
  })
}

function removeDrawnFromLists(first, second) {
  namesFirstDraw = namesFirstDraw.filter(n => n !== first);
  namesSecondDraw = namesSecondDraw.filter(n => n !== second);
}

function sendEmailWithResult(name, first, second) {
  console.log(name, first, second);
}

function drawOne(name) {
  const filtered = namesFirstDraw.filter(n => n !== name);
  const drawn = filtered[getRandomIntInclusive(0, filtered.length - 1)];
  if (drawn === undefined) {
    drawOne(name);
  }
  return drawn;
}

function drawTwo(name) {
  const filtered = namesSecondDraw.filter(n => excludeMap[name.toUpperCase()].indexOf(n) < 0);
  let drawn = filtered[getRandomIntInclusive(0, filtered.length - 1)];
  if (drawn === undefined) {
    drawTwo(name);
  }
  return drawn;
}

const namesThatDraw = [].concat(namesFirstDraw);

drawNames(namesThatDraw);
