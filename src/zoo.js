/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const data = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) return [];
  return data.animals.filter(animal => ids.some(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const animalSelected = data.animals.filter(
    species => species.name === animal,
  );
  return animalSelected.every(resident =>
    resident.residents.every(animalResident => animalResident.age >= age),
  );
}

function employeeByName(employeeName) {
  return data.employees.reduce((employeeRegistration, employee) => {
    if (
      employee.firstName === employeeName ||
      employee.lastName === employeeName
    ) {
      employeeRegistration = employee;
    }
    return employeeRegistration;
  }, {});
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(employee =>
    employee.managers.some(idManager => idManager === id),
  );
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    return data.animals.reduce((amountOfAnimals, animals) => {
      amountOfAnimals[animals.name] = animals.residents.length;
      return amountOfAnimals;
    }, {});
  }
  return data.animals.reduce((accumulator, animal) => {
    if (animal.name === species) {
      accumulator = animal.residents.length;
    }
    return accumulator;
  }, 0);
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.entries(entrants).length === 0) return 0;
  const arrayEntants = Object.entries(entrants);
  return arrayEntants.reduce((totalPayable, entrant) => {
    totalPayable += entrant[1] * data.prices[entrant[0]];
    return totalPayable;
  }, 0);
}

const animalFiltred = animal =>
      data.animals.filter(animalLocation => animal.location === animalLocation.location);

const animalsInRegion = animal => animalFiltred(animal)
  .map(objectAnimal => objectAnimal.name);

const animalsNameInRegion = (animal) => {
  const animalsNameIR = animalFiltred(animal).map(objectAnimal2 =>
    objectAnimal2.residents.reduce((acc, resident) => {
      acc[objectAnimal2.name] = objectAnimal2.residents.map(
        residentAnimal => residentAnimal.name,
      );
      return acc;
    }, {}),
  );
  return animalsNameIR;
};

const orderedAnimalsBySex = (animal, sex, sorted) => {
  const orderedAnimalsBS = animalFiltred(animal).map(objectAnimal2 =>
    objectAnimal2.residents.reduce((acc, resident4) => {
      if (sex && !sorted) {
        acc[objectAnimal2.name] = objectAnimal2.residents
        .filter(sexAnimal => sexAnimal.sex === sex).map(resident => resident.name);
        return acc;
      } else if (!sex && sorted) {
        acc[objectAnimal2.name] = objectAnimal2.residents.map(resident => resident.name).sort();
        return acc;
      }
      acc[objectAnimal2.name] = objectAnimal2.residents
        .filter(sexAnimal => sexAnimal.sex === sex).map(resident => resident.name).sort();
      return acc;
    }, {}),
  );
  return orderedAnimalsBS;
};

function animalMap(options = {}) {
  const { includeNames = false, sorted = false, sex } = options;
  const animalReportByRegion = data.animals.reduce((categorized, animal) => {
    if (!options || !includeNames) {
      categorized[animal.location] = animalsInRegion(animal);
    } else if (!sex && !sorted) {
      categorized[animal.location] = animalsNameInRegion(animal);
    } else {
      categorized[animal.location] = orderedAnimalsBySex(animal, sex, sorted);
    }
    return categorized;
  }, {});
  return animalReportByRegion;
}

function schedule(dayName) {
  const arrayHours = Object.entries(data.hours);
  return arrayHours.reduce((report, daysHour) => {
    const message = `Open from ${daysHour[1].open}am until ${
      daysHour[1].close - 12}pm`;
    if (daysHour[1].open === 0 && dayName === undefined) {
      report[daysHour[0]] = 'CLOSED';
    } else if (daysHour[1].open !== 0 && dayName === undefined) {
      report[daysHour[0]] = message;
    } else if (daysHour[1].open === 0 && daysHour[0] === dayName) {
      report[daysHour[0]] = 'CLOSED';
    } else if (daysHour[1].open !== 0 && daysHour[0] === dayName) {
      report[daysHour[0]] = message;
    }
    return report;
  }, {});
}

function oldestFromFirstSpecies(id) {
  const idFirstAnimal = data.employees.find(employee => employee.id === id)
    .responsibleFor[0];
  const firstSpecieResident = data.animals.find(
    animals => animals.id === idFirstAnimal).residents;
  let innitialAge = 0;
  return firstSpecieResident.reduce((olderAnimal, { name, sex, age }) => {
    if (age > innitialAge) {
      olderAnimal.splice(0, 3);
      olderAnimal.push(name, sex, age);
      innitialAge = age;
    }
    return olderAnimal;
  }, []);
}

function increasePrices(percentage) {
  const { Adult, Child, Senior } = data.prices;
  const roundPrices = (number) => {
    number = Math.round(number * 100) / 100;
    return number;
  };
  data.prices.Adult = roundPrices(Adult + (Adult * (percentage / 100)));
  data.prices.Child = roundPrices(Child + (Child * (percentage / 100)));
  data.prices.Senior = roundPrices(Senior + (Senior * (percentage / 100)));
}

function employeeCoverage(idOrName) {
  return data.employees.reduce(
    (report, { firstName, lastName, id, responsibleFor }) => {
      const arrayNameAnimals = [];
      responsibleFor.forEach((ids) => {
        const nameAnimal = data.animals.filter(animal => ids === animal.id);
        arrayNameAnimals.push(nameAnimal[0].name);
      });
      if (idOrName === undefined) {
        report[`${firstName} ${lastName}`] = arrayNameAnimals;
      } else if (idOrName === firstName) {
        report[`${firstName} ${lastName}`] = arrayNameAnimals;
      } else if (idOrName === lastName) {
        report[`${firstName} ${lastName}`] = arrayNameAnimals;
      } else if (idOrName === id) {
        report[`${firstName} ${lastName}`] = arrayNameAnimals;
      }
      return report;
    },
    {},
  );
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
