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


const { employees } = data;

function animalsByIds(...ids) {
  return data.animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  return data.animals
  .find(({ name }) => name === animal)
  .residents
  .every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  const employee = {};
  if (employeeName) {
    return data.employees
    .find(({ firstName, lastName }) => employeeName === firstName || employeeName === lastName);
  }
  return employee;
}

function createEmployee(personalInfo, associatedWith) {

}

function isManager(id) {
  return employees.some(employee => employee.managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  return
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
  const animalId = data.employees.find(employee => employee.id === employeeId)
  .responsibleFor.shift();
  return Object.values(data.animals.find(({ id }) => id === animalId).residents
  .sort((a, b) => b.age - a.age)
  .shift());
}

function increasePrices(percentage) {
  Object.keys(data.prices)
    .forEach((price) => {
      data.prices[price] =
      Math.ceil((data.prices[price] * (100 + percentage))) / 100;
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
