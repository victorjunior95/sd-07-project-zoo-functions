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
const { prices } = data;
const { hours } = data;

function animalsByIds(...ids) {
  const localeByAnimalid = ids.map((idFind) => {
    const animalLocalized = animals.find(animal => animal.id === idFind);
    return animalLocalized;
  });
  return localeByAnimalid;
}

function animalsOlderThan(animal, age) {
  const verifyName = animals.find((animalNameCheck) => {
    const specie = animalNameCheck.name === animal;
    return specie;
  });
  let checkAge = verifyName.residents;
  checkAge = checkAge.every(animalAge => animalAge.age >= age);
  return checkAge;
}

function employeeByName(employeeName) {
  if (typeof (employeeName) === 'undefined') return {};
  const employeeLocalized = employees.find((employee) => {
    let returnEmployeeLocalized;
    if (employee.firstName === employeeName || employee.lastName === employeeName) {
      returnEmployeeLocalized = employee;
    }
    return returnEmployeeLocalized;
  });
  return employeeLocalized;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    ...personalInfo, ...associatedWith,
  };
  return newEmployee;
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployeer = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployeer);
  return data.employees;
}

function animalCount(species) {
  const allAnimals = {};
  if (typeof (species) === 'undefined') {
    animals.forEach(({ name, residents }) => {
      allAnimals[name] = residents.length;
    });
    return allAnimals;
  }
  const animalLocale = animals.find(({ name }) => name === species).residents.length;
  return animalLocale;
}

function entryCalculator(entrants) {
  if (typeof (entrants) === 'undefined' || Object.keys(entrants).length === 0) return 0;
  const valueAllEntrants = Object.entries(entrants)
  .reduce((accumulator, valueActual) => accumulator + (prices[valueActual[0]] * valueActual[1]), 0);
  return valueAllEntrants;
}

function forEachAnimals() {
  const mapKeysLocation = {};
  animals.forEach((animal) => {
    mapKeysLocation[animal.location] = [];
  });
  return mapKeysLocation;
}

function categorizeAnimalsByLocation() {
  const mapKeysLocation = forEachAnimals();
  return animals.reduce((acc, specie) => {
    const localeAnimalWitchName = {
      ...acc,
      [specie.location]: [
        ...acc[specie.location],
        specie.name,
      ],
    };
    return localeAnimalWitchName;
  }, {
    ...mapKeysLocation,
  });
}

function analizeAnimalsByLocation(rec) {
  const animalsCategorized = forEachAnimals();
  if (rec.includeNames) {
    const objectForReturn = animals.reduce((acc, specie) => {
      const arrayFilter = specie.residents.filter(resident => resident.sex === rec.sex || !rec.sex);
      const residentsNames = arrayFilter.map(resident => resident.name);
      if (rec.sorted) {
        residentsNames.sort();
      }
      return {
        ...acc,
        [specie.location]: [
          ...acc[specie.location],
          {
            [specie.name]: residentsNames,
          },
        ],
      };
    }, animalsCategorized);
    return objectForReturn;
  }
  return categorizeAnimalsByLocation();
}

function animalMap(options) {
  // Exercício guiado Isaac
  if (!options) {
    return categorizeAnimalsByLocation();
  }
  return analizeAnimalsByLocation(options);
}

function schedule(dayName) {
  let scheduleForHuman = {
    Tuesday: `Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${hours.Thursday.open}am until ${hours.Thursday.close - 12}pm`,
    Friday: `Open from ${hours.Friday.open}am until ${hours.Friday.close - 12}pm`,
    Saturday: `Open from ${hours.Saturday.open}am until ${hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${hours.Sunday.open}am until ${hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  const day = Object.entries(hours);
  const localeDay = day.find(dayActual => dayActual[0] === dayName);
  if (typeof (dayName) === 'undefined') {
    return scheduleForHuman;
  } else if (dayName === 'Monday') {
    scheduleForHuman = {};
    scheduleForHuman[dayName] = 'CLOSED';
  } else {
    scheduleForHuman = {};
    scheduleForHuman[localeDay[0]] = `Open from ${localeDay[1].open}am until ${(localeDay[1].close) - 12}pm`;
  }
  return scheduleForHuman;
}

function oldestFromFirstSpecies(id) {
  let responsibleAninal = employees.find(employee => employee.id === id);
  responsibleAninal = responsibleAninal.responsibleFor[0];
  const animalList = animals;
  const animalLocale = animalList.find(animal => animal.id === responsibleAninal);
  const findAgeId = animalLocale.residents;
  let ageAnimalsId = [];
  findAgeId.forEach(animalAge => ageAnimalsId.push(animalAge.age));
  ageAnimalsId = ageAnimalsId.sort((a, b) => a - b);
  const localeReturnAge = ageAnimalsId[ageAnimalsId.length - 1];
  const targetResident = findAgeId.find(animalTarget => animalTarget.age === localeReturnAge);
  const returnAnimal = [
    targetResident.name,
    targetResident.sex,
    targetResident.age,
  ];
  return returnAnimal;
}

function increasePrices(percentage) {
  const { Child, Senior, Adult } = prices;
  // factor multiplication in const valuePercentage.
  const valuePercentage = (percentage / 100) + 1;
  const increase = (value, percent) => parseFloat(Math.round(value * percent * 100) / 100);
  prices.Child = increase(Child, valuePercentage);
  prices.Senior = increase(Senior, valuePercentage);
  prices.Adult = increase(Adult, valuePercentage);
}

function employeeCoverage(idOrName) {
  const employeesFirstNameAndAnimals = {};
  const nameAndIdsAnimals = [];
  animals.forEach((animal) => {
    nameAndIdsAnimals[animal.id] = animal.name;
  });
  const employeeFilterId = employees.filter(
    employeeItem => employeeItem.id === idOrName
    || employeeItem.firstName === idOrName
    || employeeItem.lastName === idOrName
    || !idOrName,
  );
  employeeFilterId.forEach((employee) => {
    employeesFirstNameAndAnimals[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor.map(target => nameAndIdsAnimals[target]);
  });
  return employeesFirstNameAndAnimals;
}
// console.log(employeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

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
