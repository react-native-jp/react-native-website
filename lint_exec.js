const { execSync, spawn,  } = require("child_process");


const list = execSync('git diff --name-only') + execSync('git diff --name-only --cached')
const lintList = list.toString().split('\n').filter(fileName => /\.md$/.test(fileName))


spawn('npm', ['run', '_text_lint', lintList.join(' ')], {stdio: "inherit", shell: true })
