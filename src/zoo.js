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
const { prices, employees, animals } = require('./data');

function animalsByIds(...ids) {
  const find = ids.map(id => animals.find(element => element.id === id));
  return find;
}

function animalsOlderThan(animal, age) {
  const found = animals.find(element => element.name === animal);
  const result = found.residents.every(element => element.age > age);
  return result;
}

function findEmployee(id) {
  const res = employees.find(e => e.firstName === id || e.lastName === id || e.id === id);
  return res;
}

function employeeByName(empName) {
  if (empName === undefined) {
    return {};
  }
  return findEmployee(empName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  return employees.some(element => element.managers.some(person => person === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  if (species === undefined) {
    const count = {};
    animals.forEach((element) => {
      count[element.name] = element.residents.length;
    });
    return count;
  }
  const rage = animals.filter(element => element.name === species);
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
  Object.keys(prices).forEach((element) => {
    prices[element] = Math.round((prices[element] * (1 + (percentage / 100))) * 100) / 100;
  });
}

function nameOfAnimalsById(id) {
  const result = animals.find(element => element.id === id);
  return result.name;
}

function employeeCoverage(idOrName) {
  const employee = findEmployee(idOrName);
  employee.responsibleFor.forEach(element => {
    console.log(nameOfAnimalsById(element));
  });
}

employeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad');
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
