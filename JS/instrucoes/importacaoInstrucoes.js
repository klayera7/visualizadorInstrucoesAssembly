// 1. Importa a lógica de cada arquivo
import { simularXCHG_Reg_Mem } from "./logicaXchg.js";
import { simularINC_Reg } from "./logicaInc.js";
import { simularDecReg } from "./logicaDecReg.js";
import { movRegMem } from "./logicaMovRegMem.js";
import { simularADD_Reg_Mem } from "./logicaAdd.js";
import {subFunction} from "./subInstruction.js";
import {executarNot} from "./logicaNot.js";
import { simularOR_Reg_Mem } from "./logicaOR.js";

// Mapa que será usado pelo Simulador
export const MAPA_DE_INSTRUCOES = {
  xchg_reg_mem: simularXCHG_Reg_Mem,
  inc_reg: simularINC_Reg,
  dec_reg: simularDecReg,
  mov_reg_mem: movRegMem,
  // 'mov_reg_val': simularMOV_Reg_Val,
  add_reg_mem: simularADD_Reg_Mem,
  sub_reg_mem: subFunction,
  // 'add_reg_val': simularADD_Reg_Val,
  not_reg: executarNot,
  or_reg_mem: simularOR_Reg_Mem,
  // 'jmp': simularJMP,
};
