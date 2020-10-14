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
// Requisito 1 - OK
function animalsByIds(...rest) {
  // seu código aqui

  const animalList = [];
  if (rest === undefined) {
    return [];
  }
  rest.forEach((idRec) => {
    animalList.push(data.animals.find(({ id }) => id === idRec));
  });
  return animalList;
}
// Requisito 2 - OK
function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalList = data.animals.find(({ name }) => name === animal).residents;

  const ageVer = animalList.reduce((acc, curr) => {
    if (curr.age < age) {
      return acc + 1;
    }
    return acc;
  }, 0);

  if (ageVer > 0) {
    return false;
  }

  return true;
}
// Requisito 3 - OK
function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }

  const name = employeeName;

  const dataEmp = data.employees;

  const empObj = dataEmp.find(({ firstName, lastName }) => firstName === name || lastName === name);

  return empObj;
}
// Requisito 4 - OK
function createEmployee(personalInfo, associatedWith) {
  const newEmployee = Object.assign(personalInfo, associatedWith);

  return newEmployee;
}
// Requisito 5 - OK
function isManager(id) {
  // seu código aqui
  let managerCheck = 0;

  data.employees.forEach(({ managers }) => {
    managers.forEach((idElement) => {
      if (idElement === id) {
        managerCheck += 1;
      }
    });
  });

  if (managerCheck > 0) {
    return true;
  }
  return false;
}
// Requisito 6 - OK
function addEmployee(id = '', firstName = '', lastName = '', managers = [], responsibleFor = []) {
  // seu código aqui

  const newAddedEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  data.employees.push(newAddedEmployee);
}
// Requisito 7 - OK
function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    const animals = {};
    data.animals.forEach(({ name, residents }) => {
      animals[name] = residents.length;
    });

    return animals;
  }

  return data.animals.find(({ name }) => name === species).residents.length;
}
// Requisito 8 - OK
function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }

  const { Adult: AdultQtd = 0, Senior: SeniorQtd = 0, Child: ChildQtd = 0 } = entrants;
  const { Adult, Senior, Child } = data.prices;
  const totalValue = (AdultQtd * Adult) + (SeniorQtd * Senior) + (ChildQtd * Child);
  return totalValue;
}
// Requisito 9 - OK
function animalMap(options) {
  // seu código aqui

  const animalLocale = {};
  data.animals.forEach(({ location }) => { animalLocale[location] = []; });

  if (options !== undefined) {
    const { includeNames = '', sorted = '', sex = 'nd' } = options;
    if (includeNames) {
      data.animals.forEach(({ name: specieName, location, residents }) => {
        const specie = {};
        specie[specieName] = [];
        if (sex === 'nd') {
          specie[specieName] = residents.map(({ name }) => name);
        } else {
          specie[specieName] = residents
          .filter(({ sex: gender }) => gender === sex)
          .map(({ name }) => name);
        }
        if (sorted) {
          specie[specieName].sort();
        }
        animalLocale[location].push(specie);
      });
      return animalLocale;
    }
  }
  data.animals.forEach(({ name, location }) => animalLocale[location].push(name));
  return animalLocale;
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
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
