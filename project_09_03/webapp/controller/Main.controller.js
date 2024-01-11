sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/m/Button"
    // define 함수의 첫번째 매개변수에서는 sap에서 가져온 라이브러리 저장. 이따가 funtion에 파라미터로 넣기 가능. 
    // 아래 파라미터에 넣을 때 순서를 잘 지정하여야 함! ***
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Button) { // 위에 넣은 순서대로 순서를 잘 지정하여야 함!
        "use strict";

        return Controller.extend("project0903.controller.Main", {
            onInit: function () {
                
            },

            onBeforeRendering : function () {/*메인 뷰가 그려지기 전 실행*/},
            onAfterRendering: function () {/*메인 뷰가 그려진 후 실행*/},
            onExit: function () {/*화면 종료되면 실행. 가비지 컬렉터 역할 구현 가능*/},

            // 입력한 내용을 텍스트로 반영하는 프로그램
            onClick_inputDone: function () { // 작성완료 버튼의 기능을 설정하는 함수
                // var oInput = this.getView().byId("idInput"); // Main.view을 가져와서 해당 id의 Input 객체를 저장하는 변수
                // var sValue = oInput.getValue(); // oInput에 입력된 값을 받아서 저장하는 변수
                // var oText = this.getView().byId("idText"); // Main.view을 가져와서 해당 id의 Text 객체를 저장하는 변수
                // oText.setText(sValue); // 함수 잘 알아보기! oText 객체의 텍스트를 다시 설정하는 명령어 setText

                // var oText = new sap.m.Text({
                //     text: sValue // text 속성에 sValue 값을 설정
                // });
                // var oPage = this.getView().byId("page");
                // oPage.addContent(oText);

                // 변수들 합쳐도 됨.
                // var sValue = this.getView().byId("idInput").getValue();
                // this.getView().byId("idText").setText(sValue);

                // geyView 생략해도 됨.
                var sValue = this.byId("idInput").getValue();
                this.byId("idText").setText(sValue);
            },

            onClick_init: function () { // 초기화 버튼의 기능을 설정하는 함수
                // var oInput = this.getView().byId("idInput"); // Main.view을 가져와서 해당 id의 Input 객체를 저장하는 변수
                // var oText = this.getView().byId("idText"); // Main.view을 가져와서 해당 id의 Text 객체를 저장하는 변수
                // oInput.setValue(""); // oInput에 입력된 값을 빈 값으로 재설정
                // oText.setText("");  // oText에 설정된 텍스트를 빈 텍스트로 재설정

                // 간단 버전
                this.byId("idInput").setValue("");
                this.byId("idText").setText("");
            }
        });
    });
