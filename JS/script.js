import { fecharModal } from "./modules/modalAnimado.js";
const iframeSegmentPopup = document.querySelector("#segment_popup");

const getSegmentValues = () => {
  const iframeWindow = iframeSegmentPopup.contentWindow;
  const confirmBtn = iframeWindow.document.querySelector("#confirm_btn");
  confirmBtn.addEventListener("click", () => {
    if (iframeWindow) {
      const dataSegment = iframeWindow.document.querySelector("#data_segment").value;
      const extraSegment = iframeWindow.document.querySelector("#extra_segment").value;
      const stackSegment = iframeWindow.document.querySelector("#stack_segment").value;
      const codeSegment = iframeWindow.document.querySelector("#code_segment").value;
      const cxCounter = iframeWindow.document.querySelector("#cx_counter").value;
      fecharModal()
      console.log({dataSegment, extraSegment, stackSegment, codeSegment, cxCounter});
    }
  });
};

if (iframeSegmentPopup) {
  iframeSegmentPopup.addEventListener("load", getSegmentValues);
}
