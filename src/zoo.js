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

function namesBySpecieByLocation(speciesByLocation, sorted, sex) {
  const namesBySpecie = {}; // { NE: [ { lions: [Array] }, { giraffes: [Array] } ], NW: ...}
  Object.keys(speciesByLocation).forEach((item) => { // ['NE', 'NW' ...]
    const animalsByLocation = animals
      .filter(specie => specie.location === item); // [{lions}, {giraffes}]
    const arrayNamesBySpecie = animalsByLocation.map((specie) => {
      const nameOfSpecie = specie.name; // lions
      const residentsBySpecie = specie.residents // [{1o lion}, {2o lion} ...]
        // 'Com a opção `sex: female/male` especificada, retorna nomes de animais conforme o sexo'
        .filter((animal) => {
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
    namesBySpecie[item] = arrayNamesBySpecie;
  });
  return namesBySpecie;
}

function animalMap(options) {
  const speciesByLocation = {};
  animals.forEach(({ location }) => {
    speciesByLocation[location] = [];
    return speciesByLocation[location];
  });
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
    return namesBySpecieByLocation(speciesByLocation, sorted, sex);
  }
  // 'Só retorna informações ordenadas e com sexo se a opção `includeNames: true` for especificada'
  animals.forEach(({ name, location }) => speciesByLocation[location].push(name));

  return speciesByLocation;
}

function schedule(dayName) {
  // 'Sem parâmetros, retorna um cronograma legível para humanos'
  const scheduleReadable = {};

  if (!dayName) {
    Object.keys(hours).forEach((day) => { // ['Tuesday', 'Wednesday' ...]
      const { open, close } = hours[day]; // Tuesday.open & Tuesday.close
      if (open === 0) {
        scheduleReadable[day] = 'CLOSED';
      } else {
        const scheduleOfDay = `Open from ${open}am until ${close - 12}pm`;
        scheduleReadable[day] = scheduleOfDay;
      }
    });
    return scheduleReadable;
  }

  // 'Se um único dia for passado, retorna somente este dia em um formato legível para humanos'
  if (dayName === 'Monday') {
    scheduleReadable[dayName] = 'CLOSED';
    return scheduleReadable;
  }
  scheduleReadable[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  return scheduleReadable;
}

function oldestFromFirstSpecies(id) {
  let idSpecie;
  employees
    .filter(employee => employee.id === id)
    .forEach(({ responsibleFor }) => {
      idSpecie = `${responsibleFor[0]}`;
      return idSpecie;
    });

  const objectOfSpecie = animals.find(specie => specie.id === idSpecie);
  const arrayOfAnimals = objectOfSpecie.residents;
  let olderAnimal = [];
  arrayOfAnimals.forEach(animal => olderAnimal.push(animal.age));
  olderAnimal = olderAnimal.sort((a, b) => a - b);
  const any = olderAnimal[olderAnimal.length - 1];
  const anyTarget = arrayOfAnimals.find(animal => animal.age === any);

  // const olderAnimal =  arrayOfAnimals.reduce((result, animal) => {
  //   // (animal.age > result.age) ? animal : result;
  // })

  return [anyTarget.name, anyTarget.sex, anyTarget.age];
}

function increasePrices(percentage) {
  percentage /= 100;
  if (percentage) {
    Object.entries(prices).forEach(([age, price]) => {
      const valuePercents = price * percentage;
      let valueCalculed = Math.round((price + valuePercents) * 100);
      valueCalculed /= 100;
      prices[age] = valueCalculed;
    });
  }
  return prices;
}

// console.log(animals.map(specie => `${specie.name} ${specie.id}`))
function employeeCoverage(idOrName) {
  const speciesByEmployee = {};

  const speciesOfEmployee = (firstName, lastName, responsibleFor) => {
    const nameOfEmployee = `${firstName} ${lastName}`;
    const nameOfSpecieById = responsibleFor.map(id =>
      animals.find(specie => specie.id === id).name,
    );
    speciesByEmployee[nameOfEmployee] = nameOfSpecieById;
  };

  if (!idOrName) {
    // 'Sem parâmetros, retorna uma lista dos funcionários e os animais, pelo qual é responsável'
    employees.forEach(({ firstName, lastName, responsibleFor }) => {
      speciesOfEmployee(firstName, lastName, responsibleFor);
    });
  } else {
    // 'Com o id de um funcionário, retorna os animais pelos quais o funcionário é responsável'
    // 'Com o primeiro nome de um funcionário, retorna os animais por qual é responsável'
    // 'Com o último nome de um funcionário, retorna os animais por qual é responsável'
    const findEmployee = employees.find(employee => Object.values(employee).includes(idOrName));
    const { firstName, lastName, responsibleFor } = findEmployee;
    speciesOfEmployee(firstName, lastName, responsibleFor);
  }
  return speciesByEmployee;
}
console.log(employeeCoverage());

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
