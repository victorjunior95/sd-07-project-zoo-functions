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
  // seu código aqui
  if (ids.length === 0) return [];
  const animais = data.animals.filter(animal => ids.includes(animal.id));
  return animais;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const filteredAnimals = data.animals.filter(specie => specie.name === animal);
  const OlderAnimals = filteredAnimals[0].residents.every(older => older.age >= age);
  return OlderAnimals;
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  const param = employeeName;
  return data.employees.find(name => name.firstName === param || name.lastName === param);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  const filteredEmployee = data.employees.filter(employee => employee.managers.includes(id));
  if (filteredEmployee.length === 0) return false;
  return true;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // seu código aqui
  const speciesUndefined = {};
  if (species === undefined) {
    data.animals.forEach((animal) => {
      speciesUndefined[animal.name] = animal.residents.length;
    });
    return speciesUndefined;
  }
  return data.animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || entrants.length === 0) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const adultPrice = data.prices.Adult * Adult;
  const seniorPrice = data.prices.Senior * Senior;
  const childPrice = data.prices.Child * Child;
  const totalPrice = adultPrice + seniorPrice + childPrice;
  return totalPrice;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(...dayName) {
  // seu código aqui
  let areOpen = {};
  if (dayName.length === 0) {
    dayName = Object.keys(data.hours);
  }
  dayName.forEach((day) => {
    if (day === 'Monday') {
      areOpen = { ...areOpen, [day]: 'CLOSED' };
    } else {
      areOpen = { ...areOpen, [day]: `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm` };
    }
  });
  return areOpen;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const findEmployee = data.employees.find(employee => employee.id === id).responsibleFor[0];
  const filteredAnimals = data.animals.find(animal => animal.id === findEmployee).residents;
  const sortedAnimals = filteredAnimals.sort((a, b) => b.age - a.age);
  return [sortedAnimals[0].name, sortedAnimals[0].sex, sortedAnimals[0].age];
}

function increasePrices(percentage) {
  // seu código aqui
  const entrants = Object.keys(data.prices);
  entrants.forEach((ticket) => {
    const ajustment = data.prices[ticket] + (data.prices[ticket] * (percentage / 100));
    data.prices[ticket] = Math.round(ajustment * 100) / 100;
  });
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
