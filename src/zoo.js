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
  return data.animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  const calledAnimalObject = data.animals.filter(component => component.name === animal);
  return calledAnimalObject[0].residents.every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const { employees } = data;
  const arrayOfObjects = employees.filter(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  return arrayOfObjects[0];
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  const checkIfManager = data.employees.some((employee, index) => employee.managers[index] === id);
  return checkIfManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return data.employees;
}

function animalCount(species) {
  if (species === undefined) {
    const list = {};
    data.animals.forEach((element) => {
      list[element.name] = element.residents.length;
    });
    return list;
  }
  const foundObject = data.animals.find(element => element.name === species);
  return foundObject.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult: adult, Child: child, Senior: senior } = data.prices;
  const priceArray = [adult, child, senior];
  const { Adult: entryAdult = 0, Child: entryChild = 0, Senior: entrySenior = 0 } = entrants;
  const entryArray = [entryAdult, entryChild, entrySenior];
  const calculatingPrice = entryArray.map((element, index) => element * priceArray[index]);
  return calculatingPrice.reduce((acc, curr) => acc + curr);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // if (dayName === undefined) {
  //   const {Tuesday: tue, Wednesday: wed { open: 8, close: 18 },
  //   'Thursday': { open: 10, close: 20 },
  //   'Friday': { open: 10, close: 20 },
  //   'Saturday': { open: 8, close: 22 },
  //   'Sunday': { open: 8, close: 20 },
  //   'Monday': { open: 0, close: 0 })
  // }
}

//const test = entryCalculator({ 'Child': 1, 'Senior': 1 });
//console.log(test);

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
