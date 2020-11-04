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

const animalsByIds = (...ids) => ids
.map(idAnimal => data.animals.find(animals => animals.id === idAnimal));
// seu código aqui
function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalList = data.animals.find(animalName => animalName.name === animal);
  const animalAge = animalList.residents.every(animalName => animalName.age >= age);
  return animalAge;
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(({ firstName, lastName }) =>
firstName === employeeName || lastName === employeeName,
);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { firstName, lastName, id } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const plusEmployee = { firstName, id, lastName, managers, responsibleFor };
  return plusEmployee;
}

function isManager(id) {
  // seu código aqui
  const compareId = [];
  data.employees.map(grup => grup.managers.forEach(grupElement => compareId.push(grupElement)));
  const cathId = compareId.some(grup => grup === id);
  return cathId;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
  if (managers === undefined) {
    managers = [];
  }
  if (responsibleFor === undefined) {
    responsibleFor = [];
  }
  const employee = {
    id, firstName, lastName, managers, responsibleFor,
  };
  return data.employees.push(employee);
}

function animalCount(species) {
  // seu código
  if (species === undefined) {
    return data.animals.reduce((acummulation, arrayAnimal) =>
    Object.assign(acummulation, { [arrayAnimal.name]: arrayAnimal.residents.length }),
    {});
  } return data.animals.find(residents => residents.name === species).residents.length;
}


function entryCalculator(entrants = {}) {
  return (Object.keys(entrants).reduce((sum, currentValue) =>
    sum + (entrants[currentValue] * data.prices[currentValue])
  , 0));
}
// OPTIONS = OBJETO
// QUAIS OPÇOES PODE TER?
// IINCLUDESNAMES BOOL
// SORTED = BOLL
// SEX: STRING

// localizações
// function retrieveAvaliableLocations() {
//   return ['NE', 'NW','SE', 'SEw'];
// }

// function retrieveFilterAnimalsByLocation(location) {

// return .filter((animal) => animal.location === location)
// .map( (animal) => animal.name );
// }
// function retrieveAnimalsPerLocations(locations) {
//   const animalsPerLocations = {};
  // regra de negocios

  // locations.forEach((location) => {
  //   const filteredAnimails = animals
  //     if (filteredAnimails.length !== 0) animalsPerLocations[location] = filteredAnimails;
  //     return animalsPerLocations;
  // });

function animalMap(options = {}) {
  const out = { NE: [], NW: [], SE: [], SW: [] };
  if (options.includeNames !== true) {
    data.animals.forEach(({ location, name }) => out[location].push(name));
    return out;
  }
  if (options.sex !== undefined) {
    data.animals.forEach(({ name, location, residents }) =>
      out[location].push({
        [name]: residents
          .filter(resident => resident.sex === options.sex)
          .map(resident => resident.name),
      }),
    );
  } else {
    data.animals.forEach(({ name, location, residents }) =>
      out[location].push({ [name]: residents.map(resident => resident.name) }),
    );
  }
  if (options.sorted) {
    Object.keys(out).forEach(key =>
      out[key].forEach(element => element[Object.keys(element)].sort()),
    );
  }
  return out;
}

  // if (!options) {
  // retornar animasi categorizados por localização
  // }
  // fazer outra coisa

// const objetoInicial = {
//   NE: [],
//   NW: [],
//   SE: [],
//   SW: [],
// }

// function categorizeAnimalsByLocation(){
//   // retornar animais categorizados por localização
//   return data.animals.reduce((acc, specie) => {
//     return [
//       ...acc,
//       [specie.location]: [
//         ...acc[specie.location],
//         {
//           [specie.name]: specie.residents
//             .map((resident) => resident.name)
//         },
//       ]
//     };
//   }, objetoInicial);
// }

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
