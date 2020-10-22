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

const { animals } = require('./data');
const { employees } = require('./data');
const { hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, ageAnimal) {
  const { residents } = data.animals.find(({ name }) => name === animal);
  return residents.every(({ age }) => age >= ageAnimal);
}

function includesNames(name, { firstName, lastName }) {
  return name.includes(firstName) || name.includes(lastName);
}

function employeeByName(...employeeName) {
  const person = employees.filter(employee => includesNames(employeeName, employee));
  if (person.length > 0) return person[0];
  return {};
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

const searchNameEspecies = species => data.animals.find(({ name }) => name === species);

const listOfAnimals = () => {
  const speciesZoo = {};
  data.animals.forEach(({ name, residents }) => {
    speciesZoo[name] = residents.length;
  });
  return speciesZoo;
};

function animalCount(species) {
  if (species) {
    const { residents } = searchNameEspecies(species);
    return residents.length;
  }
  return listOfAnimals();
}

function entryCalculator(entrants) {
  if (entrants === 0 || entrants === undefined) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const amountOfPeople = [Adult, Senior, Child];
  const listPrices = Object.values(data.prices);
  return amountOfPeople.map((amount, index) => amount * listPrices[index])
  .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

function animalMap(options) {
  // seu código aqui
}

function zooSchedule() {
  const objectSchedule = {};
  const valuesHours = Object.values(hours);
  const keysHours = Object.keys(hours);
  const timePeriod = 12;

  keysHours.forEach((days, index) => {
    const openTime = valuesHours[index].open;
    let closeTime = valuesHours[index].close;
    if (closeTime > timePeriod) closeTime -= timePeriod;
    let schedules = `Open from ${openTime}am until ${closeTime}pm`;
    if (days === 'Monday') schedules = 'CLOSED';
    objectSchedule[days] = schedules;
  });
  return objectSchedule;
}

function zooScheduleDayName(dayName) {
  const objectSchedule = {};
  const timePeriod = 12;
  const openTime = hours[dayName].open;
  let closeTime = hours[dayName].close;
  if (closeTime > timePeriod) closeTime -= timePeriod;
  let openingTime = `Open from ${openTime}am until ${closeTime}pm`;
  if (dayName === 'Monday') openingTime = 'CLOSED';
  objectSchedule[dayName] = openingTime;
  return objectSchedule;
}

function schedule(dayName) {
  if (!dayName) return zooSchedule();
  return zooScheduleDayName(dayName);
}

function getListAnimalOlder({ residents }) {
  let listAnimals = [];
  let maxOlder = 0;
  residents.forEach(({ name, sex, age }) => {
    if (age > maxOlder) {
      maxOlder = age;
      listAnimals = [name, sex, age];
    }
  });
  return listAnimals;
}
function getObjectAnimal(responsibleFor) {
  return animals.find(({ id }) => id === responsibleFor[0]);
}

function oldestFromFirstSpecies(idEmployee) {
  const objectEmployee = employees.find(({ id }) => id === idEmployee);
  const objectAnimal = getObjectAnimal(objectEmployee.responsibleFor);
  return getListAnimalOlder(objectAnimal);
}

console.log(oldestFromFirstSpecies('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));


function increasePrices(percentage) {

}

function getObjectEmployee(idOrName) {
  return employees.filter(({ id, firstName, lastName }) =>
  id === idOrName || firstName === idOrName || lastName === idOrName);
}

const getListNamesSpecies = (responsibleFor) => {
  const listAnimals = [];
  responsibleFor.forEach((idAnimal) => {
    animals.forEach(({ id, name }) => {
      if (idAnimal === id) listAnimals.push(name);
    });
  });
  return listAnimals;
};

function createObjectAllEmployeeResposibleFor() {
  const objectEmployee = {};
  employees.forEach(({ firstName, lastName, responsibleFor }) => {
    const fullName = `${firstName} ${lastName}`;
    objectEmployee[fullName] = getListNamesSpecies(responsibleFor);
  });
  return objectEmployee;
}

function createObjectEmployeeResposibleFor({ firstName, lastName, responsibleFor }) {
  const objectEmployee = {};
  const fullName = `${firstName} ${lastName}`;
  objectEmployee[fullName] = getListNamesSpecies(responsibleFor);
  return objectEmployee;
}
function employeeCoverage(idOrName) {
  if (!idOrName) return createObjectAllEmployeeResposibleFor();
  const objectEmployee = getObjectEmployee(idOrName);
  return createObjectEmployeeResposibleFor(...objectEmployee);
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
