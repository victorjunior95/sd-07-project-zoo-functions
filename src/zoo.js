const { animals } = require('./data');
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
  // https://stackoverflow.com/questions/57861821/how-to-return-specific-values-from-a-filter-in-javascript
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const specie = data.animals.find(specieName => animal === specieName.name);
  return !(specie.residents.some(specieAge => age > specieAge.age));
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {}
  }
  return data.employees.find(name => employeeName === name.firstName || employeeName === name.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  // https://www.tutorialspoint.com/object-assign-in-javascript
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  return data.employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push(
    {
      id,
      firstName,
      lastName,
      managers,
      responsibleFor
    }
  )
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
