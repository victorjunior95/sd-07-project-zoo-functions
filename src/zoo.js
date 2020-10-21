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

const { animals } = data;
const { employees } = data;

function animalsByIds(...ids) {
  if (ids === undefined) return [];
  return animals.filter(animal => ids.includes(animal.id));
  
  // tentar com foreach
}

function animalsOlderThan(animal, age) {
  const species = animals.find(specie => specie.name === animal);
  return species.residents.every(resAnimal => resAnimal.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find(emp => emp.firstName === employeeName || emp.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function retrieveAvailableLocations() {
  return ['NE', 'NW', 'SE', 'SW'];
}

function retrieveFilteredAnimalsByLocation(location) {
  return animals.filter((animal) => animal.location === location);
}

function retrieveAnimalsPerLocation(locations) {
  const animalPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location)
    .map((animal) => animal.name);
    // const filteredAnimals = animals.filter(animal => location.includes(animal.location)).map((animal) => animal.name); !! OUTRA ALTERNATIVA !!

    if (filteredAnimals.length !== 0) animalPerLocation[location] = filteredAnimals; // DIFERENTE DE --> animalPerLocation.location = filteredAnimals (.location seria o nome pra todas as keys) !! adicionando ao obj com a key ${location} !!
  });

  return animalPerLocation;
}

function retrieveAnimalsPerLocationWithName (locations, sorted, sex) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location).map((animal) => {
      const animalName = animal.name;
      const residents = animal.residents.filter((resident) => {
        const needFilterSex = sex !==  false // sex === 'male' ||  'female' !! alternativa !! ${needFilterSex} GUARDA UMA BOOLEAN DA COMPARACAO FEITA EM sex !== false (se ${sex} for diferente de 'false', ira mandar pra ${needFilterSex} o resultado 'true')!! 
        // return needFilterSex ? resident.sex === sex : true; !! operador ternario !!
        if (needFilterSex) { // (se o resultado for true, ele ira entrar no 'if'!)
           return resident.sex === sex;
        } else {
          return true;
        }
      }).map(resident => resident.name);
      
      if (sorted) residents.sort();

      return { [animalName]: residents };
    });
    if (filteredAnimals !== 0) animalsPerLocation[location] = filteredAnimals;
  });
  return animalsPerLocation;
}

function animalMap(options) {
  const locations = retrieveAvailableLocations();

  if (!options) return retrieveAnimalsPerLocation(locations); // if (false === false) | if (!options === false) roda o codigo

  const { includeNames = false, sorted = false, sex = false } = options;

  if (includeNames) { // if (true === true) | if (options === true) roda o codigo
    return retrieveAnimalsPerLocationWithName(locations, sorted, sex);
  } else {
    return retrieveAnimalsPerLocation(locations);
  }
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
