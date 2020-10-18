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
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(employee => employee.managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const { animals } = data;
  if (species === undefined) {
    const out = {};
    animals.forEach(animal => (out[animal.name] = animal.residents.length));
    return out;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {

  // seu código aqui
}

function animalMap(options) {

  // seu código aqui
}

function schedule(dayName) {
  if (dayName === undefined) {
    const arrHours = Object.entries(hours);
    arrHours.forEach(modifier);
    return hours;
  }
  return { [dayName]: hours[dayName] };

  // seu código aqui
}

function oldestFromFirstSpecies(speciesId) {
  const animalId = data.employees.find(employee => employee.id === speciesId)
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
