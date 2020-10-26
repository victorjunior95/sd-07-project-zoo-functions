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
const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');


function animalsByIds(...ids) {
  const idsAnimals = animals.filter(animal => ids.includes(animal.id));
  return idsAnimals;
}

function animalsOlderThan(animal, age) {
  const species = animals.find(specie => specie.name === animal);
  return species.residents.every(resid => resid.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};

  return employees.find(
    person => person.firstName === employeeName || person.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some((person, index) => person.managers[index] === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  let arrayManagers = managers;
  if (managers === undefined) {
    arrayManagers = [];
  }
  let arrayResponsibleFor = responsibleFor;
  if (responsibleFor === undefined) {
    arrayResponsibleFor = [];
  }

  const lastEmployee = {
    id,
    firstName,
    lastName,
    managers: arrayManagers,
    responsibleFor: arrayResponsibleFor,
  };

  employees.push(lastEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((animalObj, animal) => {
      animalObj[animal.name] = animal.residents.length;
      return animalObj;
    }, {});
  }

  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }

  const valueEntrants = Object.keys(entrants);

  const ticketSum = valueEntrants.reduce((sum, keys) => {
    sum += entrants[keys] * prices[keys];
    return sum;
  }, 0);

  return ticketSum;
}

function noParameterAnimalmap() {
  let directionsObject = { NE: [], NW: [], SE: [], SW: [] };

  animals.forEach((animal) => {
    directionsObject = { ...directionsObject,
      [animal.location]: [...directionsObject[animal.location], animal.name] };
  });
  return directionsObject;
}

function animalMapWithIncludeNames(locations, sorting, animalSex) {
  const animalMapObject = {};

  locations.forEach((direction) => {
    const filterAnimals = animals
    .filter(specie => specie.location === direction).map((animal) => {
      const animalName = animal.name;

      const sexAnimals = animal.residents.filter((resident) => {
        if (animalSex !== undefined) {
          return resident.sex === animalSex;
        }
        return true;
      }).map(residentSpecie => residentSpecie.name);

      if (sorting) sexAnimals.sort();
      return { [animalName]: sexAnimals };
    });

    animalMapObject[direction] = filterAnimals;
  });

  return animalMapObject;
}

function animalMap(options) {
  // função feita seguindo a resolução do requisito por Gabriel Oliva
  if (!options) return noParameterAnimalmap();

  const directions = ['NE', 'NW', 'SE', 'SW'];
  const { includeNames = false, sorted = false, sex } = options;

  if (includeNames) {
    return animalMapWithIncludeNames(directions, sorted, sex);
  }

  return noParameterAnimalmap();
}


function schedule(...dayName) {
  if (dayName.length === 0) {
    dayName = Object.keys(hours);
  }

  let times = {};

  dayName.forEach((day) => {
    if (day === 'Monday') {
      times = { ...times, [day]: 'CLOSED' };
    } else {
      times = { ...times, [day]: `Open from ${hours[day].open}am until ${hours[day].close - 12}pm` };
    }
  });

  return times;
}

function oldestFromFirstSpecies(id) {
  const firstSpecie = employees.find(employee => employee.id === id).responsibleFor[0];

  const animalSpecie = animals
  .find(animal => animal.id === firstSpecie).residents
  .sort((animalA, animalB) => animalB.age - animalA.age);

  return Object.values(animalSpecie[0]);
}

function increasePrices(percentage) {
  const keysPrice = Object.keys(prices);

  keysPrice.forEach((element) => {
    prices[element] = Math.ceil(prices[element] * (100 + percentage)) / 100;
  });

  return prices;
}

function employeeCoverage(idOrName) {
  const allEmployees = employees.map(employee => `${employee.firstName} ${employee.lastName}`);

  const allAnimals = employees.map(element => element.responsibleFor
    .map(id => animals.find(animal => animal.id === id).name));

  let allList = {};

  if (!idOrName) {
    allEmployees.forEach((element, index) => {
      allList = { ...allList, [element]: allAnimals[index] };
    });
  } else {
    const findEmployee = employees
    .find(({ id, firstName, lastName }) =>
      idOrName === id || idOrName === firstName || idOrName === lastName,
    );

    const firstAndLastNameEmployee = `${findEmployee.firstName} ${findEmployee.lastName}`;

    allList = { [firstAndLastNameEmployee]: allAnimals[allEmployees.indexOf(`${firstAndLastNameEmployee}`)] };
  }

  return allList;
}

employeeCoverage('fdb2543b-5662-46a7-badc-93d960fdc0a8');

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
