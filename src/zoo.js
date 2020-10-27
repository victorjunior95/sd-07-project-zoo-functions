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

const { hours, employees, animals } = data;

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(thisAnimal => thisAnimal.name === animal).residents
  .every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees
  .find(employee => employee.firstName === employeeName
    || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const employee = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  employee.managers = managers;
  employee.responsibleFor = responsibleFor;
  return employee;
}

function isManager(id) {
  return employees.some((employee, index) => employee.managers[index] === id);
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
  if (!species) {
    return animals.reduce((animalOBject, animal) => {
      animalOBject[animal.name] = animal.residents.length;
      return animalOBject;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
}

function animalMap(options) {
  // seu código aqui
}

function schedule(...dayName) {
  if (dayName.length === 0) {
    dayName = Object.keys(hours);
  }

  let openDays = {};

  dayName.forEach((day) => {
    if (day === 'Monday') {
      openDays = { ...openDays, [day]: 'CLOSED' };
    } else {
      openDays = { ...openDays, [day]: `Open from ${hours[day].open}am until ${hours[day].close - 12}pm` };
    }
  });

  return openDays;
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
