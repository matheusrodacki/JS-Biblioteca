import chalk from "chalk";
import fs from "fs";
import pegaArquivo from "./index.js";

const argumentos = process.argv;

function imprimeLista(resultado,arquivo = '') {
  console.log("Lista de links: ",
  chalk.black.bgGreen(arquivo),
  resultado);
}

async function processaTexto(argumentos) {
  try {
    const parametro = argumentos[2];
    if (fs.lstatSync(parametro).isFile()) {
      const resultado = await pegaArquivo(parametro);
      imprimeLista(resultado);
    } else if (fs.lstatSync(parametro).isDirectory) {
      const arquivos = await fs.promises.readdir(parametro);
      arquivos.forEach(async (nomeDosArquivos) => {
        const lista = await pegaArquivo(`${parametro}/${nomeDosArquivos}`);
        imprimeLista(lista, nomeDosArquivos);
      });
    }
  } catch(erro) {
    if(erro.code === 'ENOENT'){
        console.log(chalk.red(`Arquivo ou Diretório não existe! - Cód.: ${erro.code}`));
    }
  }
}

processaTexto(argumentos);
