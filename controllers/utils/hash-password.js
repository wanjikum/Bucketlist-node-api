import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
  const SALTROUNDS = 12;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, SALTROUNDS, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
};

export default hashPassword;
