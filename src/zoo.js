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

const { animals, employees, hours, prices } = data;

function animalsByIds(...ids) {
  if (ids === undefined) return [];
  return animals.filter(animal => ids.includes(animal.id));
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

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species = false) {
  const allAnimalQuantity = {};
  animals.forEach(animal => (allAnimalQuantity[animal.name] = animal.residents.length));
  if (!species) {
    return allAnimalQuantity;
  }
  return animals.find(animal => (animal.name === species)).residents.length;
}

function entryCalculator(entrants = {}) {
  // (nao é necessario pra esse codigo (now))
  // const { Adult = 0, Senior = 0, Child = 0 } = entrants
  const pricesArr = Object.keys(prices);
  const entrantsArr = Object.keys(entrants);
  const entrantsArrObj = []; // not needed, mas pk nao ^^
  const pricesArrObj = [];
  // (faz array de objetos) !!
  pricesArr.forEach(key => pricesArrObj.push({ [key]: prices[key] }));
  entrantsArr.forEach(key => entrantsArrObj.push({ [key]: prices[key] }));
  // -
  let total = 0;
  const filteredAges = pricesArr.filter(age => entrantsArr.includes(age));

  filteredAges.forEach((age) => {
    pricesArrObj.forEach((agePrice) => {
      if (Object.keys(agePrice).includes(age)) {
        total += prices[age] * entrants[age];
      }
    });
  });
  /* !! ALTERNATIVA !!
  !! forma mais simples de se fazer mas sem seguranca com o input entrants q recebe a funcao !!
  const total = entrantsArr.reduce((sum, keys) => {
    console.log(keys)
    sum += entrants[keys] * prices[keys];
    return sum;
  }, 0);
  */
  return total;
}

function retrieveAvailableLocations() {
  // return ['NE', 'NW', 'SE', 'SW']; !! forma mais simples sabendo todas as locations !!
  /* !! forma mais complicada q a utilizada !!
  const locations = animals
  .map(animal => animal.location)
  .reduce((acc, currentValue) => {
    const dupLocation = acc.includes(currentValue);
    -
    // return dupLocation ? acc : [...acc, currentValue]; !! alternativa !!
    if (dupLocation) {
      return acc
    } else {
      return [...acc, currentValue]
    }
  }, []);
  return locations
  */
  /* !! forma mais simpificada da opcao a cima !!
  return animals
    .map(animal => animal.location)
    .reduce((acc, currentValue) => {
      const dupLocation = acc.includes(currentValue);

      if (!acc.includes(currentValue)) {
        acc.push(currentValue)
      }
      return acc
    }, []);
  */
  /* !! forma alternativa pra opcao de cima !!
  let locations = [];
  const dupLocations = animals.map(animal => animal.location);
  dupLocations.forEach(location => {
    if (!locations.includes(location)) {
      locations.push(location)
    }
  })
  return locations;
  */

  const dupLocations = animals.map(animal => animal.location);
  // !! const locations = Array.from(new Set(dupLocations)) !! ALTERNATIVA !!
  const locations = [...new Set(dupLocations)];
  return locations;
}

function retrieveFilteredAnimalsByLocation(location) {
  return animals.filter(animal => animal.location === location);
}

function retrieveAnimalsPerLocation(locations) {
  const animalPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location)
    .map(animal => animal.name);
    // -
    /* !! OUTRA ALTERNATIVA !!
    const filteredAnimals = animals
    .filter(animal => location.includes(animal.location))
    .map((animal) => animal.name);
    */
    // DIFERENTE DE --> animalPerLocation.location = filteredAnimals
    // (.location seria o nome pra todas as keys) !! adicionando ao obj com a key ${location} !!
    if (filteredAnimals.length !== 0) animalPerLocation[location] = filteredAnimals;
  });

  return animalPerLocation;
}

function retrieveAnimalsPerLocationWithName(locations, sorted, sex) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location).map((animal) => {
      const animalName = animal.name;
      const residents = animal.residents.filter((resident) => {
        // sex === 'male' ||  'female' !! alternativa !!
        // ${needFilterSex} GUARDA UMA BOOLEAN DA COMPARACAO FEITA EM sex !== false
        /* (se ${sex} for diferente de 'false',
        ira mandar pra ${needFilterSex} o resultado 'true')!! */
        const needFilterSex = sex !== false;
        // -
        // return needFilterSex ? resident.sex === sex : true; !! operador ternario !! alternativa
        // -
        if (needFilterSex) { // (se o resultado for true, ele ira entrar no 'if'!)
          return resident.sex === sex;
        }
        return true;
      }).map(resident => resident.name);
      // -
      if (sorted) residents.sort();

      return { [animalName]: residents };
    });
    if (filteredAnimals !== 0) animalsPerLocation[location] = filteredAnimals;
  });
  return animalsPerLocation;
}

function animalMap(options = {}) {
  const locations = retrieveAvailableLocations();
  // (se options vier UNDEFINED vai dar erro no destructing de options!)
  const { includeNames = false, sorted = false, sex = false } = options;
  // if (false === false) | if (!options === false) roda o codigo
  // if (!options) return retrieveAnimalsPerLocation(locations); nao é mais necessario...

  if (!includeNames) { // if (true === true) | if (options === true) roda o codigo
    return retrieveAnimalsPerLocation(locations);
  }
  return retrieveAnimalsPerLocationWithName(locations, sorted, sex);
}

function checkIfMonday(day, schedl) {
  if (day === 'Monday') {
    schedl[day] = 'CLOSED';
  }
  return schedl;
}
function scheduleAllDays(schedl) {
  const days = Object.keys(hours);
  days.forEach((day) => {
    schedl[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    checkIfMonday(day, schedl);
  });
  return schedl;
}
function scheduleDay(dayName, schedl) {
  schedl[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  checkIfMonday(dayName, schedl);
  return schedl;
}
function schedule(dayName = false) {
  const schedl = {};
  if (dayName) {
    scheduleDay(dayName, schedl);
    return schedl;
  }
  scheduleAllDays(schedl);
  return schedl;
}

function oldestFromFirstSpecies(id) {
  // (primeira especie do funcionario/a com o 'id' provido)
  const firstSpecieId = employees.find(employee => employee.id === id).responsibleFor[0];
  // !! em quanto q esse codigo faz o 'sort'(organiza),
  // colocando o mais velho na primeira posicao do array,
  const oldestAnimal = animals
  .find(animal => animal.id === firstSpecieId).residents
  .sort((animalA, animalB) => animalB.age - animalA.age);
  return Object.values(oldestAnimal[0]);
  /* esse codigo compara a posicao anterior e a posicao corrente do animal,
  retornando somente a idade maior !!
  const oldestAnimal = animals
  .find(animal => animal.id === firstSpecieId).residents
    .reduce((prevAnimal, currentAnimal) => {
    if (currentAnimal.age > prevAnimal.age){
      return currentAnimal
    }
    return prevAnimal
  });
  return Object.values(oldestAnimal);
  */
}

function increasePrices(percentage) {
  const ages = Object.keys(prices);
  ages.forEach((age) => {
    const sum = prices[age] * (percentage / 100);
    prices[age] = Math.round((prices[age] + sum) * 100) / 100;
  });
  return prices;
}

function getSpecies(employee) {
  const animalNames = employee.responsibleFor
  .map(animalId => animals.find(animal => animal.id === animalId).name);
  return animalNames
}
function allKeeperSpecies() {
  const keeperSpecies = {};
  employees.forEach((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    keeperSpecies[fullName] = getSpecies(employee);
  });
  return keeperSpecies;
}
function SpeciesResponsibleFor(employee, firstName, lastName) {
  const fullName = `${firstName} ${lastName}`;
  const keeperSpecies = {};
  keeperSpecies[fullName] = getSpecies(employee);
  return keeperSpecies;
}
function whichParameter(idOrName) {
  /* !! alternativa com switch !!
  employees.forEach((employee) => {
    switch(idOrName) {
      case employee.firstName:
        console.log(employee.firstName);
        break;
        case employee.lastName:
        console.log(employee.lastName);
        break;
        case employee.id:
        console.log(employee.id);
        break;
      default:
        //console.log('not this one');
    }
  });
  */
  let keeperSpecies;
  employees.forEach((employee) => {
    if (idOrName.includes(employee.firstName)) {
      keeperSpecies = SpeciesResponsibleFor(employee, employee.firstName, employee.lastName);
    } else if (idOrName.includes(employee.lastName)) {
      keeperSpecies = SpeciesResponsibleFor(employee, employee.firstName, employee.lastName);
    } else if (idOrName.includes(employee.id)) {
      keeperSpecies = SpeciesResponsibleFor(employee, employee.firstName, employee.lastName);
    }
  });
  return keeperSpecies;
}
function employeeCoverage(idOrName = false) {
  if (idOrName) {
    return whichParameter(idOrName);
  }
  return allKeeperSpecies();
}
console.log(employeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));
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
