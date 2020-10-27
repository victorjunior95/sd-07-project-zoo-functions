/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const { animals, employees, hours, prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return ids.map(id => animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(animalName => animalName.name === animal)
    .residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  return employees.find(
    employee =>
      employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees.some(employee =>
    employee.managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimal(specie) {
  const animalData = animals.filter(animal => animal.name === specie);
  const num = animalData[0].residents.length;
  return { [specie]: num };
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    return animals.reduce(
      (acc, crr) => Object.assign(acc, countAnimal(crr.name)),
      {});
  }
  return Object.values(countAnimal(species))[0];
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  const keys = Object.keys(prices);
  const value = keys.map((key, index) => {
    if (Object.keys(entrants).find(entrant => entrant === key)) {
      return Object.values(prices)[index] * entrants[key];
    }
    return 0;
  });
  return value.reduce((acc, crr) => acc + crr, 0);
}

function animalMap(options) {
  // seu código aqui
}

function dayHour(day) {
  if (day === 'Monday') return {[day]: `CLOSED`}
  return{[day]: `Open from ${hours[day].open}am until ${(hours[day].close) - 12}pm`,}
}

function schedule(dayName) {

  if (dayName === undefined) {
    return Object.keys(hours).reduce(
      (acc, crr) => Object.assign(acc, dayHour(crr)),
      {});
  }
  return dayHour(dayName);
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
