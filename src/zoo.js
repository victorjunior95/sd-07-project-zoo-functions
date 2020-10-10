const { employees } = require('./data');
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
  const allByIds = data.animals.filter(({ id: animalId }) => ids.find(id => id === animalId));

  return ids ? allByIds : [];
}

function animalsOlderThan(animal, age) {
  const animalThan = data.animals.find(({ name }) => animal === name);

  const olderNotThan = animalThan.residents.some(resident => resident.age < age);

  return !olderNotThan;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  const employeed = employees.find(({ firstName, lastName }) => {
    const verified = employeeName === firstName || employeeName === lastName;

    return verified;
  });

  return employeed;
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
  const manager = employees.some(({ managers }) => {
    const existId = managers.some(idManager => idManager === id);

    return existId;
  });

  return manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  employees.push(newEmployee);
}

function animalCount(species) {
  let animalCurrent = {};

  data.animals.forEach(({ name, residents }) => {
    if (!species) animalCurrent[name] = residents.length;

    if (species === name) animalCurrent = residents.length;
  });

  return animalCurrent;
}

function entryCalculator(entrants) {
  let priceTotal = 0;

  if (entrants && entrants !== {}) {
    const entrantsKey = Object.keys(entrants);
    const entrantsValue = Object.values(entrants);

    entrantsKey.forEach((key, index) => {
      Object.entries(data.prices).forEach(([description, price]) => {
        if (description === key) priceTotal += entrantsValue[index] * price;
      });
    });
  }

  return priceTotal;
}

function animalMap(options) {
  const maped = {};

  const residentsNames = {};

  data.animals.forEach(({ name, location, residents }) => {
    if (!maped[location]) maped[location] = [name];
    else maped[location].push(name);

    if (options) {
      if (options.includeNames) {
        residents.filter((resident) => {
          if (options.sex) return options.sex === resident.sex;
          return true;
        }).forEach((resident) => {
          if (!residentsNames[name]) residentsNames[name] = [resident.name];
          else residentsNames[name].push(resident.name);
        });

        maped[location] = maped[location].map((animal) => {
          const novo = {};

          if (animal === name) {
            novo[name] = residentsNames[name];
            if (novo[name] === undefined) novo[name] = [];
            if (options.sorted) novo[name] = novo[name].sort();
            return novo;
          }

          return animal;
        });
      }
    }
  });

  return maped;
}

function schedule(dayName) {
  let scheduled = {};

  Object.entries(data.hours).forEach((day) => {
    scheduled[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
    if (day[1].open === 0 && day[1].close === 0) scheduled[day[0]] = 'CLOSED';
  });

  if (dayName) {
    scheduled = {};
    scheduled[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
    if (data.hours[dayName].open === 0) scheduled[dayName] = 'CLOSED';
  }

  return scheduled;
}

function oldestFromFirstSpecies(id) {
  const employeed = employees.find(employee => id === employee.id);

  const firstAnimal = data.animals.find(animal => employeed.responsibleFor[0] === animal.id);

  const animalOlder = firstAnimal.residents.sort((first, second) => second.age - first.age)[0];

  return [animalOlder.name, animalOlder.sex, animalOlder.age];
}

function increasePrices(percentage) {
  const calc = percentage / 100;

  Object.keys(data.prices).forEach((price) => {
    const current = data.prices[price];

    data.prices[price] = Math.round(
      parseFloat((current + (current * calc)) * 100).toPrecision(4),
    ) / 100;
  });

  return data.prices;
}

function employeeCoverage(idOrName) {
  const employeeCoveraged = {};

  let employeesUsed = data.employees;

  if (idOrName) {
    employeesUsed = employeesUsed.filter(({ id, firstName, lastName }) => {
      const isId = id === idOrName;
      const isFirstName = firstName === idOrName;
      const isLastName = lastName === idOrName;

      return isId || isFirstName || isLastName;
    });
  }

  employeesUsed.forEach(({ firstName, lastName, responsibleFor }) => {
    const name = `${firstName} ${lastName}`;

    const animalsName = [];

    const animalsResponsiblesFor = responsibleFor.map(id => id);

    animalsResponsiblesFor.forEach((identify) => {
      data.animals.forEach(({ id, name: named }) => {
        if (id === identify) animalsName.push(named);
      });
    });

    employeeCoveraged[name] = animalsName;
  });

  return employeeCoveraged;
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
