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

// const { animals } = require('./data');
const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const arrayEmpty = [];
  if (ids !== undefined) {
    return animals.filter(animal => animal.id === ids[0] || animal.id === ids[1]);
  }
  return arrayEmpty;
}

function animalsOlderThan(animal, age) {
  return animals.filter(anima => anima.name === animal)
    .every((resident, index) => resident.residents[index].age > age);
}

function employeeByName(employeeName) {
  const objectEmpty = {};
  if (employeeName !== undefined) {
    return employees.filter((employee, index) =>
      employee.firstName === employeeName || employee.lastName === employeeName)[0];
  }
  return objectEmpty;
}


function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  let arrayResul = [];
  arrayResul = employees.map(employee => employee.managers.includes(id));
  if (arrayResul.includes(true)) {
    return true;
  }
  return false;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {

}

function animalCount(species) {
  const arrayObjectAnimals = {};

  if (species !== undefined) {
    return animals.filter(animal => (animal.name === species))
    .map(animal => animal.residents.length)[0];
  }
  animals.forEach(({ name, residents }) => {
    arrayObjectAnimals[name] = residents.length;
  });
  return arrayObjectAnimals;
}
console.log(animalCount());
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
