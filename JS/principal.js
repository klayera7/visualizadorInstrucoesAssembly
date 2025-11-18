// Importa os "inicializadores" de cada módulo
import { inicializarLogicaSegmentos } from "./modules/logicaPopupSegmentos.js";
import { inicializarModalPrincipal } from "./modules/controleModal.js";
import { inicializarLogicaPopupInstrucao } from "./modules/logicaPopupInstrucao.js";

// Ouve o carregamento da página principal
document.addEventListener("DOMContentLoaded", () => {
  inicializarModalPrincipal();
  inicializarLogicaSegmentos();
  inicializarLogicaPopupInstrucao();
});

// Funcionalidade do botão reset
document.getElementById("btn_reset_program").addEventListener("click", () => {
  location.reload(true);
});