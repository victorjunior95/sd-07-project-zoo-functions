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

function animalsByIds(id1, id2) {
  return data.animals.filter(
    animal => animal.id === id1 || animal.id === id2);
}

function animalsOlderThan(animal, age) {
  return data.animals.some(
    animalName =>
      animalName.name === animal &&
      animalName.residents.every(animalAge => animalAge.age > age));
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find(
    name => name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(employee => employee.managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    const obj = {};
    data.animals.forEach((animal) => { obj[animal.name] = animal.residents.length; });
    return obj;
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants = {}) {
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // for (day in data.hours){
  //   if (dayName === day){
  //   }
  // }
}

function oldestFromFirstSpecies(id) {
  // const responsibleFor = data.employees.find((employee) => employee === id).responsibleFor[0]
  // const animal = data.animals.find((elements) => elements.id === responsibleFor).residents.map()
}

function increasePrices(percentage) {
  let { Adult, Senior, Child } = data.prices;
  Adult = Math.round((Adult + (Adult * (percentage / 100))) * 100) / 100;
  Senior = Math.round((Senior + (Senior * (percentage / 100))) * 100) / 100;
  Child = Math.round((Child + (Child * (percentage / 100))) * 100) / 100;
  data.prices = { Adult, Senior, Child };
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
