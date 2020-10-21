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

const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animalId => animalId.id === ids[0] || animalId.id === ids[1]);
}

function animalsOlderThan(animal, age) {
  return animals
    .filter(animalName => animalName.name === animal)
    .every((animalOlder, position) => animalOlder.residents[position].age > age);
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
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some((managerId, position) => managerId.managers[position] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species === undefined) {
    const speciesInfo = {};
    animals.forEach((animal) => { speciesInfo[animal.name] = animal.residents.length; });
    return speciesInfo;
  }
  const speciesCount = animals.find(animal => animal.name === species);
  return speciesCount.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const ticketPrice =
    (Adult * prices.Adult) + (Senior * prices.Senior) + (Child * prices.Child);
  return ticketPrice;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(...dayName) {
  if (dayName.length === 0) {
    dayName = Object.keys(hours);
  }
  let timesheet = {};
  dayName.forEach((weekday) => {
    if (weekday === 'Monday') {
      timesheet = { ...timesheet, [weekday]: 'CLOSED' };
    } else {
      timesheet = { ...timesheet, [weekday]: `Open from ${hours[weekday].open}am until ${hours[weekday].close - 12}pm` };
    }
  });
  return timesheet;
}

function oldestFromFirstSpecies(id) {
  const findEmployeeById = employees.find(employeeId => employeeId.id === id).responsibleFor[0];
  const findAnimalInformation = animals
    .find(animalId => animalId.id === findEmployeeById).residents
    .sort((animal1, animal2) => animal2.age - animal1.age);
  return Object.values(findAnimalInformation[0]);
}

function increasePrices(percentage) {
  const ticketsValue = Object.keys(prices);
  ticketsValue.forEach((ticket) => {
    prices[ticket] =
      Math.round((prices[ticket] + (prices[ticket] * (percentage / 100))) * 100) /
      100;
  });
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
