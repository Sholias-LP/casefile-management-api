import { connect } from 'mongoose'

// connect db
export default connect(process.env.MONGODB_URI as string)
.then(()=> console.log('🚀  Connected to database... '))
.catch((err)=> console.log(err))
