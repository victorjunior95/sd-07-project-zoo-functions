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
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const findAnimal = data.animals.find(element => element.name === `${animal}`);
  return findAnimal.residents.every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(employee => employee.firstName === employeeName
    || employee.lastName === employeeName);
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
  return data.employees.some(employee => employee.managers.includes(`${id}`));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    const animalsAmount = {};
    data.animals.forEach(animal => (animalsAmount[animal.name] = animal.residents.length));
    return animalsAmount;
  }
  return data.animals.filter(animal => animal.name === species)
    .map(animal => animal.residents.length)[0];
}

function entryCalculator(entrants) {
  if ((entrants === undefined) || (entrants === {})) {
    return 0;
  }
  const keys = Object.keys(entrants);
  return keys.reduce((acc, curr) => (acc += (entrants[curr] * data.prices[curr])), 0);
}

// animalMap - Seguindo a resolução do plantão de resolução guiada do Isaac
const inicialObject = { NE: [], NW: [], SE: [], SW: [] };

function categorizeAnimalsByLocation() {
  return data.animals.reduce((acc, specie) => (
    {
      ...acc,
      [specie.location]: [
        ...acc[specie.location],
        specie.name,
      ],
    }), inicialObject);
}

function animalNames(sortOption) {
  if (!sortOption) {
    return data.animals.reduce((acc, specie) => (
      {
        ...acc,
        [specie.location]: [
          ...acc[specie.location],
          {
            [specie.name]: specie.residents
              .map(resident => resident.name),
          },
        ],
      }), inicialObject);
  };
  return data.animals.reduce((acc, specie) => (
    {
      ...acc,
      [specie.location]: [
        ...acc[specie.location],
        {
          [specie.name]: specie.residents
            .map(resident => resident.name).sort(),
        },
      ],
    }), inicialObject);
}

function animalF(sortOption) {
  if (!sortOption) {
    return data.animals.reduce((acc, specie) => (
      {
        ...acc,
        [specie.location]: [
          ...acc[specie.location],
          {
            [specie.name]: specie.residents
              .filter(resident => resident.sex === 'female')
              .map(resident => resident.name),
          },
        ],
      }), inicialObject);
  };
  return data.animals.reduce((acc, specie) => (
    {
      ...acc,
      [specie.location]: [
        ...acc[specie.location],
        {
          [specie.name]: specie.residents
            .filter(resident => resident.sex === 'female')
            .map(resident => resident.name).sort(),
        },
      ],
    }), inicialObject);
}

function animalM(sortOption) {
  if (!sortOption) {
    return data.animals.reduce((acc, specie) => (
      {
        ...acc,
        [specie.location]: [
          ...acc[specie.location],
          {
            [specie.name]: specie.residents
              .filter(resident => resident.sex === 'male')
              .map(resident => resident.name),
          },
        ],
      }), inicialObject);
  }
  return data.animals.reduce((acc, specie) => (
    {
      ...acc,
      [specie.location]: [
        ...acc[specie.location],
        {
          [specie.name]: specie.residents
            .filter(resident => resident.sex === 'male')
            .map(resident => resident.name).sort(),
        },
      ],
    }), inicialObject);
}

function animalMap(options) {
  if (!options || !options.includeNames) {
    return categorizeAnimalsByLocation();
  } else if (options.includeNames && !options.sex) {
    return !options.sorted ? animalNames(false) : animalNames(true);
  } else if (options.includeNames && !options.sorted) {
    return options.sex === 'female' ? animalF(false) : animalM(false);
  }
  return options.sex === 'female' ? animalF(true) : animalM(true);
}

function schedule(dayName) {
  if (dayName === undefined) {
    Object.keys(data.hours).forEach((day) => {
      data.hours[day] =
      `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;
    });
    data.hours.Monday = 'CLOSED';
    return data.hours;
  }
  return { [dayName]: data.hours[dayName] };
}

function oldestFromFirstSpecies(id) {
  const animalId = data.employees.filter(employee => employee.id === `${id}`)
    .map(employee => employee.responsibleFor[0]);
  const residents = data.animals.filter(animal => animal.id === animalId[0])
    .map(animal => animal.residents);
  const residentsAge = residents[0].map(resident => resident.age)
    .sort(function (a, b) { return b - a; });
  const older = residents[0].find(resident => resident.age === residentsAge[0]);
  return Object.values(older);
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = data.prices;
  data.prices.Adult = Math.round((1 + (percentage / 100)) * Adult * 100) / 100;
  data.prices.Senior = Math.round((1 + (percentage / 100)) * Senior * 100) / 100;
  data.prices.Child = Math.round((1 + (percentage / 100)) * Child * 100) / 100;
  return data.prices;
}

function employeeCoverage(idOrName) {
  const employeesAnimalsObject = {};
  data.employees.forEach((employee) => {
    const animalsByEmployee = [];
    employee.responsibleFor.forEach(idResp => data.animals.forEach((animal) => {
      if (animal.id === idResp) {
        animalsByEmployee.push(animal.name);
        employeesAnimalsObject[`${employee.firstName} ${employee.lastName}`] = animalsByEmployee;
      }
    }));
  });
  if (idOrName === undefined) {
    return employeesAnimalsObject;
  }
  const employeeFullName = data.employees.filter(employee =>
    employee.id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName)
    .map(employee => `${employee.firstName} ${employee.lastName}`);
  const employeeAnimal = {};
  employeeAnimal[employeeFullName[0]] = employeesAnimalsObject[employeeFullName];
  return employeeAnimal;
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
