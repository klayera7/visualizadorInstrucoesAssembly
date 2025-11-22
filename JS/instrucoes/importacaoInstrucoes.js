// lógica de cada instrucao
import { simularXCHG_Reg_Mem } from "./logicaXchg.js";
import { simularINC_Reg } from "./logicaInc.js";
import { simularDecReg } from "./logicaDecReg.js";
import { movRegMem } from "./logicaMovRegMem.js";
import { simularADD_Reg_Mem } from "./logicaAdd.js";
import { subFunction } from "./subInstruction.js";
import { executarNot } from "./logicaNot.js";
import { simularOR_Reg_Mem } from "./logicaOR.js";
import { mul } from "./logicaMul.js";
import { push_reg } from "./logicaPush.js";
import { jmpADDR } from "./logicaJMP.js";
import {jeADDR, jneADDR, jgADDR, jgeADDR, jlADDR, jleADDR} from "./logicaJcc.js";
import { simularCMP_Reg_Mem } from "./logicaCMP.js";
import { POP_Reg } from "./logicaPop.js";
import { divReg } from "./logicaDiv.js";
import { simularLoop } from "./logicaLoop.js";
import { simularIN_AX } from "./logicaIN.js";
import { simularOUT_AX } from "./logicaOUT.js";
import { simular_AND_Reg_Mem } from "./logicaAnd.js";
import { RET } from "./logicaRet.js";
import { CALL } from "./logicaCall.js";
import { IRET } from "./logicaIRET.js";
import { simularXOR_Reg_Mem } from "./logicaXOR.js";
import { simularNEG_Reg } from "./instrucaoNEG.js";
// Mapa que será usado pelo Simulador
export const MAPA_DE_INSTRUCOES = {
  xchg_reg_mem: simularXCHG_Reg_Mem,
  inc_reg: simularINC_Reg,
  dec_reg: simularDecReg,
  mov_reg_mem: movRegMem,
  add_reg_mem: simularADD_Reg_Mem,
  sub_reg_mem: subFunction,
  not_reg: executarNot,
  or_reg_mem: simularOR_Reg_Mem,
  not_reg: executarNot,
  mul_reg: mul,
  push_reg: push_reg,
  div_reg: divReg,
  loop: simularLoop,
  pop_reg: POP_Reg,
  jmp: jmpADDR,
  je: jeADDR,
  jne: jneADDR,
  jg: jgADDR,
  jge: jgeADDR,
  jl: jlADDR,
  jle: jleADDR,
  cmp_reg_mem: simularCMP_Reg_Mem,
  in_ax: simularIN_AX,
  out: simularOUT_AX,
  and_reg_mem: simular_AND_Reg_Mem,
  call: CALL,
  ret: RET,
  iret: IRET,
  xor_reg_mem: simularXOR_Reg_Mem,
  neg_reg: simularNEG_Reg
};
