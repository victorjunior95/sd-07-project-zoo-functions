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
  const animalsId = ids;

  if (animalsId.length === 0) {
    return [];
  }

  const animals = [];

  animalsId.forEach((animal) => {
    const uniqueAnimal = data.animals.filter(element => element.id === animal);

    animals.push(uniqueAnimal[0]);
  });

  return animals;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalToFind = animal;

  const animals = data.animals.filter(dataAnimal => dataAnimal.name === animalToFind);

  const isMinimumAge = animals[0].residents.every(resident => resident.age >= age);

  return isMinimumAge;
}

function employeeByName(employeeName = {}) {
  // seu código aqui
  const nameOrSurname = employeeName;

  if (Object.keys(nameOrSurname).length === 0) {
    return {};
  }

  const employee = data.employees.filter(info =>
    (info.firstName === nameOrSurname) || (info.lastName === nameOrSurname),
  );

  return employee[0];
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const newEmployee = personalInfo;

  newEmployee.managers = associatedWith.managers;
  newEmployee.responsibleFor = associatedWith.responsibleFor;

  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  const idEmployee = id;

  const isAManager = data.employees.some(person =>
    person.managers[0] === idEmployee,
  );

  return isAManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };

  data.employees.push(newEmployee);
}

function animalCount(...species) {
  // seu código aqui
  if (species.length === 0) {
    const objAnimal = {};

    data.animals.forEach((animal) => { objAnimal[animal.name] = animal.residents.length; });

    return objAnimal;
  }
  const animalName = species[0];

  const specie = data.animals.filter(animal => animal.name === animalName);

  const numberOfAnimals = specie[0].residents.length;

  return numberOfAnimals;
}

function entryCalculator(entrants = 0) {
  // seu código aqui
  if (entrants === 0) {
    return 0;
  } else if (Object.keys(entrants).length === 0) {
    return 0;
  }

  const { Adult, Senior, Child } = data.prices;
  let sum = 0;

  Object.keys(entrants).forEach((key) => {
    if (key === 'Adult') {
      sum += (Adult * entrants[key]);
    } else if (key === 'Senior') {
      sum += (Senior * entrants[key]);
    } else if (key === 'Child') {
      sum += (Child * entrants[key]);
    }
  });

  return sum;
}

function animalMap(options = false) {
  // seu código aqui
  const { includeNames = false, sex = false, sorted = false } = options;
  const { animals } = data;
  const objAnimals = { NE: [], NW: [], SE: [], SW: [] };
  Object.keys(objAnimals).forEach((key) => {
    const animalPlaces = animals.filter(animal => animal.location === key).map(ab => ab.name);
    if ((!options) || (!includeNames)) { objAnimals[key] = animalPlaces; } else {
      Object.keys(animalPlaces).forEach((keyAnimal) => {
        const animalNames = []; const objAnimal = {};
        const arrayOfNames = animals.filter(item => item.name === animalPlaces[keyAnimal]);
        arrayOfNames[0].residents.forEach((names) => {
          if (!sex) {
            animalNames.push(names.name);
          } else if (names.sex === sex) {
            animalNames.push(names.name);
          }
        });
        if (sorted) { objAnimal[animalPlaces[keyAnimal]] = animalNames.sort(); } else {
          objAnimal[animalPlaces[keyAnimal]] = animalNames;
        }
        objAnimals[key].push(objAnimal);
      });
    }
  });
  return objAnimals;
}

function schedule(dayName) {
  // seu código aqui
  const scheduleMessage = {};
  let message = '';
  let hourOpen = 0;
  let hourClose = 0;
  let scheduleDay = {};

  if (dayName) {
    scheduleDay[dayName] = { open: data.hours[dayName].open, close: data.hours[dayName].close };
  } else {
    scheduleDay = data.hours;
  }

  Object.keys(scheduleDay).forEach((key) => {
    if (scheduleDay[key].close === 0) {
      message = 'CLOSED';
    } else {
      hourOpen = (((scheduleDay[key].open + 11) % 12) + 1);
      hourClose = (((scheduleDay[key].close + 11) % 12) + 1);
      message = `Open from ${hourOpen}am until ${hourClose}pm`;
    }
    scheduleMessage[key] = message;
  });

  return scheduleMessage;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const { employees, animals } = data;
  const employeeInfo = employees.find(employee => employee.id === id);
  const firstId = employeeInfo.responsibleFor[0];
  const specie = animals.find(animal => animal.id === firstId);
  let oldestAge = 0;
  let objOldestAge;

  specie.residents.forEach((resident) => {
    if (resident.age > oldestAge) {
      oldestAge = resident.age;
      objOldestAge = resident;
    }
  });

  const { name, sex, age } = objOldestAge;
  const oldest = [name, sex, age];

  return oldest;
}

function increasePrices(percentage) {
  // seu código aqui
  const newPrices = data.prices;

  Object.keys(newPrices).forEach((key) => {
    let aux = 0;

    aux = parseFloat(parseFloat(percentage * 0.01) * newPrices[key]);
    newPrices[key] = parseFloat(
      parseFloat(parseFloat(aux) + parseFloat(newPrices[key])) + (0.001))
      .toFixed(2);
  });

  return newPrices;
}

function employeeCoverage(idOrName) {
  // seu código aqui
  const { employees, animals } = data;
  const objEmployees = {};
  let employee;

  if (idOrName) {
    employee = employees.filter(someone =>
      (someone.id === idOrName) ||
        (someone.firstName === idOrName) || (someone.lastName === idOrName),
    );
  } else {
    employee = data.employees;
  }

  Object.keys(employee).forEach((key) => {
    const employeeAnimals = [];
    employee[key].responsibleFor.forEach((animal) => {
      const nameAnimals = animals.find(element => element.id === animal);
      employeeAnimals.push(nameAnimals.name);
    });
    objEmployees[`${employee[key].firstName} ${employee[key].lastName}`] = employeeAnimals;
  });
  return objEmployees;
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
