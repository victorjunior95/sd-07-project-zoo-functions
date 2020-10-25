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
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(species => species.name === animal).residents.every(i => i.age >= age);
}

function employeeByName(emp) {
  if (!emp) return {};
  return data.employees.find(({ firstName, lastName }) => firstName === emp || lastName === emp);
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some(sereal => sereal.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    const geral = {};
    data.animals.forEach(({ name, residents }) => {
      geral[name] = residents.length;
    });
    return geral;
  }

  const escolido = data.animals.find(({ name }) => name === species);
  const { residents } = escolido;
  return residents.length;
}

function entryCalculator(entrants) {
  const { prices } = data;
  if (!entrants || entrants === {}) return 0;

  return Object.entries(entrants).reduce((rest, now) => rest + (prices[now[0]] * now[1]), 0);
}

const returnAvelibleLocation = () => { return ['NE', 'NW', 'SE', 'SW']; }

const returnAnimalsPerLocation = (locations) => {
  const perLocation = {};

  locations.forEach((locations) => {
     const filteredAnimal = data.animals.filter((animal) => animal.location === locations)
     .map((animal) => animal.name);
  
     perLocation[locations] = filteredAnimal;
     });
  return perLocation;
};

const returnAnimalsPerLocationWithName = (locations, sorted, sex) => {
  const perLocation = {};

  locations.forEach((locations) => {
     const filteredAnimal = data.animals.filter((animal) => animal.location === locations)
     .map((animal) => {
       const animalName = animal.name;
       const residents = animal.residents
       .filter((residents) => {
         const filteringSex = sex !== undefined;
         return filteringSex ? residents.sex === sex : true;
       })
       .map((residents) => residents.name);

       if (sorted) residents.sort();

       return { [animalName]: residents };
     })
  
     perLocation[locations] = filteredAnimal;
     });
  return perLocation;
};

function animalMap(options) {
  const locations = returnAvelibleLocation();
  if (!options) return returnAnimalsPerLocation(locations);

  const { includeNames = false, sorted = false, sex } = options;
  if (includeNames) {
    return returnAnimalsPerLocationWithName(locations, sorted, sex);
  } else {
    return returnAnimalsPerLocation(locations);
  }

}

const daysList = (dayName) => {
  if (dayName === 'Monday') return 'CLOSED';
  return `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
};

function schedule(dayName) {
  const days = {};
  if (!dayName) {
    Object.keys(data.hours).forEach((key) => {
      days[key] = daysList(key);
    });
  } else {
    days[dayName] = daysList(dayName);
  }
  return days;
}

function oldestFromFirstSpecies(id) {
  const emp = data.employees.find(employee => employee.id === id).responsibleFor[0];
  const whichAnimal = data.animals.find(animal => animal.id === emp).residents;
  const choosed = whichAnimal.sort((a, b) => b.age - a.age);
  return [choosed[0].name, choosed[0].sex, choosed[0].age];
}

function increasePrices(percentage) {
  const value = Object.keys(data.prices);
  value.forEach((price) => {
    const ajustment = Math.round((data.prices[price] * (1 + (percentage / 100))) * 100) / 100;
    data.prices[price] = ajustment;
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
