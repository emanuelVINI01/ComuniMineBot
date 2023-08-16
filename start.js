import { fork } from 'child_process'
console.log("Iniciando o bot...")

fork("./compiled/index.js")