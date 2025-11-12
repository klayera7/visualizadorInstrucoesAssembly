import { fecharModal } from "./modules/modalAnimado.js";
const iframeSegmentPopup = document.querySelector("#segment_popup");

const segmentValues = {}

const getSegmentValues = () => {
  const iframeWindow = iframeSegmentPopup.contentWindow;
  const confirmBtn = iframeWindow.document.querySelector("#confirm_btn");
  confirmBtn.addEventListener("click", () => {
    if (iframeWindow) {
      segmentValues.dataSegment = iframeWindow.document.querySelector("#data_segment").value;
      segmentValues.extraSegment = iframeWindow.document.querySelector("#extra_segment").value;
      segmentValues.stackSegment = iframeWindow.document.querySelector("#stack_segment").value;
      segmentValues.codeSegment = iframeWindow.document.querySelector("#code_segment").value;
      segmentValues.cxCounter = iframeWindow.document.querySelector("#cx_counter").value;
      fecharModal()
      
      console.log(segmentValues);
    }
  });
};

if (iframeSegmentPopup) {
  iframeSegmentPopup.addEventListener("load", getSegmentValues);
}
