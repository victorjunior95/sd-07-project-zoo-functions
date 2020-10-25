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
  if (ids.length === 0) {
    return [];
  }
  const animalById = data.animals.filter((animal, index) => animal.id === ids[index]);
  return animalById;
}

function animalsOlderThan(animal, age) {
  let minAge = true;
  const animalName = data.animals.find(species => species.name === animal);
  animalName.residents.forEach((resident) => {
    if (resident.age <= age) {
      minAge = false;
    }
  });
  return minAge;
}

function employeeByName(employeeName = '') {
  // const employee = employeeName;
  if (employeeName.length === 0) {
    return {};
  }
  const clerks = data.employees;
  const clerkFirstName = clerks.find(person => person.firstName === employeeName);
  const clerkLastName = clerks.find(person => person.lastName === employeeName);
  return clerkFirstName || clerkLastName;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = Object.assign({}, personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  let manager = false;
  const managersIds = data.employees.map(employee => employee.managers);
  managersIds.forEach((ids, index) => {
    if (ids[index] === id) {
      manager = true;
    }
  });
  return manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const props = [
    'id',
    'firstName',
    'lastName',
    'managers',
    'responsibleFor',
  ];
  const newEmployee = {};
  newEmployee[props[0]] = id;
  newEmployee[props[1]] = firstName;
  newEmployee[props[2]] = lastName;
  newEmployee[props[3]] = managers;
  newEmployee[props[4]] = responsibleFor;
  data.employees.push(newEmployee);
}

function animalCount(species = '') {
  const allAnimals = {};
  if (species.length === 0) {
    data.animals.forEach((animal) => {
      const propName = animal.name;
      const quantityAnimals = animal.residents.length;
      allAnimals[propName] = `${quantityAnimals}`;
    });
    return allAnimals;
  }

  const allResidents = data.animals.find(animal => animal.name === species);
  return allResidents.residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) return 0;
  let totalPrice = 0;
  const givenEntrants = Object.keys(entrants);
  givenEntrants.forEach((visitor) => {
    if (data.prices[visitor]) {
      totalPrice += (data.prices[visitor] * entrants[visitor]);
    }
  });
  return totalPrice;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName = '') {
  const openingHours = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };

  if (dayName.length === 0) return openingHours;
  const openingSchedule = Object.keys(openingHours);
  const givenDay = openingSchedule.find(day => day === dayName);
  const result = {
    [givenDay]: openingHours[givenDay],
  };
  return result;
}

function oldestFromFirstSpecies(id) {
  // Checar ID passado com os IDs do ARRAY employees;
  // Pegar o PRIMEIRO ID de animal do objeto verificado
  //anteriormente;
  // Verificar o ID do passo anterior com os IDs do ARRAY
  //animals;
  // Retornar o animal mais velho da espécie.

  const clerk = data.employees.find(employee => employee.id === id);
  const firstSpeciesId = clerk.responsibleFor[0];
  const kind = data.animals.find(animal => animal.id === firstSpeciesId);

  const oldest = [];
  for (let index = 0; index < kind.residents.length; index += 1) {
    // if (index + 1 === kind.residents.length) {
    //   return oldest
    // }

    if (!oldest[2] || oldest[2] < kind.residents[index].age) {
      oldest[0] = `${kind.residents[index].name}`;
      oldest[1] = `${kind.residents[index].sex}`;
      oldest[2] = `${kind.residents[index].age}`;
    }
  }

  // kind.residents.forEach((resident, index) => {
  //   // if (resident.age > kind.residents[index + 1].age) {
  //   //   oldest[0] = [resident];
  //   // }

  //   console.log(kind.residents[index + 6].age);
  // });

  return oldest;
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
