sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project0908.controller.Main", {
            onInit: function () {
                var oData = {
                    list : [] //  빈것만 만들어놓고, 뷰에서 사용자가 적으면 적용되게끔.
                };
                var oModel = new sap.ui.model.json.JSONModel(oData); // 위 라이브러리 추가 없이 이렇게 사용 가능
                
                this.getView().setModel(oModel); // 뷰에 모델 세팅. 이름은 별도로 설정하지 않음
            },

            onAdd: function () {
                var oModel = this.getView().getModel(); // 뷰에 세팅된 모델 가져오기
                var aList = oModel.getProperty("/list"); // 현재는 빈 배열 가져옴 []
                aList.push({
                    // name : "default",
                    // age : 0
                }); // 기본값 객체 하나 추가. 주석처리해서 빈 객체로 세팅할수도.
                oModel.setProperty("/list", aList) // 모델에 값 세팅

                // 행 추가 가능해짐
            },

            onRowDelete: function (oEvent) { // rowActionEvent 관련 item 클릭 시 이벤트 발생
                var index = oEvent.getParameters().row.getIndex();
                var aList = this.getView().getModel().getProperty("/list");
                aList.splice(index, 1) // splice 함수 : index에 해당하는 값으로부터 1개 지우겠다

                this.getView().getModel().setProperty("/list", aList);

                
            },

            onDelete: function () {
                var oModel = this.getView().getModel(); // 뷰에 세팅된 모델 가져오기. 모델이름 잇으면 모델이름도 써줘야!
                var aList = oModel.getProperty("/list"); // 모델의 list 가져오기
                //var aList = this.getView().getModel().getProperty('/list');
                var oTable = this.byId("calTable"); // 뷰의 테이블을 id로 가져오기

                var selectedArr = oTable.getSelectedIndices(); // getSelectedIndices() : 현재 선택된 row의 인덱스 전부를 배열 형태로 받을 수 있다. 
                
                var len = selectedArr.length - 1; // 복잡하니까 밖으로 빼기
                for (var i = len; i >= 0; i--) {
                    aList.splice(selectedArr[i], 1);
                }

                this.getView().getModel().setProperty("/list", aList); // 업데이트된 aList를 반드시 뷰의 모델에 다시 세팅해주기!

            }

            
        });
    });
