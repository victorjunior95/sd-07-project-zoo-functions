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
  let animalsList = [];
  if (ids === []) {
    animalsList = [];
  } else {
    ids.forEach((id) => {
      const animalByIdList = data.animals.filter(animal => animal.id === id);
      animalsList = animalsList.concat(animalByIdList);
    });
  }
  return animalsList;
}

function animalsOlderThan(animal, age) {
  const animals = data.animals.find(animalObject => animalObject.name === animal);
  return animals.residents.every(resident => resident.age > age);
}


function employeeByName(employeeName) {
  let employeeObj = null;
  if (employeeName === undefined) {
    employeeObj = {};
  } else {
    employeeObj = data.employees.find((employee) => {
      let nameVerify = false;
      if (employee.firstName === employeeName || employee.lastName === employeeName) {
        nameVerify = true;
      }
      return nameVerify;
    });
  }
  return employeeObj;
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return data.employees.some(employee => employee.managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (managers === undefined) {
    managers = [];
  }
  if (responsibleFor === undefined) {
    responsibleFor = [];
  }
  data.employees.push(createEmployee({ id, firstName, lastName }, { managers, responsibleFor }));
}

function animalCount(species) {
  let animalsCont = null;
  if (species === undefined) {
    animalsCont = {};
    data.animals.forEach((animal) => {
      animalsCont = Object.assign(animalsCont, { [animal.name]: animal.residents.length });
      return animalsCont;
    });
  } else {
    animalsCont = data.animals.find(animal => animal.name === species).residents.length;
  }
  return animalsCont;
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
