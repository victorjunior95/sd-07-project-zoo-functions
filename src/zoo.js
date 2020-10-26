const { animals, employees, prices } = require('./data');
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
  if (ids.length === 0) return [];
  const filterByIds = animals.filter(objAni => ids.includes(objAni.id));
  return filterByIds;
}

function animalsOlderThan(animal, age) {
  const animalsList = data.animals.find(Aname => Aname.name === animal);
  const testAge = animalsList.residents.every(animalAge => animalAge.age >= age);
  return testAge;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const findName = employees
  .find(element => employeeName === element.firstName || employeeName === element.lastName);
  return findName;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const someByManager = data.employees.some(test => test.managers.includes(id));
  return someByManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    const speciesAnimal = {};
    animals.forEach((animal) => {
      speciesAnimal[animal.name] = animal.residents.length;
    });
    return speciesAnimal;
  }
  const findAnimal = animals.find(animal => animal.name === species);
  return findAnimal.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) return 0;
  const keys = Object.keys(entrants);
  let count = 0;
  keys.forEach((age) => {
    count += entrants[age] * prices[age];
  });
  return count;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  let result = data.hours;
  if (dayName) {
    result = Object.entries(data.hours).find(element => element[0] === dayName);
    result = {[result[0]]: result[1]};
    }
    return scheduleString(result);
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
