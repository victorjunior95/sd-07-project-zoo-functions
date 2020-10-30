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

const { employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const find = ids.map(id => data.animals.find(element => element.id === id));
  return find;
}

function animalsOlderThan(animal, age) {
  const found = data.animals.find(element => element.name === animal);
  const result = found.residents.every(element => element.age > age);
  return result;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(element => element.firstName === employeeName || element.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  return data.employees.some(element => element.managers.some(person => person === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  if (species === undefined) {
    const count = {};
    data.animals.forEach((element) => {
      count[element.name] = element.residents.length;
    });
    return count;
  }
  const rage = data.animals.filter(element => element.name === species);
  return rage[0].residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  let total = 0;
  Object.entries(entrants).forEach((element) => {
    switch (element[0]) {
      case 'Adult':
        total += 49.99 * element[1];
        break;
      case 'Senior':
        total += 24.99 * element[1];
        break;
      case 'Child':
        total += 20.99 * element[1];
        break;
      default:
        break;
    }
  });
  return total;
}

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
