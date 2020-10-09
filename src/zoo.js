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
  const animalObj = animals;
  const arrOfIds = ids;

  const animalsById = arrOfIds.map((id) => {
    const getAnimal = animal => animal.id === id;
    const animalSearch = animalObj.find(getAnimal);
    return animalSearch;
  });
  return animalsById;
}

function animalsOlderThan(animal, age) {
  const getAnimal = specie => specie.name === animal;
  const findAnimal = data.animals.find((getAnimal));
  const analyzeAge = findAnimal.residents.every(resident => resident.age > age);
  return analyzeAge;
}

function employeeByName(employeeName) {
  const personName = employeeName;
  if (typeof employeeName === 'undefined') { return {}; }
  const getPerson = person => (personName === person.firstName || personName === person.lastName);
  const findPerson = data.employees.find(getPerson);
  return findPerson;
}

function createEmployee(personalInfo, associatedWith) {
  const { firstName, id, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = { firstName, id, lastName, managers, responsibleFor };
  return newEmployee;
}

function isManager(id) {
  const allManagersIds = data.employees.reduce((acc, employee) => {
    return [...acc, ...employee.managers]
  }, []);

  const verifyId = (managerId) => managerId === id
  return allManagersIds.some((verifyId))

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
