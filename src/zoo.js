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

const { prices } = require('./data');
const data = require('./data');

const { hours, employees, animals } = data;

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(thisAnimal => thisAnimal.name === animal).residents
  .every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees
  .find(employee => employee.firstName === employeeName
    || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const employee = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  employee.managers = managers;
  employee.responsibleFor = responsibleFor;
  return employee;
}

function isManager(id) {
  return employees.some((employee, index) => employee.managers[index] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((animalOBject, animal) => {
      animalOBject[animal.name] = animal.residents.length;
      return animalOBject;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
}

function animalMap(options) {
  // seu código aqui
}

function schedule(...dayName) {
  if (dayName.length === 0) {
    dayName = Object.keys(hours);
  }

  let openDays = {};

  dayName.forEach((day) => {
    if (day === 'Monday') {
      openDays = { ...openDays, [day]: 'CLOSED' };
    } else {
      openDays = { ...openDays, [day]: `Open from ${hours[day].open}am until ${hours[day].close - 12}pm` };
    }
  });

  return openDays;
}

const getOldest = (acc, animal) => {
  if (acc.age > animal.age) return acc;
  return animal;
};

function oldestFromFirstSpecies(id) {
  const firstAnimalId = employees
  .find(employee => employee.id === id).responsibleFor[0];
  const resident = animals.find(animal => animal.id === firstAnimalId).residents;
  const oldest = Object.values(resident.reduce(getOldest));
  return oldest;
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((stage) => {
    prices[stage] = Math.ceil(prices[stage] * (100 + percentage)) / 100;
  });
}


function findAnimalsNames(animalArray) {
  return animalArray.map(animalId => animals
  .find(animal => animal.id === animalId).name);
}

function employeeCoverage(idOrName) {
  const employeeObj = {};
  if (!idOrName) {
    employees.forEach((employee) => {
      const responsibleFor = findAnimalsNames(employee.responsibleFor);
      employeeObj[`${[employee.firstName]} ${[employee.lastName]}`] = responsibleFor;
    });
    return employeeObj;
  }
  const employee = employees
  .find(thisEmployee => (thisEmployee.id === idOrName
    || thisEmployee.firstName === idOrName || thisEmployee.lastName === idOrName));
  employeeObj[`${employee.firstName} ${employee.lastName}`] = findAnimalsNames(employee.responsibleFor);
  return employeeObj;
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
