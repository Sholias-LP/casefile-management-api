import { Model, Optional } from 'sequelize'


/* ---------------------------- */
/*            User              */
/* ---------------------------- */

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


/* -------------------------------- */
/*            Casefile              */
/* -------------------------------- */

type CasefileAttributes = {
  id: number
  caseID: string
  caseType: string
  client: string
  gender: string
  occupation: string
  brief: string
  letter_of_engagement:string
}

type CasefileCreationAttributes = Optional<CasefileAttributes, 'id'>
class Casefile extends Model<CasefileAttributes, CasefileCreationAttributes> {
  declare id: number
  declare caseID: string
  declare caseType: string
  declare client: string
  declare gender: string
  declare occupation: string
  declare brief: string
  declare letter_of_engagement:string
}