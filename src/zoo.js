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
  const allByIds = data.animals.filter(({ id: animalId }) => ids.find(id => id === animalId));

  return ids ? allByIds : [];
}

function animalsOlderThan(animal, age) {
  const animalThan = data.animals.find(({ name }) => animal === name);

  const olderNotThan = animalThan.residents.some(resident => resident.age < age);

  return !olderNotThan;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  const employeed = data.employees.find(({ firstName, lastName }) => {
    const verified = employeeName === firstName || employeeName === lastName;

    return verified;
  });

  return employeed;
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
  const manager = data.employees.some(({ managers }) => {
    const existId = managers.some(idManager => idManager === id);

    return existId;
  });

  return manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  data.employees.push(newEmployee);
}

function animalCount(species) {
  let animalCurrent = {};

  data.animals.forEach(({ name, residents }) => {
    if (!species) animalCurrent[name] = residents.length;

    if (species === name) animalCurrent = residents.length;
  });

  return animalCurrent;
}

function entryCalculator(entrants) {
  let priceTotal = 0;

  if (entrants && entrants !== {}) {
    const entrantsKey = Object.keys(entrants);
    const entrantsValue = Object.values(entrants);

    entrantsKey.forEach((key, index) => {
      Object.entries(data.prices).forEach(([description, price]) => {
        if (description === key) priceTotal += entrantsValue[index] * price;
      });
    });
  }

  return priceTotal;
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
