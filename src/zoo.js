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

// const { animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const { animals } = data;
  if (ids === []) return ids;
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const { animals } = data;
  return animals.find(({ name }) => name === animal)
  .residents.every(({ age: ageSpecie }) => ageSpecie > age);
}

function employeeByName(employeeName) {
  const { employees } = data;
  if (!employeeName) return {};
  return employees.find(pers => pers.firstName === employeeName || pers.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  const { employees } = data;
  return employees.some(manager => manager.managers[0] === id || manager.managers[1] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor };
  return employees.push(newEmployee);
}

function animalCount(species) {
  const { animals } = data;
  const newObj = {};
  if (species) return animals.find(animal => animal.name === species).residents.length;
  animals.forEach((item) => {
    newObj[item.name] = item.residents.length;
  });
  return newObj;
}

function entryCalculator(entrants) {
  if (!entrants || entrants === {} || entrants === null) return 0;
  if (!entrants.Adult) entrants.Adult = 0;
  if (!entrants.Child) entrants.Child = 0;
  if (!entrants.Senior) entrants.Senior = 0;
  return (entrants.Adult * 49.99) + (entrants.Child * 20.99) + (entrants.Senior * 24.99);
}

function filteredAnimalsByLocation(location) {
  const { animals } = data;
  return animals.filter(animal => animal.location === location);
}

function animalsPerLocationByName(locations, sorted, sex) {
  const animalPerLocation = {};
  locations.forEach((location) => {
    const filteredAnimals = filteredAnimalsByLocation(location).map((animal) => {
      const animalName = animal.name;
      const residents = animal.residents.filter((resident) => {
        const isFilteredSex = sex !== undefined;
        if (isFilteredSex) {
          return resident.sex === sex;
        }
        return true;
      })
    .map(resident => resident.name);
      if (sorted) residents.sort();
      return { [animalName]: residents };
    });
    if (filteredAnimals.length !== 0) animalPerLocation[location] = filteredAnimals;
  });
  return animalPerLocation;
}

function animalsPerLocation(locations) {
  const { animals } = data;
  const animalPerLocation = {};
  locations.forEach((location) => {
    const filteredAnimals = animals
    .filter(animal => animal.location === location)
    .map(animal => animal.name);
    animalPerLocation[location] = filteredAnimals;
    if (filteredAnimals.length !== 0) animalPerLocation[location] = filteredAnimals;
  });
  return animalPerLocation;
}

function availableLocations() {
  return ['NE', 'NW', 'SE', 'SW'];
}

function animalMap(options) {
  const locations = availableLocations();
  if (!options) return animalsPerLocation(locations);
  const { includeNames = false, sorted = false, sex } = options;
  if (includeNames) {
    return animalsPerLocationByName(locations, sorted, sex);
  }
  return animalsPerLocation(locations);
}

function schedule(dayName) {
  const hoursTable = { Tuesday: 'Open from 8am until 6pm', Wednesday: 'Open from 8am until 6pm', Thursday: 'Open from 10am until 8pm', Friday: 'Open from 10am until 8pm', Saturday: 'Open from 8am until 10pm', Sunday: 'Open from 8am until 8pm', Monday: 'CLOSED' };
  if (!dayName) return hoursTable;
  switch (dayName) {
    case 'Tuesday':
      return { Tuesday: 'Open from 8am until 6pm' };
    case 'Wednesday':
      return { Wednesday: 'Open from 8am until 6pm' };
    case 'Thursday':
      return { Thursday: 'Open from 8am until 6pm' };
    case 'Friday':
      return { Friday: 'Open from 8am until 6pm' };
    case 'Saturday':
      return { Saturday: 'Open from 8am until 6pm' };
    case 'Sunday':
      return { Sunday: 'Open from 8am until 6pm' };
    case 'Monday':
      return { Monday: 'CLOSED' };
    default :
      return hoursTable;
  }
}

function oldestFromFirstSpecies(id) {
  const { employees } = data;
  const { animals } = data;
  const { responsibleFor } = employees.find(employee => id === employee.id);
  const { residents } = animals.find(animal => responsibleFor[0] === animal.id);
  const oldestAnimal = residents.sort((firstOne, secondOne) => secondOne.age - firstOne.age)[0];
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  const { prices } = data;
  let { Adult, Senior, Child } = prices;
  Adult = ((percentage / 100) * prices.Adult) + prices.Adult;
  Senior = ((percentage / 100) * prices.Senior) + prices.Senior;
  Child = ((percentage / 100) * prices.Child) + prices.Child;
  prices.Adult = Math.round(Adult * 100) / 100;
  prices.Senior = Math.round(Senior * 100) / 100;
  prices.Child = Math.round(Child * 100) / 100;
}

function auxEmployeeCoverage(findEmp) {
  const { animals } = data;
  return findEmp.responsibleFor.map(animalId => animals.find(({ id }) => id === animalId).name);
}

function employeeCoverage(idOrName) {
  const { employees } = data;
  const { animals } = data;
  let findEmp = {};
  const newObj = {};
  if (!idOrName) {
    employees.forEach((item) => {
      newObj[`${item.firstName} ${item.lastName}`] = item.responsibleFor.map(animalId => animals.find(({ id }) => id === animalId).name);
    });
    return newObj;
  }
  findEmp = employees.find(employee => employee.id === idOrName);
  if (!findEmp) findEmp = employees.find(employee => employee.firstName === idOrName);
  if (!findEmp) findEmp = employees.find(employee => employee.lastName === idOrName);
  newObj[`${findEmp.firstName} ${findEmp.lastName}`] = auxEmployeeCoverage(findEmp);
  return newObj;
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
