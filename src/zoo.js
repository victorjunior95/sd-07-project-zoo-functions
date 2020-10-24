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

const { animals, employees, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const animalsWithId = [];
  ids.forEach((id) => {
    animalsWithId.push(animals.find(animal => animal.id === id));
  });
  return animalsWithId;
}

function animalsOlderThan(animal, age) {
  return animals.find(species => species.name === animal)
    .residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  const employeeObject = {};
  Object.assign(employeeObject, employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName));
  return employeeObject;
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  const managersArray = [];
  employees.forEach((employee) => {
    employee.managers.forEach((manager) => {
      if (!managersArray.includes(manager)) {
        managersArray.push(manager);
      }
    });
  });
  return managersArray.includes(id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const personalInfo = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(personalInfo);
}

function animalCount(species) {
  let animalQuantities = {};
  animals.forEach((animal) => {
    animalQuantities[animal.name] = animal.residents.length;
  });
  if (species !== undefined) {
    animalQuantities = animals
      .find(animal => animal.name === species)
      .residents
      .length;
  }
  return animalQuantities;
}

function entryCalculator(entrants = 0) {
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const totalPrice = (Adult * 49.99) + (Child * 20.99) + (Senior * 24.99);
  return totalPrice;
}

const filterBySex = (arr, sex) => {
  if (sex !== undefined) {
    return arr.filter(name => name.sex === sex);
  }
  return arr;
};

const getAnimalsName = (specie, sorted, sex) => {
  let animalsName = animals.find(animal => animal.name === specie).residents;
  animalsName = filterBySex(animalsName, sex);
  animalsName = animalsName.map(name => name.name);
  if (sorted) {
    animalsName.sort();
  }
  return animalsName;
};

function animalMap(options) {
  const generalMap = [['NE', []], ['NW', []], ['SE', []], ['SW', []]];
  generalMap.forEach((region) => {
    const regionAnimals = animals.filter(specie => specie.location === region[0]);
    regionAnimals.forEach((animal) => {
      region[1].push(animal.name);
    });
  });

  if (options !== undefined) {
    const { includeNames = false, sorted = false, sex } = options;
    if (includeNames) {
      generalMap.forEach((element) => {
        element[1] = element[1]
        .map(animal => Object.fromEntries([[animal, getAnimalsName(animal, sorted, sex)]]));
      });
    }
  }
  return Object.fromEntries(generalMap);
}

function schedule(dayName) {
  let scheduleForHuman = {};
  const entriesArray = Object.entries(hours);
  entriesArray.forEach((dayOfWeek) => {
    if (dayOfWeek[0] === 'Monday') {
      scheduleForHuman.Monday = 'CLOSED';
    } else {
      scheduleForHuman[dayOfWeek[0]] = `Open from ${dayOfWeek[1].open}am until ${dayOfWeek[1].close - 12}pm`;
    }
  });
  if (dayName !== undefined) {
    const targetEntrie = [[dayName, scheduleForHuman[dayName]]];
    scheduleForHuman = Object.fromEntries(targetEntrie);
  }
  return scheduleForHuman;
}

console.log(schedule());

const getTheBiggest = arr => arr.reduce((acc, curr) => {
  if (acc.age > curr.age) {
    return acc;
  }
  return curr;
});

function oldestFromFirstSpecies(id) {
  const firstSpecieResponsible = employees.find(employee => employee.id === id)
    .responsibleFor[0];
  let oldestAnimal = animals.find(animal => animal.id === firstSpecieResponsible)
    .residents;
  oldestAnimal = getTheBiggest(oldestAnimal);
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  const decimalPercentage = 1 + (percentage / 100);
  const { Adult, Senior, Child } = data.prices;
  Object.assign(data.prices = {
    Adult: Number(((Adult * decimalPercentage) + 0.001).toFixed(2)),
    Senior: Number(((Senior * decimalPercentage) + 0.001).toFixed(2)),
    Child: Number(((Child * decimalPercentage) + 0.001).toFixed(2)),
  });
}

const getAnimalsById = ids => animals.filter(animal => ids.includes(animal.id))
  .map(animal => animal.name);

function employeeCoverage(idOrName) {
  let employeesResponsibility = {
    'Nigel Nelson': ['lions', 'tigers'],
    'Burl Bethea': ['lions', 'tigers', 'bears', 'penguins'],
    'Ola Orloff': ['otters', 'frogs', 'snakes', 'elephants'],
    'Wilburn Wishart': ['snakes', 'elephants'],
    'Stephanie Strauss': ['giraffes', 'otters'],
    'Sharonda Spry': ['otters', 'frogs'],
    'Ardith Azevado': ['tigers', 'bears'],
    'Emery Elser': ['elephants', 'bears', 'lions'],
  };
  if (idOrName !== undefined) {
    const employee = employees
      .find(employeeObject => employeeObject.id === idOrName ||
        employeeObject.firstName === idOrName ||
        employeeObject.lastName === idOrName);
    employeesResponsibility = [
      [`${employee.firstName} ${employee.lastName}`, getAnimalsById(employee.responsibleFor)],
    ];
    employeesResponsibility = Object.fromEntries(employeesResponsibility);
  }
  return employeesResponsibility;
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
