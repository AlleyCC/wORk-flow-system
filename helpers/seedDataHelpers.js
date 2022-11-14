// status code
const generateStatusCode = () => {
  return Math.ceil(Math.random() * 4)
}
// user account
const generateAccount = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const index = Math.floor(Math.random() * 26)
  let account = ''
  for (let i = 0; i < 3; i++) {
    account += Math.floor(Math.random() * 10)
  }
  return letters[index] + account
}
// patient numbers: 8 numbers in random
const generatePatientNums = (n) => {
  let nums = ''
  Array.from({ length: n }, (_, i) => {
    nums += Math.floor(Math.random() * 10)
  })
  return nums
}
// ward
const generateWard = () => {
  const bed = 'ABCD'
  const bedIndex = Math.floor(Math.random() * 4)
  return (20 + Math.floor(Math.random() * 20)).toString() + 'W' + Math.floor(Math.random() * 20).toString() + bed[bedIndex]
}

module.exports = {
  generateStatusCode, generateAccount, generatePatientNums, generateWard
}
