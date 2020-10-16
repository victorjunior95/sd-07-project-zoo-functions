const { animals } = require('./data');
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
  if (ids.length > 1) {
    return animals.filter((animal, posicao) => animal.id === ids[posicao]);
  }
  if (ids.length === 1) {
    return [animals.find(animal => animal.id === ids[0])];
  }
  if (ids.length === 0) {
    return ids;
  }
}

function animalsOlderThan(animal, age) {
  return animals.find(animalElement => animalElement.name === animal)
  .residents.every(residentElement => residentElement.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  } else {
    return data.employees.find(element =>{
      if (element.firstName === employeeName || element.lastName === employeeName) {
        return true;
      } else {
        return false;
      }
    });
  }
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith
  };
}

function isManager(id) {
  const managers = data.employees.find(employee => employee.managers.includes(id));
  if (managers !== undefined) {
    return true;
  } else {
    return false;
  }
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
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
