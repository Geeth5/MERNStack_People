import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
    },
  );

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (enteredPassword == this.password){
    return true;
  }
  else
  {return false; }
};

const User = mongoose.model('User', userSchema);

export default User;