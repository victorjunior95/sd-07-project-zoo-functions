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

const data = require("./data");

function animalsByIds(...ids) {
  const { animals } = data;
  return animals.filter((animal, index) => animal.id === ids[index]);
}
// console.log(animalsByIds())

function animalsOlderThan(animal, age) {
  const { animals } = data;
  const myAnimal = animals.find((animalName) => animalName.name === animal);
  const compareResult = myAnimal.residents.every(
    (animalGroup) => animalGroup.age > age
  );
  return compareResult;
}
// console.log(animalsOlderThan('otters', 7));

function employeeByName(employeeName) {
  const { employees } = data;
  let object = {};
  if (employeeName) {
    object = employees.filter(
      (objectEmployer) =>
        objectEmployer.firstName === employeeName ||
        objectEmployer.lastName === employeeName
    )[0];
  }
  return object;
}
console.log(employeeByName('Elser'));

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
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
