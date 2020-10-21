function UserPolicy(type) {
  // Criamos uma constante que recebe um objeto, e cada uma das propriedades
  // será os valores correspondentes aos nossos types
  const Users = {
    admin: 'This User is Admin!',
    client: 'This User is Client!',
    salesman: 'This User is Salesman!',
    default: 'Ops, this guy doesn\'t have user profile'
  }


  return Users[type] || Users.default
}

const teste = UserPolicy() // "Ops, this guy doesn't have user profile"
console.log(teste);
UserPolicy('admin') // "This User is Admin!"
