import { Model, Optional } from 'sequelize'

type UserAttributes = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  hash: string
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type UserCreationAttributes = Optional<UserAttributes, 'id'>

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number
  declare firstName: string
  declare lastName: string
  declare email: string
  declare role: string
  declare hash: string
}