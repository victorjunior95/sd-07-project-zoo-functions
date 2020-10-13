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

const { animals, employees, hours, prices } = require('./data');
const data = require('./data');

const animalsByIds = (...ids) => animals.filter(animal => ids.includes(animal.id));

function animalsOlderThan(animal, age) {
  const foundAnimals = animals.find(element => element.name === animal);
  const residentAnimals = foundAnimals.residents;
  return residentAnimals.every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees
    .find(employee =>
    employee.firstName.includes(employeeName) ||
    employee.lastName.includes(employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = ({ id, firstName, lastName, managers, responsibleFor });
  return newEmployee;
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
};

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, item) => {
      acc[item.name] = item.residents.length;
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, current) =>
    acc + (entrants[current] * data.prices[current]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = hours;
  const daySchedule = {};
  const convertHour = (hour) => hour > 12 ? hour - 12 : hour;
  const weekSchedule = {
    Tuesday: `Open from ${Tuesday.open}am until ${convertHour(Tuesday.close)}pm`,
    Wednesday: `Open from ${Wednesday.open}am until ${convertHour(Wednesday.close)}pm`,
    Thursday: `Open from ${Thursday.open}am until ${convertHour(Thursday.close)}pm`,
    Friday: `Open from ${Friday.open}am until ${convertHour(Friday.close)}pm`,
    Saturday: `Open from ${Saturday.open}am until ${convertHour(Saturday.close)}pm`,
    Sunday: `Open from ${Sunday.open}am until ${convertHour(Sunday.close)}pm`,
    Monday: 'CLOSED',
  };
  if (!dayName) {
    return weekSchedule;
  }
  daySchedule[dayName] = weekSchedule[dayName];
  return daySchedule;
}

console.log(schedule('Tuesday'));

function oldestFromFirstSpecies(id) {
  const findEmployee = employees.find(employee => employee.id === id);
  const searchAnimal = findEmployee.responsibleFor[0];
  const findAnimal = animals.find(animal => animal.id === searchAnimal);
  const oldestAnimal = findAnimal.residents.sort((a, b) => b.age - a.age)[0];
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((key) => {
    prices[key] += (prices[key] * percentage) / 100.00;
    prices[key] = Math.round(prices[key] * 100) / 100;
  });
  return prices;
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
