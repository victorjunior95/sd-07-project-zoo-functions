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
const { animals, employees } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
} // Requisito feito com ajuda do instrutor Murilo Wolf em aula

function animalsOlderThan(names, age) {
  const nomeEIdade = animals.filter(animal => animal.name === names);
  const ageAll = nomeEIdade[0].residents.every(animal => animal.age >= age);
  return ageAll;
}

function employeeByName(employeeName) {
  const employers =
    employeeName === undefined
      ? {}
      : employees.find(
          funcionario =>
            funcionario.firstName === employeeName || funcionario.lastName === employeeName,
        );
  return employers;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newObj = { id, firstName, lastName, managers, responsibleFor };
  return newObj;
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const addNewEmployee = createEmployee({ id, firstName, lastName }, { managers, responsibleFor });
  employees.push(addNewEmployee);
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
