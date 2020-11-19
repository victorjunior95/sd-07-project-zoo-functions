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

const { animals, employees, prices } = data; // , hours

function animalsByIds(...ids) {
  return ids.map(idFind => animals.find(animal => animal.id === idFind));
}

function animalsOlderThan(animal, age) {
  const animalFind = animals.find(specie => specie.name === animal);
  return animalFind.residents.every(creature => creature.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees
    .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees
    .some(employee => employee.managers
      .some(managerId => managerId === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, object) =>
      Object.assign(acc, { [object.name]: object.residents.length }), {});
  }
  return animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants = 0) {
  if (!entrants) return 0;
  const {
    Adult: adultValue = 0,
    Senior: seniorValue = 0,
    Child: childValue = 0 } = entrants;
  const { Adult, Senior, Child } = prices;
  const totalValue = (adultValue * Adult) + (seniorValue * Senior) + (childValue * Child);
  return totalValue;
}

function animalMap(options) {
  const speciesByLocation = {};
  animals.forEach(({ location }) => speciesByLocation[location] = []);
  // { NE: [], NW: [], SE: [], SW: [] }
  // 'Sem parâmetros, retorna animais categorizados por localização'
  // { NE: ['lions', 'giraffes'], NW: ...}
  if (!options) {
    animals.forEach(({ name, location }) => speciesByLocation[location].push(name));
    // { NE: ['lions', 'giraffes'], NW: ...}
    return speciesByLocation;
  }

  const { includeNames = false, sorted = false, sex } = options;

  // 'Com a opção `includeNames: true`, retorna nomes de animais'
  // { NE: [{ 'lions': ['Zena', 'Maxwell' ...]} ...], NW: ... }
  if (includeNames) {
    const namesBySpecie = {}; // { NE: [ { lions: [?Array?] }, { giraffes: [Array] } ], NW: ...}  
    for (location in speciesByLocation) {
    // location -> CHAVE (NE, NW ...)
    // speciesByLocation[location] -> VALUE (lions, giraffes / tigers, bears / ...)
      const animalsByLocation = animals
        .filter(specie => specie.location === location); // [{lions}, {giraffes}]
      const arrayNamesBySpecie = animalsByLocation.map(specie => {
        const nameOfSpecie = specie.name; // lions
        const residentsBySpecie = specie.residents // [{1o lion}, {2o lion} ...]
          // 'Com a opção `sex: \'female\'` ou `sex: \'male\'` especificada, retorna somente nomes de animais macho/fêmea'
          .filter(animal => {
            const sexIsDefined = sex !== undefined;
            return (sexIsDefined ? animal.sex === sex : true);
          })
          .map(animal => animal.name); // ['Zena', 'Maxwell' ...]
        // 'Com a opção `sorted: true`, retorna nomes de animais ordenados'
        /* 'Com a opção `sex: \'female\'ou \'male\'` especificada e
        a opção `sort: true`, retorna os nomes dos animais ordenados conforme o sexo macho/fêmea' */
        if (sorted) residentsBySpecie.sort(); // ['Dee', 'Faustino' ...]
        return { [nameOfSpecie]: residentsBySpecie }; // { 'lions': ['Zena', 'Maxwell' ...] }
      });
      namesBySpecie[location] = arrayNamesBySpecie;
    }
    return namesBySpecie;
    // console.log(namesBySpecie['NE']);
  }
  // 'Só retorna informações ordenadas e com sexo se a opção `includeNames: true` for especificada'
  return speciesByLocation;
}
// console.log(animalMap({ sex: 'female' })['NE'][0]);

function schedule(dayName) {
  // 'Sem parâmetros, retorna um cronograma legível para humanos'
  // if(!dayName) { ({ [Object.keys(hours)]: `Open`})
  // }
  //     'Tuesday': 'Open from 8am until 6pm',
  //     'Wednesday': 'Open from 8am until 6pm',
  //     'Thursday': 'Open from 10am until 8pm',
  //     'Friday': 'Open from 10am until 8pm',
  //     'Saturday': 'Open from 8am until 10pm',
  //     'Sunday': 'Open from 8am until 8pm',
  //     'Monday': 'CLOSED'
  // if (!species) {
  //   return animals.reduce((acc, object) =>
  //     Object.assign(acc, { [object.name]: object.residents.length }), {});
  // }
  // 'Se um único dia for passado, retorna somente este dia em um formato legível para humanos'
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
