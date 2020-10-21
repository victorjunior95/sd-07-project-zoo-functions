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

const { animals, prices, hours } = require('./data');
const { employees } = require('./data');
const data = require('./data');


function animalsByIds(...ids) {
  const animalsIds = [...ids];
  const animalArray = [];
  animalsIds.forEach((element) => {
    animals.forEach((animalList) => {
      if (element === animalList.id) {
        animalArray.push(animalList);
      }
    });
  });
  return animalArray;
}

function animalsOlderThan(animal, age) {
  const animalName = animals.find(element => element.name === animal);
  const validate = animalName.residents.every(animalAge => animalAge.age >= age);
  return validate;
}

function employeeByName(empName = {}) {
  const empSearch = employees.find(emp => empName === emp.firstName || empName === emp.lastName);
  return empSearch === undefined ? {} : empSearch;
}

function createEmployee(personalInfo, associatedWith) {
}

function isManager(id) {
  const isManageer = employees.some((element) => {
    const objects = Object.values(element.managers);
    return objects.some(elementMan => elementMan === id);
  });
  return isManageer;
}
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

function animalCount(species) {
  const animalsList = {
    lions: 4,
    tigers: 2,
    bears: 3,
    penguins: 4,
    otters: 4,
    frogs: 2,
    snakes: 2,
    elephants: 4,
    giraffes: 6,
  };
  const searchAnimal = animals.find(element => element.name === species);
  return searchAnimal === undefined ? animalsList : searchAnimal.residents.length;
}

function entryCalculator(entrants = 0) {
  const arrayEntry = Object.entries(entrants);
  const priceEntry = Object.entries(prices);
  let value = 0;
  arrayEntry.forEach((element) => {
    priceEntry.forEach((price) => {
      if (element[0] === price[0]) value += (element[1] * price[1]);
    });
  });
  return value;
}

function animalMap(options = 'local') {
}
const objectDays = () => {
  const arrayHours = Object.entries((hours));
  const object = {};
  arrayHours.forEach((element) => {
    if (element[1].close === 0) object[element[0]] = 'CLOSED';
    else object[element[0]] = `Open from ${element[1].open}am until ${element[1].close - 12}pm`;
  });
  return object;
};

const UniDay = (object, day) => {
  const newArray = Object.entries(object);
  const resultFilter = newArray.find(element => element[0] === day);
  const objectReturn = {};
  objectReturn[resultFilter[0]] = resultFilter[1];
  return objectReturn;
};
function schedule(dayName = 0) {
  if (dayName === 0) {
    return objectDays();
  }
  return UniDay(objectDays(), dayName);
}
function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  const entryPrices = Object.entries(prices);
  const objectValues = entryPrices.map((element) => {
    const calculated = element[1] + (element[1] * (percentage / 100));
    const adjust = Math.round(calculated * 100) / 100;
    return { [element[0]]: adjust };
  });
  objectValues.forEach(element => Object.assign(prices, element));
}
// Agradeço ao Ricardo Alves, que vi em seu código
// a utilização do Math.round de forma * 100 e me deu uma luz!
function employeeCoverage(idOrName) {

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
