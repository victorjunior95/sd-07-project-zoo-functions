const {animals, age, species, entrants,} = require('./data');

function animalsByIds(ids) {
  const findMap = ids.map(id => animals.find(element => element.id === id));
  return findMap;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
}

function isManager(id) {
  return employees.some(element => element.managers.some(person => person === id));
}

function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    const allEmployees = {};
    employees.forEach((element) => {
      const animals = [];
      element.responsibleFor.forEach((el) => {
        animals.push(nameOfAnimalsById(el));
        const fullName = `${element.firstName} ${element.lastName}`;
        allEmployees[fullName] = animals;
      });
    });
    return allEmployees;
  }
  const employee = findEmployee(idOrName);
  const fullName = `${employee.firstName} ${employee.lastName}`;
  const animals = [];
  employee.responsibleFor.forEach((element) => {
    animals.push(nameOfAnimalsById(element));
  });
  const result = {};
  result[fullName] = animals;
  return result;
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
