const generateStatusCode = () => {
  return Math.ceil(Math.random() * 4)
}
const generateAccount = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const index = Math.floor(Math.random() * 26)
  let account = ''
  for (let i = 0; i < 3; i++) {
    account += Math.floor(Math.random() * 10)
  }
  return letters[index]+ account 
}
module.exports = { generateStatusCode, generateAccount }
