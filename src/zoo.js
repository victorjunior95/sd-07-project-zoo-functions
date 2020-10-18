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
  let listOfAnimals = [];
  if (ids !== undefined) {
    listOfAnimals = data.animals.filter(
      (animal, index) => animal.id === ids[index],
    );
  }

  return listOfAnimals;
}

function animalsOlderThan(animal, age) {
  const requiredAnimal = data.animals.filter(element => element.name === animal);
  return requiredAnimal[0].residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  let employeeObject = {};
  if (employeeName !== undefined) {
    employeeObject = data.employees.find(employee =>
      (employee.firstName === employeeName || employee.lastName === employeeName));
  }
  return employeeObject;
}

function createEmployee(personalInfo, associatedWith) {
  // const employee = Object.assign({}, personalInfo, associatedWith)
  const employee = { ...personalInfo, ...associatedWith };
  return employee;
}

function isManager(id) {
  return data.employees.some(employee =>
    employee.managers.some(element => element === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const employee = {};
  employee.id = id;
  employee.firstName = firstName;
  employee.lastName = lastName;
  employee.managers = Array.isArray(managers) ? managers : [];
  employee.responsibleFor = Array.isArray(responsibleFor) ? responsibleFor : [];
  return data.employees.push(employee);
}

function animalCount(species) {
  if (species === undefined) {
    // const obj = {};
    const obj = data.animals.map((animal) => {
      obj[animal.name] = animal.residents.length;
      return obj;
    });
  }
  const specieCount = data.animals.find(animal => animal.name === species);
  return specieCount.residents.length;
}

function entryCalculator(entrants = Object) {
  return Object.keys(entrants).reduce((acc, currentKey) =>
    acc + (entrants[currentKey] * data.prices[currentKey]), 0);
}

function animalMap(options) {
  // seu código aqui
}

const formatHour = value => (value > 12) ? `${value - 12}pm` : `${value}am`;

function schedule(dayName) {
  const mensage = {};
  let schArray = [];

  if (Object.entries(data.hours).some(schDay => schDay[0] === dayName)) {
    schArray.push([dayName, data.hours[dayName]]);
  } else {
    schArray = Object.entries(data.hours);
  }

  schArray.map((element) => {
    let value = 'CLOSED';
    if (element[1].open !== 0) {
      value = `Open from ${formatHour(element[1].open)} until ${formatHour(element[1].close)}`
    }
    return Object.assign(mensage, { [element[0]]: value });
  });

  return mensage;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // for (let key in data.prices) {
  //   let tax = data.prices[key] * percentage / 100
  //   console.log(tax)
  //   data.prices[key] = (Math.floor(data.prices[key] + tax)).toFixed(2)
  //   // parseFloat((data.prices[key] + tax).toPrecision(2))
  // }
  // return data.prices;
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
