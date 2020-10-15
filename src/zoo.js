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

function animalsByIds(...ids) { // Includes aprendido com Murillo no fechamento
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return data.animals
  .find(resident => resident.name === animal).residents
  .every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees
  .find(employee => employeeName === employee.firstName || employeeName === employee.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
  // Anteriormente tinha utilizado o método Object.assign, mas achei melhor com spread operator
}

function isManager(id) {
  return data.employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    return data.animals.reduce((arrayOfAnimals, currentAnimal) => {
      arrayOfAnimals[currentAnimal.name] = currentAnimal.residents.length;
      return arrayOfAnimals;
    }, {});
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (Adult * data.prices.Adult) + (Child * data.prices.Child) + (Senior * data.prices.Senior);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = data.hours;
  const completeSchedule = {
    Tuesday: `Open from ${Tuesday.open}am until ${Tuesday.close - 12}pm`,
    Wednesday: `Open from ${Wednesday.open}am until ${Wednesday.close - 12}pm`,
    Thursday: `Open from ${Thursday.open}am until ${Thursday.close - 12}pm`,
    Friday: `Open from ${Friday.open}am until ${Friday.close - 12}pm`,
    Saturday: `Open from ${Saturday.open}am until ${Saturday.close - 12}pm`,
    Sunday: `Open from ${Sunday.open}am until ${Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  if (!dayName) {
    return completeSchedule;
  } else if (dayName === 'Monday') return { Monday: 'CLOSED' };
  return (
    { [dayName]: `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm` }
  );
}

function oldestFromFirstSpecies(id) {
  const idFirstSpecies = data.employees.find(employee => employee.id === id).responsibleFor[0];
  const oldestResident = data.animals
  .find(animal => animal.id === idFirstSpecies).residents
  .sort((a, b) => b.age - a.age);
  const { name, sex, age } = oldestResident[0];
  return [name, sex, age];
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
