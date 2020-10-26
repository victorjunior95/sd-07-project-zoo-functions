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

const { animals, employees, prices, hours } = data;


function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}
// ensinado pelo Wolf

function animalsOlderThan(animal, age) {
  return animals
    .find(specie => specie.name === animal)
    .residents.every(minimumAge => minimumAge.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
//   const { id, firstName, lastName } = personalInfo
//   const { managers, responsibleFor } = associatedWith
//   return {
//     id,
//     firstName,
//     lastName,
//     managers,
//     responsibleFor
//   }
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees
    .filter(employee => employee.id === id)
    .some(employee => employee.managers.length < 2);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    const allAnimals = animals.map(animal => [animal.name, animal.residents.length]);
    return Object.fromEntries(allAnimals);
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  let result = 0;
  Object.keys(entrants).forEach((typePerson) => {
    result += entrants[typePerson] * prices[typePerson];
  });
  return result;
}

function animalMap(options) {
  // seu código aqui
}
// Orientado pelo showLiva.
function schedule(dayName) {
  const days = {};
  Object.keys(hours).forEach((day) => {
    if (hours[day].open === hours[day].close) {
      days[day] = 'CLOSED';
    } else {
      days[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
  });
  if (dayName !== undefined) {
    return { [dayName]: days[dayName] };
  }
  return days;
}

function oldestFromFirstSpecies(id) {
  const employeeId = employees.find(person => person.id === id);
  const specieId = animals.find(specie => specie.id === employeeId.responsibleFor[0]);
  const animalAges = specieId.residents.sort(function (a, b) { return b.age - a.age; });
  return Object.values(animalAges[0]);
}

function increasePrices(percentage) {
  // Object.entries(prices).forEach((array) => {
  //   console.log(array);
  //   console.log(prices[array[0]]);
  //   prices[array[0]] = Math.round(prices[array[0]] * ((percentage / 100) + 1) * 100) / 100});
  prices.Adult = Math.round(prices.Adult * ((percentage / 100) + 1) * 100) / 100;
  prices.Senior = Math.round(prices.Senior * ((percentage / 100) + 1) * 100) / 100;
  prices.Child = Math.round(prices.Child * ((percentage / 100) + 1) * 100) / 100;
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
