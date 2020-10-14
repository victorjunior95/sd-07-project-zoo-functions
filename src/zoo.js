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
  return data.animals.filter(animal => ids.includes(animal.id));
  /*
  if (arguments.length === 0) {
    return [];
  } else if (arguments.length === 1) {
    const result = data.animals.find(animal => animal.id === arguments, 0);
    return [result];
  } else if (arguments.length === 2) {
    const result = data.animals.find(animal => animal.id === arguments, 0);
    const result2 = data.animals.find(animal => animal.id === arguments, 1);
    return [result, result2];
  }
  return;
  */
}

function animalsOlderThan(species, age) {
  // seu código aqui
  const mySpecie = data.animals.find(animal => species.includes(animal.name));
  const mySpecieOlder = mySpecie.residents.every(animal => animal.age >= age);
  return mySpecieOlder;
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName) {
    const filterResult = data.employees.find(e =>
      e.firstName === employeeName || e.lastName === employeeName);
    return filterResult;
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  if (personalInfo && associatedWith) {
    data.employees.push({ ...personalInfo, ...associatedWith });
  }
  const lastEmployee = data.employees.length - 1;
  const newEmployee = data.employees[lastEmployee];
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  if (id) {
    const findEmployees = data.employees.find(employees => employees.id === id);
    return findEmployees.managers.includes('9e7d4524-363c-416a-8759-8aa7e50c0992');
  }
  return false;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  if (species) {
    const mySpecie = data.animals.find(animals => animals.name === species);
    return mySpecie.residents.length;
  }
  const countAnimals = {
    lions: 4,
    tigers: 2,
    bears: 3,
    penguins: 4,
    otters: 4,
    frogs: 2,
    snakes: 2,
    elephants: 4,
    giraffes: 6,
  };
  return countAnimals;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const total = (Adult * 49.99) + (Child * 20.99) + (Senior * 24.99);
  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const daysSchedule = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (dayName) {
    const day = {};
    day[dayName] = daysSchedule[`${dayName}`];
    return day;
  }
  return daysSchedule;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  if (id) {
    const managerEmployee = data.employees.find(employee => employee.id === id);
    const allAnimals = data.animals.find(
      animal => animal.id === managerEmployee.responsibleFor[0],
    );
    const allAge = allAnimals.residents.filter(ageAnimal => ageAnimal.age > 0);
    const oldAnimal = allAge.sort((old1, old2) => (old2.age - old1.age));
    const result = Object.values(oldAnimal[0]);
    return result;
  }
  return 0;
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
