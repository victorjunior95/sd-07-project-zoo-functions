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

// a "especie" não é o nome, é o objeto todo ?!
function animalsByIds(...ids) {
  return data.animals.filter(({ id }) => ids.includes(id)); 
}

// Tentar novamente mudar o nome da entrada do Age
function animalsOlderThan(animal, age) { 
  return data.animals
    .find(({ name }) => name === animal)
    .residents.every(({ age: animalAge }) => animalAge >= age);
}

function employeeByName(employeeName) {
  return (
    data.employees.find(
      ({ firstName, lastName }) => employeeName === firstName || employeeName === lastName) || {}
  );
}

// Essa é tão fácil quanto aberto era o enunciado
function createEmployee(personalInfo, associatedWith) { 
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return data.employees.some(employeeId => employeeId.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // erro no teste unitário que a entrada tem que estar zerada?
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    // console.log(acc);
    return data.animals.reduce((acc, { name, residents }) => {
      acc[name] = residents.length;
      return acc;
    }, {});
  }

  return data.animals.find(({ name }) => name === species).residents.length;
}
// animalCount();

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;

  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const totalAdult = data.prices.Adult * Adult;
  const totalSenior = data.prices.Senior * Senior;
  const totalChild = data.prices.Child * Child;

  return totalAdult + totalSenior + totalChild;
}

function animalMap(options) {
  // fazer por último
}

const hours = require('./data');

function schedule(dayName) {
  const days = Object.keys(hours);
  const completedSchedule = {};

  days.forEach((day) => {
    if (day !== 'Monday') {
      completedSchedule[day] = `Open from ${hours[day].open}am until ${
        hours[day].close - 12
      }pm`;
    } else {
      completedSchedule[day] = 'CLOSED';
    }
  });

  return dayName
    ? { [dayName]: completedSchedule[dayName] }
    : completedSchedule;
}

function oldestFromFirstSpecies(id) {
  const animalManagedByEmployeeId = data.employees.find(
    ({ id: employeeId }) => employeeId === id).responsibleFor[0];

  const findAnimalById = data.animals
    .find(({ id: animalId }) => animalId === animalManagedByEmployeeId)
    .residents.sort(({ age: ageA }, { age: ageB }) => ageB - ageA);

  return Object.values(findAnimalById[0]);
}

function increasePrices(percentage) {
  // complicado
}

function employeeCoverage(idOrName) {
  // complicado
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
