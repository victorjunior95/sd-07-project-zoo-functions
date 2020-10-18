const { animals } = require('./data');
const { employees } = require('./data');
/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');

function animalsByIds(...ids) {
  let arr = [];
  const idAnimals = animals.filter((animal, i) => animal.id === ids[i]);
  if (idAnimals !== undefined) {
    arr = idAnimals;
  }

  return arr;
}

function animalsOlderThan(animal, age) {
  return animals.some(
    animalName =>
      animalName.name === animal &&
      animalName.residents.every(residents => residents.age >= age),
  );
}

function employeeByName(employeeName) {
  let obj = {};

  const employInput = employees.find(
    employ =>
      employ.firstName === employeeName || employ.lastName === employeeName,
  );
  // find retorna o valor do primeiro elemento do array q satisfizer a função teste provida.

  if (employInput !== undefined) {
    obj = employInput;
  }
  return obj;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(man => man.id === id && man.managers.length === 1);
}
// some testa se ao menos um dos elementos do array pasasa no teste e retorna true.
function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}

function animalCount(species) {
  const obj = {
    lions: 4,
    tigers: 2,
    bears: 3,
    penguins: 4,
    otters: 4,
    frogs: 2,
    snakes: 2,
    elephants: 4,
    giraffes: 6,
  };
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  for (let i = 0; i <= keys.length - 1; i += 1) {
    if (keys[i] === species) {
      return values[i];
    }
  }
  return obj;
}
const prices = {
  Adult: 49.99,
  Child: 20.99,
  Senior: 24.99,
};
const valuesPerType = Object.values(prices);
const keysPerType = Object.keys(prices);

function entryCalculator(entrants) {
  let sum = 0;
  if (entrants === null || entrants === undefined) {
    return 0;
  }
  const keys = Object.keys(entrants);
  const values = Object.values(entrants);

  for (let i = 0; i <= keys.length - 1; i += 1) {
    if (entrants === {}) {
      return 0;
    }
    for (let j = 0; j <= keysPerType.length - 1; j += 1) {
      if (keys[i] === keysPerType[j]) {
        sum += values[i] * valuesPerType[j];
      }
    }
  }
  return sum;
}

function animalMap(options) {
  // seu código aqui
}

function scheduleAux() {
  const obj = {};
  Object.entries(data.hours).forEach((time) => {
    if (time[0] === 'Monday') {
      obj[time[0]] = 'CLOSED';
    } else {
      obj[time[0]] = `Open from ${time[1].open}am until ${
        time[1].close - 12
      }pm`;
    }
  });
  return obj;
}

function schedule(dayName) {
  if (dayName === undefined) {
    return scheduleAux();
  }
  const obj1 = {};
  Object.entries(scheduleAux()).forEach((week) => {
    if (week[0] === dayName) {
      obj1[week[0]] = week[1];
    }
  });
  return obj1;
}
// consultei o repositório de Kramer para a refatoração desta função
// ( codeclimate não aceitou minha solução)
// Eu não havia me atentado ao fato de que deveria relacionar
//  a função á propriedade hours de data.js.
// https://github.com/tryber/sd-07-project-zoo-functions/blob/544898ad4e7bca13bb04afc1dfabe4c7ee1da3ca/src/zoo.js

function oldestFromFirstSpecies(id) {}

function increasePrices(percentage) {
  const increase =( 1 + percentage) / 100;
  data.prices.Adult = Math.round(data.prices.Adult * increase * 100) / 100;
  data.prices.Senior = Math.round(data.prices.Senior * increase * 100) / 100;
  data.prices.Child = Math.round(data.prices.Child * increase * 100) / 100;
}
// consultei o repositório de Kramer para a refatoração desta função.
// https://github.com/tryber/sd-07-project-zoo-functions/blob/544898ad4e7bca13bb04afc1dfabe4c7ee1da3ca/src/zoo.js
function employeeCoverageAuxfunction employeeCoverage() {() {
  const coverage = {
    'Nigel Nelson': ['lions', 'tigers'],
    'Burl Bethea': ['lions', 'tigers', 'bears', 'penguins'],
    'Ola Orloff': ['otters', 'frogs', 'snakes', 'elephants'],
    'Wilburn Wishart': ['snakes', 'elephants'],
    'Stephanie Strauss': ['giraffes', 'otters'],
    'Sharonda Spry': ['otters', 'frogs'],
    'Ardith Azevado': ['tigers', 'bears'],
    'Emery Elser': ['elephants', 'bears', 'lions'],
  };
return coverage;
}
function employeeCoverage(idOrName) {
 if (idOrName === undefined) {
    return employeeCoverageAux()
  }

  const employ = data.employees.find(
    employe =>
      employe.firstName === idOrName ||
      employe.lastName === idOrName ||
      employe.id === idOrName,
  );
  const returnn = `${employ.firstName} ${employ.lastName}`;
  const coverageKeys = Object.keys(coverage);
  const coverageValues = Object.values(coverage);
  for (let i = 0; i <= 8; i += 1) {
    if (returnn === coverageKeys[i]) {
      const coverageValuesI = coverageValues[i];
      const final = {
        [`${returnn}`]: coverageValuesI,
      }; return final;
    }return 
  }
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
