/**
 * This script is run to update the project with the timestamp of the
 * most recent commit to master.
 */
const childProcess = require('child_process')
const fs = require('fs')

const getTimestamp = () => {
  let timestamp = childProcess
    .execSync('git --no-pager log -1 --format="%ai"')
    .toString()
    .trim()
  return timestamp
}

fs.writeFileSync('src/most-recent-commit.js', `const timestamp = "${getTimestamp()}"
export default timestamp`)
console.log('Timestamp updated')
