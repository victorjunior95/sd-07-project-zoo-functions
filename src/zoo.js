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

const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return ids.map(id => animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const animalsAge = animals.find(zooAnimal => zooAnimal.name === animal);
  return animalsAge.residents.every(ages => ages.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find(n => n.firstName === employeeName || n.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = Object.assign(personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  return employees.some(element => element.managers.some(director => director === id));
}

function manager(managers) {
  if (managers === undefined) return [];
  return managers;
}

function responsible(responsibleFor) {
  if (responsibleFor === undefined) return [];
  return responsibleFor;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const manager2 = manager(managers);
  const responsible2 = responsible(responsibleFor);
  const employee =
    {
      id,
      firstName,
      lastName,
      managers: manager2,
      responsibleFor: responsible2,
    };
  employees.push(employee);
}

function animalCount(species) {
  if (species === undefined) {
    const animalsInZoo = {};
    animals.map(element => (
      animalsInZoo[element.name] = element.residents.length));
    return animalsInZoo;
  }
  const animalsInZoo = animals.find(animal => animal.name === species);
  return animalsInZoo.residents.length;
}

function checkValue(entry) {
  if (!entry) return 0;
  return entry;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) return 0;
  let sum = 0;
  sum = ((prices.Adult * checkValue(entrants.Adult)) +
    (prices.Child * checkValue(entrants.Child)) +
    (prices.Senior * checkValue(entrants.Senior)));
  return sum;
}

function animalMap(options) {
  // seu código aqui
}

function printHours(day) {
  return `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
}

function schedule(dayName) {
  const hour = {};
  if (dayName === undefined) {
    Object.entries(hours).map((days) => {
      hour[days[0]] = printHours(days);
      if (days[1].open === 0) {
        hour[days[0]] = 'CLOSED';
      }
      return 0;
    });
    return hour;
  }
  Object.entries(hours).map((day) => {
    if (day[0] === dayName && day[1].open !== 0) {
      hour[day[0]] = printHours(day);
    }
    if (day[0] === dayName && day[1].open === 0) {
      hour[day[0]] = 'CLOSED';
    }
    return 0;
  });
  return hour;
}

function oldestFromFirstSpecies(id) {
  const accountable = employees.find(employee => employee.id === id);
  const animal = animalsByIds(accountable.responsibleFor[0])[0].residents;
  animal.sort((a, b) => b.age - a.age);
  return animal[0];
}

// function extracted from https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
function roundToTwo(num) {
  return +(Math.round((num + Number.EPSILON) * 100) / 100);
}

function increasePrices(percentage) {
  const obj = Object.entries(prices).map(price =>
    roundToTwo(price[1] + ((price[1] * percentage) / 100)));
  prices.Adult = obj[0];
  prices.Senior = obj[1];
  prices.Child = obj[2];
}

function recoverAnimal(ids) {
  return animals.find(animal => animal.id === ids);
}

function returnEmployeeWithAnimals(work) {
  const object = {};
  object[`${work.firstName} ${work.lastName}`] = [];
  work.responsibleFor.forEach((ids) => {
    const AnimalId = recoverAnimal(ids);
    object[`${work.firstName} ${work.lastName}`].push(AnimalId.name);
  });
  return object;
}

function recoverAllEmployeesWithAnimalsResponsibleFor() {
  const obj = {};
  employees.map((employee) => {
    Object.assign(obj, returnEmployeeWithAnimals(employee));
    return 0;
  });
  return obj;
}

function recoverEmployeeWithAnimalsResponsibleFor(idOrName) {
  const worker = employees.find(employee =>
  employee.id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName);
  return returnEmployeeWithAnimals(worker);
}

function employeeCoverage(idOrName) {
  if (!idOrName) return recoverAllEmployeesWithAnimalsResponsibleFor();

  return recoverEmployeeWithAnimalsResponsibleFor(idOrName);
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
