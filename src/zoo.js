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

const { animals, employees, prices } = require('./data');
const data = require('./data');

function animalsByIds(identifyer, ...ids) {
  if (identifyer === undefined) {
    return [];
  }
  if (ids.length === 0) {
    return animals.filter(animal => animal.id === identifyer);
  }
  return null;
}

function animalsOlderThan(animal, age) {
  const species = animals.find(specie => specie.name === animal);
  return species.residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(employee => employee.firstName === employeeName ||
    employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  const person = employees.find(employee => employee.id === id);
  if (person.managers.length === 1) {
    return true;
  }
  return false;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    const counter = {};
    animals.forEach((animal) => {
      counter[animal.name] = animal.residents.length;
    });
    return counter;
  }
  const animal = animals.find(specie => specie.name === species);
  return animal.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  let price = 0;
  const keys = Object.keys(entrants);
  keys.forEach((key) => {
    price += (entrants[key] * prices[key]);
  });
  return price;
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
