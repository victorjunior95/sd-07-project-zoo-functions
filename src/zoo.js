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
const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');


function animalsByIds(...ids) {
  const idsAnimals = animals.filter(animal => ids.includes(animal.id));
  return idsAnimals;
}

function animalsOlderThan(animal, age) {
  const species = animals.find(specie => specie.name === animal);
  return species.residents.every(resid => resid.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};

  return employees.find(
    person => person.firstName === employeeName || person.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some((person, index) => person.managers[index] === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  let arrayManagers = managers;
  if (managers === undefined) {
    arrayManagers = [];
  }
  let arrayResponsibleFor = responsibleFor;
  if (responsibleFor === undefined) {
    arrayResponsibleFor = [];
  }

  const lastEmployee = {
    id,
    firstName,
    lastName,
    managers: arrayManagers,
    responsibleFor: arrayResponsibleFor,
  };

  employees.push(lastEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((animalObj, animal) => {
      animalObj[animal.name] = animal.residents.length;
      return animalObj;
    }, {});
  }

  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }

  const valueEntrants = Object.keys(entrants);

  const ticketSum = valueEntrants.reduce((sum, keys) => {
    sum += entrants[keys] * prices[keys];
    return sum;
  }, 0);

  return ticketSum;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(...dayName) {
  if (dayName.length === 0) {
    dayName = Object.keys(hours);
  }

  let times = {};

  dayName.forEach((day) => {
    if (day === 'Monday') {
      times = { ...times, [day]: 'CLOSED' };
    } else {
      times = { ...times, [day]: `Open from ${hours[day].open}am until ${hours[day].close - 12}pm` };
    }
  });

  return times;
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
