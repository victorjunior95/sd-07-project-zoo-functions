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

const animalsByIds = (...ids) => data.animals.filter(animal => ids.includes(animal.id));

function animalsOlderThan(animal, age) {
  const filteredAnimals = data.animals.find(animalToFilter => animalToFilter.name === animal);
  const verifyAge = filteredAnimals.residents
  .every(animalToCompareAge => animalToCompareAge.age >= age);
  return verifyAge;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees
  .find(employee => employee.firstName === employeeName
    || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species === undefined) {
    const objAnimalsCount = {};
    data.animals.forEach((animal) => {
      objAnimalsCount[animal.name] = animal.residents.length;
    });
    return objAnimalsCount;
  }
  return data.animals
  .find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants.length === 0) return 0;
  const { Child = 0, Adult = 0, Senior = 0 } = entrants;
  const childAmountToPay = data.prices.Child * Child;
  const adultAmountToPay = data.prices.Adult * Adult;
  const seniorAmountToPay = data.prices.Senior * Senior;
  const totalAmountToPay = childAmountToPay + adultAmountToPay + seniorAmountToPay;
  return totalAmountToPay;
}

function animalMap(options) {
  // seu código aqui
}

const createSpecificSchedule = (scheduleToReturn, dayName) => {
  if (dayName === 'Monday') {
    scheduleToReturn[dayName] = 'CLOSED';
  } else {
    scheduleToReturn[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
  }
  return scheduleToReturn;
};

const createSchedule = (scheduleToReturn, day) => createSpecificSchedule(scheduleToReturn, day);
function schedule(dayName) {
  if (dayName === undefined) {
    return Object.keys(data.hours).reduce(createSchedule, {});
  }
  return createSpecificSchedule({}, dayName);
}

function oldestFromFirstSpecies(id) {
  const firstSpecieOfEmployeeResponsibility = data.employees
  .find(employee => employee.id === id)
  .responsibleFor[0];

  const specieAllInfos = data.animals
  .find(animal => animal.id === firstSpecieOfEmployeeResponsibility);

  let oldestAge = 0;
  let oldestAnimal;
  specieAllInfos.residents.forEach((animal) => {
    if (animal.age > oldestAge) {
      oldestAge = animal.age;
      oldestAnimal = [animal.name, animal.sex, animal.age];
    }
  });
  return oldestAnimal;
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
