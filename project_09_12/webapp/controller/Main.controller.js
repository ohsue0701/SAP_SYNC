sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project0912.controller.Main", {
            onInit: function () {
                
                // 한 단계 위에 있는 컴포넌트(UIComponent)에 접근해서, 라우터를 가져온다
                // var로 하면 이 함수 내에서만 유효한데, 아래 다른 함수에서도 쓰고 싶으면 전역변수로 선언(var 대신 this. 붙이기. this 는 컨트롤러임. )
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteMain").attachPatternMatched(this._onPatternMatched, this);
                // 얘네 두줄을 주석처리하면 Employee 등의 다른 디테일뷰들로 안들어가짐. 이게 없으면 다른 페이지를 못가.
                // RouteMain 이라는 메인의 라우터객체를 가져와서, RouteMain의 pattern이 (뭐랑???) 매치될 "때마다" (뭐를???) 붙여라
                // 이 줄의 존재 이유는,,, 다른 페이지에서 보낸 argument가 이 페이지의 pattern 형식에 맞는지 확인하려고??? -> 그런 것도 있음

                // PatternMatched 이벤트 실행
                // => 해당 URL이 라우터의 Pattern과 일치할 때마다, 해당 이벤트 함수 _onPatternMatched를 실행한다.
                // => 여기서 이전화면으로부터 넘겨받은 Parameter의 값들을 얻을 수 있고, 얻은 값들을 가지고 추후 로직을 실행할 수 있음

            },
            _onPatternMatched: function (oEvent) { // argument를 받아오는 함수???
                var oArgu = oEvent.getParameter('arguments');
                // var oArgu = oEvent.getParameters.arguments; // 위와 동일
                console.log("Main : ", oArgu);
                console.log("Main : ", oArgu["?query"].test); // 메인뷰로 갈 때 10 출력
            },
            onGoDetail: function () {
                this.oRouter.navTo('RouteDetail', {
                    key1 : 'okok',
                    key2 : 123
                }, true);
                // .navTo('이동할 라우터객체이름', {파라미터정보}, 히스토리초기화할건지여부)
                // 이동할 라우터객체이름 : 메니페스트의 routes의 name 참고!
            },
            onGoEmployee: function () {
                this.oRouter.navTo('RouteEmployee', {
                    key1 : 'From_Main_1',
                    key2 : 'From_Main_2',
                    key3 : 'From_Main_3' // 옵션
                }, true);
            },


            onGoNotFound: function () {
                this.oRouter.getTargets().display("NotFound", {
                    fromTarget : 'TargetMain' // 메인뷰에대한 타겟정보는 TargetMain이니까.
                    // 낫파운드 페이지에서 뒤로가기 버튼 눌렀을때 돌아오기 위해 해놓는거???
                });

            }
        });
    });
