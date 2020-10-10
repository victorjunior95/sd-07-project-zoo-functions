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

const { employees, prices, animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return ids.reduce((acc, id) => acc.concat(animals.find(animal => animal.id === id)), []);
}

function animalsOlderThan(animal, age) {
  const findAnimal = animals.find(creature => creature.name === animal);
  return findAnimal.residents.every(isOlder => isOlder.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((employee) => {
    const { firstName, lastName } = employee;
    return firstName === employeeName || lastName === employeeName;
  });
}

function createEmployee(personalInfo, associatedWith) {
  const { firstName, id, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { firstName, id, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some(employee => employee.id === id && employee.responsibleFor.length >= 4);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    return Object.fromEntries(animals.map(animal => [animal.name, animal.residents.length]));
  }
  const specieData = animals.find(animal => animal.name === species);
  return specieData.residents.length;
}

function entryCalculator(entrants = 0) {
  let finalValue = 0;
  if (entrants.Adult) finalValue += prices.Adult * entrants.Adult;
  if (entrants.Senior) finalValue += prices.Senior * entrants.Senior;
  if (entrants.Child) finalValue += prices.Child * entrants.Child;
  return finalValue;
}

function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];
  const genres = ['male', 'female'];

  if (!options || !options.includeNames) {
    const finalLocations = locations.map((location) => {
      const animalsLocation = animals.filter(animal => animal.location === location);
      const animalsInfo = animalsLocation.map(animal => animal.name);
      return [location, animalsInfo];
    });

    return Object.fromEntries(finalLocations);
  }

  const finalLocations = locations.map((location) => {
    const animalsLocation = animals.filter(animal => animal.location === location);

    const formatedAnimals = animalsLocation.map((animalsInfo) => {
      const { name: specie, residents: infos } = animalsInfo;
      let names = infos.map(animalInfo => animalInfo.name);

      genres.forEach((sex) => {
        const filteredSex = infos.filter(animal => animal.sex === sex);
        if (options.sex === sex) names = filteredSex.map(animalInfo => animalInfo.name);
      });

      if (options.sorted === true) names.sort();
      return { [specie]: names };
    });

    return [location, formatedAnimals];
  });

  return Object.fromEntries(finalLocations);
}

function timeConverter() {
  const hours = Object.values(data.hours);
  return hours.map((hour) => {
    const { open, close } = hour;
    return { open: `${open}am`, close: `${close - 12}pm` };
  });
}

function schedule(dayName) {
  const days = Object.keys(data.hours);
  const hours = timeConverter();

  const daysInfo = days.map((day, index) => {
    const { open, close } = hours[index];

    if (open !== '0am') return [day, `Open from ${open} until ${close}`];
    return [day, 'CLOSED'];
  });

  const zoo = Object.fromEntries(daysInfo);

  if (!dayName) return zoo;
  return { [dayName]: zoo[dayName] };
}

function oldestFromFirstSpecies(id) {
  const filteredId = employees.filter(employee => employee.id === id);
  const filteredIdAnimal = filteredId.map(animalInfo => animalInfo.responsibleFor).pop()[0];
  const filteredAnimals = animals.find(animal => animal.id === filteredIdAnimal).residents;
  const oldest = filteredAnimals.reduce((previousAnimal, currentAnimal) => {
    const { age: ageP } = previousAnimal;
    const { age: ageC } = currentAnimal;

    if (ageP > ageC) return previousAnimal;
    return currentAnimal;
  });
  const { name, age, sex } = oldest;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const persons = Object.keys(prices);
  const values = Object.values(prices);
  const increased = values.map((value) => {
    const calculating = value + (value * (percentage / 100));
    return Math.ceil(calculating * 100) / 100;
  });

  persons.forEach((person, index) => {
    prices[person] = increased[index];
  });
}

function employeeCoverage(idOrName) {
  const employeesInCharge = employees.map((employee) => {
    const { firstName, lastName, responsibleFor: animalId } = employee;
    const animalsName = animalId.map(id => animals.find(animal => animal.id === id).name);
    return [`${firstName} ${lastName}`, animalsName];
  });

  if (!idOrName) return Object.fromEntries(employeesInCharge);
  if (idOrName.length < 15) {
    const byName = employeesInCharge.find(name => name[0].startsWith(idOrName) || name[0].endsWith(idOrName));

    return Object.fromEntries([byName]);
  }
  const employeeInfo = employees.find(employee => employee.id === idOrName);
  const { firstName, lastName, responsibleFor: animalId } = employeeInfo;
  const animalsName = animalId.map(id => animals.find(animal => animal.id === id).name);
  return { [`${firstName} ${lastName}`]: animalsName };
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
