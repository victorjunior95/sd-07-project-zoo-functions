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

function animalsByIds(...ids) {
  if (typeof ids === 'undefined') {
    return [];
  }
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const animalsAge = animals.find(element => element.name === animal).residents;
  return animalsAge.every(resident => resident.age >= age);
}


function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(employName => (employName
    .firstName === employeeName || employName.lastName === employeeName));
}

const createEmployee = (personalInfo, associatedWith) => {
  const object = { ...personalInfo, ...associatedWith };
  return object;
};

function isManager(id) {
  return employees.some(isManagerr => isManagerr
    .managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acc, animal) => {
      Object.assign(acc, { [animal.name]: animal.residents.length });
      return acc;
    }, {});
  }
  return (animals.find(animal => animal.name === species).residents.length);
}

function entryCalculator(entrants) {
  if (!entrants || (Object.entries(entrants).length === 0)) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const totalAdult = Adult * prices.Adult;
  const totalSenior = Senior * prices.Senior;
  const totalChild = Child * prices.Child;

  return (totalAdult + totalSenior + totalChild);
}

function retrieveAvailableLocations() {
  return ['NE', 'NW', 'SW', 'SE'];
}

function retrieveFilteredAnimalsByLocation(location) {
  return animals.filter(animal => animal.location === location);
}

function retrieveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location)
    .map(animal => animal.name);
    if (filteredAnimals.length !== 0)animalsPerLocation[location] = filteredAnimals;
  });

  return animalsPerLocation;
}

function retrieveAnimalsPerLocationWithName(locations, sorted, sex) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location).map((animal) => {
      const animalName = animal.name;
      const residents = animal.residents
        .filter((resident) => {
          const needFiltering = sex !== undefined;
          // return needFiltering ? resident.sex === sex : true;
          if (needFiltering) {
            return resident.sex === sex;
          }
          return true;
        })
        .map(resident => resident.name);

      if (sorted) residents.sort();

      return { [animalName]: residents };
    });

    if (filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
  });

  return animalsPerLocation;
}

function animalMap(options) {
  const locations = retrieveAvailableLocations();

  if (!options) return retrieveAnimalsPerLocation(locations);

  const { includeNames = false, sorted = false, sex } = options;

  if (includeNames) {
    return retrieveAnimalsPerLocationWithName(locations, sorted, sex);
  }
  return retrieveAnimalsPerLocation(locations);
}
// código feito em conjunto com o oliva em aula

const scheduleWeek = {
  Tuesday: 'Open from 8am until 6pm',
  Wednesday: 'Open from 8am until 6pm',
  Thursday: 'Open from 10am until 8pm',
  Friday: 'Open from 10am until 8pm',
  Saturday: 'Open from 8am until 10pm',
  Sunday: 'Open from 8am until 8pm',
  Monday: 'CLOSED',
};

function schedule(dayName) {
  const scheduleDay = {};
  if (!dayName) return scheduleWeek;
  if (dayName === 'Monday') {
    scheduleDay[dayName] = 'CLOSED';
  } else {
    scheduleDay[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  }
  return scheduleDay;
}

function oldestFromFirstSpecies(id) {
  const employeeById = employees.find(idOfEmployee => idOfEmployee.id === id);
  const animalById = animals.find(idOfAnimals => idOfAnimals
    .id === employeeById.responsibleFor[0]);
  const findResidents = animalById.residents;
  const sortingAnimals = findResidents.sort((par1, par2) => par2.age - par1.age)[0];
  return [sortingAnimals.name, sortingAnimals.sex, sortingAnimals.age];
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = prices;
  const newAdult = Math.round(Adult * (1 + (percentage / 100)) * 100) / 100;
  const newSenior = Math.round(Senior * (1 + (percentage / 100)) * 100) / 100;
  const newChild = Math.round(Child * (1 + (percentage / 100)) * 100) / 100;
  prices.Adult = newAdult;
  prices.Senior = newSenior;
  prices.Child = newChild;
  return prices;
}

function employeeAnimalsObject() {
  const obj = {};
  employees.forEach((employee) => {
    obj[`${employee.firstName} ${employee.lastName}`] =
    employee.responsibleFor.map(currentId =>
      animals.find(specie => specie.id === currentId).name);
  });
  return obj;
}

function employeeCoverage(idOrName) {
  const employeeAnimals = employeeAnimalsObject();
  if (!idOrName) return employeeAnimals;

  const selected = employees.filter(employee =>
    employee.id === idOrName ||
    employee.firstName === idOrName ||
    employee.lastName === idOrName,
  );

  const responsibles = selected[0].responsibleFor.map(currentId =>
    animals.find(specie => specie.id === currentId).name);

  const result = {
    [`${selected[0].firstName} ${selected[0].lastName}`]: responsibles,
  };

  return result;
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
