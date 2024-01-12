sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project0912.controller.Detail", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);
            },

            // 위 아래 함수 각각의 차이 이해! 위는 컨이 로드되면 한번만 실행됨
            // 초기화 함수 onInit은 해당 Controller가 로드될 때 한번만 실행
            // PatternMatched 이벤트는 URL이 일치 ""할때마다"" 실행됨

            _onPatternMatched: function (oEvent) { // 이벤트객체 받기
                // RouteDetail 라우트 객체의 Pattern 이 일치할 때마다 해당 이벤트가 실행됨
                var oArgu = oEvent.getParameters().arguments; // 메인컨에서 보낸 애(argument)를 받아오기
                console.log("Detail : ", oArgu); // 메인컨에서 보낸 애를 잘 받아오는지!
            },
            onNavBack: function () {
                // URL parameter로 넘기는 데이터가 많으면 JSON Model과 같은 모델을 사용하는 게 좋음. 
                // URL에 길이 제한이 있기 때문에. 많은 데이터 넣으면 잘림.
                this.oRouter.navTo('RouteMain', {
                    "query" : {
                        tab : 'okok',
                        test : 10
                    }// 값 두개이상이면 tab=okok&test=10 이런식으로 뜸
                });
            }
        });
    });
