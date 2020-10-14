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
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(species => species.name === animal).residents.every(i => i.age >= age);
}

function employeeByName(emp) {
  if (!emp) return {};
  return data.employees.find(({ firstName, lastName }) => firstName === emp || lastName === emp);
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some(sereal => sereal.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    const geral = {};
    data.animals.forEach(({ name, residents }) => {
      geral[name] = residents.length;
    });
    return geral;
  }

  const escolido = data.animals.find(({ name }) => name === species);
  const { residents } = escolido;
  return residents.length;
}

function entryCalculator(entrants) {
  const { prices } = data;
  if (!entrants || entrants === {}) return 0;

  return Object.entries(entrants).reduce((rest, now) => rest + (prices[now[0]] * now[1]), 0);
}

function animalMap(options) {
  // seu cod...
}

function schedule(dayName) {
  const { hours } = data;

  if (!dayName) {
    const everyDay = {};
    hours.forEach(({ open, close }) => {
      everyDay[weekDay] = `Open from ${open}am until ${close - 12}pm`;
    });
    return everyDay;
  }
  if(dayName === "Monday") return {"Monday": "CLOSED"};
  if(dayName === "Monday") return {"Monday": "CLOSED"};
  if(dayName === 'Tuesday') return {"Tuesday": "Open from 8am until 6pm"};
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu cod...
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
