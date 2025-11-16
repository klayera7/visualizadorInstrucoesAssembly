// 1. Importa a lógica de cada arquivo
import { simularXCHG_Reg_Mem } from "./logicaXchg.js";
import { simularINC_Reg } from "./logicaInc.js"; 
// import { simularMOV_Reg_Mem, simularMOV_Reg_Val } from "./logicaMov.js"; 
// import { simularADD_Reg_Mem, simularADD_Reg_Val } from "./logicaAdd.js"; 
// import { simularNOT_Reg } from "./logicaNot.js"; 
// import { simularJMP } from "./logicaJmp.js"; 


// Mapa que será usado pelo Simulador
export const MAPA_DE_INSTRUCOES = {
  'xchg_reg_mem': simularXCHG_Reg_Mem,
  'inc_reg': simularINC_Reg,
  // 'mov_reg_mem': simularMOV_Reg_Mem,
  // 'mov_reg_val': simularMOV_Reg_Val,
  // 'add_reg_mem': simularADD_Reg_Mem,
  // 'add_reg_val': simularADD_Reg_Val,
  // 'not_reg': simularNOT_Reg,
  // 'jmp': simularJMP,
};