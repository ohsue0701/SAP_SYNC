sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project0912.controller.NotFound", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter(); // 상위에 있는 애의 라우터 불러오기
                var oTarget = this.oRouter.getTarget('NotFound');
                oTarget.attachDisplay(this._onAttachDisplay, this)
            },
            _onAttachDisplay: function (oEvent) {
                // 해당 타겟으로 넘겨질 때 받았던 파라미터값이 "data???"에 들어있음 (메인컨에서 파라미터값을 넘겨주지 않지 않았나,,)
                // "data"에 들어있는 값을 Controller 내부에서 사용할 수 있도록 this.oData에다 담아놓는다
                this._oData = oEvent.getParameter("data");
            },
            onNavBack: function () {
                // 넘겨받은 데이터가 있으면 다시 전페이지로 돌아갈거고, 그게 아니면 윈도우의 히스토리 보고 돌아감
                if (this._oData && this._oData.fromTarget) { // fromTarget:넘겨준 데이터???
                    this.oRouter.getTargets().display(this._oData.fromTarget); // 다시 전화면 보여주기
                    delete this._oData.fromTarget; // 들어있던애를 삭제하겠다
                    return; // 함수 아예 빠져나가기
                }
                window.history.go(-1); // 브라우저에 쌓인 히스토리에서, 한 번 뒤로 나가기 (-1)
                
                // 브라우저에 쌓인거랑 라우터에 쌓인 건 달라.
            }
        });
    });
