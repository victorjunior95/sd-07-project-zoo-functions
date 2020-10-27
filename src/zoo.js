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
  return data.animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  return data.animals
    .find(({ name }) => name === animal)
    .residents.every(({ age: ageRes }) => ageRes >= age);
}

function employeeByName(employeeName) {
  return (
    data.employees.find(
      ({ firstName, lastName }) => employeeName === firstName || employeeName === lastName) || {}
  );
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.some(idManage => id === idManage));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // erro no teste unitário, a entrada tem que estar zerada.
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    // console.log(acc);
    return data.animals.reduce((acc, { name, residents }) => {
      acc[name] = residents.length;
      return acc;
    }, {});
  }

  return data.animals.find(({ name }) => name === species).residents.length;
}
// animalCount();

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;

  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const totalAdult = data.prices.Adult * Adult;
  const totalSenior = data.prices.Senior * Senior;
  const totalChild = data.prices.Child * Child;

  return totalAdult + totalSenior + totalChild;
}

function animalMap(options) {
  // fazer por último
}

function schedule(dayName) {
  // complicado
}

function oldestFromFirstSpecies(id) {
  const animalManagedByEmployeeId = data.employees.find(
    ({ id: employeeId }) => employeeId === id).responsibleFor[0];

  const findAnimalById = data.animals
    .find(({ id: animalId }) => animalId === animalManagedByEmployeeId)
    .residents.sort(({ age: ageA }, { age: ageB }) => ageB - ageA);

  return Object.values(findAnimalById[0]);
}

function increasePrices(percentage) {
  // complicado
}

function employeeCoverage(idOrName) {
  // complicado
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
