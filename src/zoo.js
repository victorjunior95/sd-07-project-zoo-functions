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

const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const animais = [];
  ids.forEach(id => animais.push(animals.find(animal => animal.id === id)));
  return animais;
}

function animalsOlderThan(animal, age) {
  const animalEncontrado = animals.find(especie => especie.name === animal);
  return animalEncontrado.residents.every(residente => residente.age >= age);
}

function employeeByName(employeeName = 'vazio') {
  if (employeeName === 'vazio') { return {}; }
  return employees.find(employee =>
    employee.firstName === employeeName ||
    employee.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  const managers = [];
  employees.forEach((employee) => {
    employee.managers.forEach(manager => managers.push(manager));
  });
  return managers.some(manager => manager === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
  return employees;
}

function animalCount(species = 'vazio') {
  let infos = {
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
  if (species !== 'vazio') {
    infos = infos[species];
  }
  return infos;
}

function entryCalculator(entrants = {}) {
  let adult = 0;
  let senior = 0;
  let child = 0;
  if (entrants.Adult) { adult = entrants.Adult; }
  if (entrants.Senior) { senior = entrants.Senior; }
  if (entrants.Child) { child = entrants.Child; }
  const conta = (adult * data.prices.Adult) +
    (senior * data.prices.Senior) +
    (child * data.prices.Child);
  return conta;
}

function animalMap(options = 'vazio') {
  const infos = { NE: ['lions', 'giraffes'],
    NW: ['tigers', 'bears', 'elephants'],
    SE: ['penguins', 'otters'],
    SW: ['frogs', 'snakes'],
  };
  const selectedinfos = infos;
  const regioes = ['NE', 'NW', 'SE', 'SW'];
  if (options.includeNames === true) {
    regioes.forEach((regiao) => {
      selectedinfos[regiao].forEach((elemento) => {
        const position = selectedinfos[regiao].indexOf(elemento);
        const especie = selectedinfos[regiao][position];
        selectedinfos[regiao][position] = { [selectedinfos[regiao][position]]: [] };
        animals.find(animal => animal.name === especie).residents.forEach((residente) => {
          if (options.sex) {
            if (residente.sex === options.sex) {
              selectedinfos[regiao][position][especie].push(residente.name);
            }
          } else { selectedinfos[regiao][position][especie].push(residente.name); }
        });
        if (options.sorted === true) { selectedinfos[regiao][position][especie].sort(); }
      });
    });
  }
  return selectedinfos;
}

function schedule(dayName = 'vazio') {
  let infos = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (dayName !== 'vazio') {
    infos = { [dayName]: infos[dayName] };
  }
  return infos;
}

function oldestFromFirstSpecies(id) {
  const selectedEmployee = employees.find(employee => employee.id === id);
  const selectedSpecie = animals.find(animal => animal.id === selectedEmployee.responsibleFor[0]);
  let oldest = ['', '', 0];
  selectedSpecie.residents.forEach((resident) => {
    if (resident.age > oldest[2]) {
      oldest = [resident.name, resident.sex, resident.age];
    }
  });
  return oldest;
}

function increasePrices(percentage) {
  const tipos = ['Adult', 'Senior', 'Child'];
  tipos.forEach((tipo) => {
    data.prices[tipo] = Math.round((data.prices[tipo] * (1 + (percentage / 100))) * 100) / 100;
  });
}

function employeeCoverage(idOrName = 'vazio') {
  let infos = {};
  if (idOrName === 'vazio') {
    infos = {
      'Nigel Nelson': ['lions', 'tigers'],
      'Burl Bethea': ['lions', 'tigers', 'bears', 'penguins'],
      'Ola Orloff': ['otters', 'frogs', 'snakes', 'elephants'],
      'Wilburn Wishart': ['snakes', 'elephants'],
      'Stephanie Strauss': ['giraffes', 'otters'],
      'Sharonda Spry': ['otters', 'frogs'],
      'Ardith Azevado': ['tigers', 'bears'],
      'Emery Elser': ['elephants', 'bears', 'lions'],
    };
    return infos;
  }
  const selectedEmployee = employees.find((employee) => {
    const { id, firstName, lastName } = employee;
    return (id === idOrName) || (firstName === idOrName) || (lastName === idOrName);
  });
  const animais = [];
  selectedEmployee.responsibleFor.forEach((idAnimal) => {
    animals.forEach((animal) => { if (idAnimal === animal.id) { animais.push(animal.name); } });
  });
  return { [`${selectedEmployee.firstName} ${selectedEmployee.lastName}`]: animais };
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
