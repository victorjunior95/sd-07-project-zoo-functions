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

const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const bichos = animals.filter(elements => elements.name === animal);
  return bichos[0].residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(EE => EE.firstName === employeeName || EE.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((manager, index) => manager.managers[index] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  const speciesAndQuantities = {};
  animals.forEach(animal => (speciesAndQuantities[(animal.name)] = animal.residents.length));
  if (species === undefined) {
    return speciesAndQuantities;
  }
  const amount = animals.find(element => species === element.name);
  return amount.residents.length;
}

function entryCalculator(...entrants) {
  // Referencia: Thadeu Castelo Branco Ramos
  const { Adult, Senior, Child } = prices;
  let total = 0;
  entrants.map((amountOfPerson) => {
    if (amountOfPerson.Adult) {
      total += amountOfPerson.Adult * Adult;
    }
    if (amountOfPerson.Senior) {
      total += amountOfPerson.Senior * Senior;
    }
    if (amountOfPerson.Child) {
      total += amountOfPerson.Child * Child;
    }
    return total;
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
