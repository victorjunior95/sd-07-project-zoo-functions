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

const { animals } = data;
const { employees } = data;

function animalsByIds(...ids) {
  const localeByAnimalid = ids.map((idFind) => {
    const animalLocalized = animals.find(animal => animal.id === idFind);
    return animalLocalized;
  });
  return localeByAnimalid;
}

function animalsOlderThan(animal, age) {
  const verifyName = animals.find((animalNameCheck) => {
    const specie = animalNameCheck.name === animal;
    return specie;
  });
  let checkAge = verifyName.residents;
  checkAge = checkAge.every(animalAge => animalAge.age >= age);
  return checkAge;
}

function employeeByName(employeeName) {
  if (typeof (employeeName) === 'undefined') return {};
  const employeeLocalized = employees.find((employee) => {
    let returnEmployeeLocalized;
    if (employee.firstName === employeeName || employee.lastName === employeeName) {
      returnEmployeeLocalized = employee;
    }
    return returnEmployeeLocalized;
  });
  return employeeLocalized;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    ...personalInfo, ...associatedWith,
  };
  return newEmployee;
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployeer = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployeer);
  return data.employees;
}

function animalCount(species) {
  const animalLocale = {};
  if (typeof (species) === 'undefined') {
    animals.forEach(({ name, residents }) => {
      animalLocale[name] = residents.length;
    });
    return animalLocale;
  }
  return animals.find(({ name }) => name === species).residents.length;
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
