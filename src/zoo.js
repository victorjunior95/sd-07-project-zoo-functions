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

function animalsByIds(ids) {
  if (ids.length === 0) return [];
  return data.animals.filter(animal => ids.some(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return data.animals.some(specie => specie.name === animal &&
    specie.residents.every(resident => resident.age >= age,
  ));
}

function employeeByName(employeeName) {
  return employeeName === undefined ? {} :
  data.employees.find(employee =>
    employee.firstName === employeeName ||
    employee.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(employee =>
    employee.managers.some(idManager => idManager === id),
  );
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species === undefined) {
    return data.animals.reduce((amountOfAnimals, animals) => {
      amountOfAnimals[animals.name] = animals.residents.length;
      return amountOfAnimals;
    }, {});
  }
  return data.animals.reduce((accumulator, animal) => {
    if (animal.name === species) {
      accumulator = animal.residents.length;
    }
    return accumulator;
  }, 0);
}

function entryCalculator(entrants) {
  const arrayEntrants = Object.entries(entrants);
  if (entrants === undefined || arrayEntrants.length === 0) return 0;
  return arrayEntrants.reduce((totalPayable, entrant) => {
    totalPayable += entrant[1] * data.prices[entrant[0]];
    return totalPayable;
  }, 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const arrayHours = Object.entries(data.hours);
  return arrayHours.reduce((report, daysHour) => {
    const message = `Open from ${daysHour[1].open}am until ${
      daysHour[1].close - 12}pm`;
    if (daysHour[1].open === 0 && dayName === undefined) {
      report[daysHour[0]] = 'CLOSED';
    } else if (daysHour[1].open !== 0 && dayName === undefined) {
      report[daysHour[0]] = message;
    } else if (daysHour[1].open === 0 && daysHour[0] === dayName) {
      report[daysHour[0]] = 'CLOSED';
    } else if (daysHour[1].open !== 0 && daysHour[0] === dayName) {
      report[daysHour[0]] = message;
    }
    return report;
  }, {});i
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
