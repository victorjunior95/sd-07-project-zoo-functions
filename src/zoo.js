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
  // teste22
const { employees } = require('./data');
const data = require('./data');

  // seu código aqui
const { animals } = data;

function animalsByIds(...ids) {
  if (animalsByIds.arguments.length === 0) {
    return [];
  } else if (ids.length === 1) {
    const animal = animals.find(animalGroup => animalGroup.id === ids[0]);
    return [animal];
  }

  return animals.filter((animalGroup, index) => animalGroup.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals.find(animalGroup => animalGroup.name === animal)
  .residents
  .every(specificAnimal => specificAnimal.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeByName.arguments.length === 0) {
    return {};
  }
  return employees
  .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees
  .flatMap(employee => employee.managers)
  .some(managerId => managerId === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);
  return data.employees;
}

function animalCount(species) {
  // seu código aqui
  if (animalCount.arguments.length === 0) {
    const allAnimals = {};
    animals.forEach((animalGroup) => {
      allAnimals[animalGroup.name] = animalGroup.residents.length;
    });
    return allAnimals;
  }
  return animals.find(animalGroup => animalGroup.name === species).residents.length;
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
  const animalGroupsInfo = employees.find(employee => employee.id === id).responsibleFor[0];
  const firstGroupInfo = animals.find(animalGroup => animalGroup.id === animalGroupsInfo);
  const { residents: animalsTakenCareByEmployee } = firstGroupInfo;

  return animalsTakenCareByEmployee
  .reduce((oldestAnimal, current) => {
    if (current.age > oldestAnimal.age) {
      return [current.name, current.sex, current.age];
    }
    return oldestAnimal;
  });
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
