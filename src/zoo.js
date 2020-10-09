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
  return ids.reduce(function (acc, idCurrent) {
    const items = data.animals.filter(function (element) {
      return element.id === idCurrent;
    });
    acc.push(...items);
    return acc;
  }, []);
}

function animalsOlderThan(animal, age) {
  const animalFound = data.animals.find(function (it) {
    return it.name === animal;
  });
  const { residents: animalsResidents } = animalFound;
  const animalWithMinimumAge = animalsResidents.every(function (itAnimal) {
    return itAnimal.age >= age;
  });
  return animalWithMinimumAge;
}

function employeeByName(employeeName) {
  if (employeeName !== null && employeeName !== undefined) {
    const employee = data.employees.find(function (person) {
      return person.firstName === employeeName || person.lastName === employeeName;
    }); return employee;
  }
  {
    const obj = {};
    return obj;
  }
}
function createEmployee(personalInfo, associatedWith) {
  const person = { ...personalInfo, ...associatedWith };
  return person;
}

function isManager(id) {
  // seu código aqui
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
