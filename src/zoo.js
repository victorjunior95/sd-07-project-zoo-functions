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

const [animals, employees, prices] = [data.animals, data.employees, data.prices];

const animalsByIds = (...ids) => ids.map(id => animals.find(animal => id === animal.id));

const animalsOlderThan = (animal, age) => animals.find(element =>
  element.name === animal).residents.every(element => element.age >= age);

const nameOrLast = nam => employees.find(element =>
  element.firstName === nam || element.lastName === nam);

const employeeByName = employeeName => (employeeName === undefined ? {} : nameOrLast(employeeName));

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = id => employees.some(element => element.managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const obj = { id, firstName, lastName, managers, responsibleFor };
  Object.entries(obj).forEach((element) => { obj[element[0]] = element[1]; });
  // for (let nam in obj) { nam = obj[nam] };
  employees.push(obj);
};

const getLengthList = () =>
  animals.reduce((acc, str) => {
    acc[str.name] = str.residents.length;
    return acc;
  }, {});

const animalCount = (species = getLengthList()) => {
  if (typeof species !== 'string') return species;
  return animals.find(element => element.name === species).residents.length;
};

const whatValue = (value) => {
  switch (value) {
    case 'Adult':
      return prices.Adult;
    case 'Senior':
      return prices.Senior;
    case 'Child':
      return prices.Child;
    default:
      return value;
  }
};

const entryCalculator = (entrants = 0) =>
  Object.entries(entrants).reduce((acc, current) =>
    acc + (current[1] * whatValue(current[0])), 0);

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
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
