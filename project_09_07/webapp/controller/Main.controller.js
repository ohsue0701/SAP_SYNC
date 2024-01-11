sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("project0907.controller.Main", {
            onInit: function () {
                // 1. 데이터를 onInit에서 변수로 만들어서 바로 쓰는 방법 -----------
                var oData = { name : 'Hong Gill Dong',
                              age : 20,
                              title : 'GilDong`s Page'
                            }; // JSON 데이터 객체 oData 만들기
                var oModel = new JSONModel(oData); // oData를 넣어서 JSON 모델 oModel 만들기 
                // --------------------------------------------------------------
                
                // 2. 데이터를 별도의 json 파일에 따로 보관하는 방법 ---------------
                var oModel = new JSONModel(); // 아무 것도 안 넣은 JSON 모델 oModel 만들기
                oModel.loadData("../model/data.json", {}, false); // 경로 설정해서 oModel에 미리 만들어둔 데이터 로드해주기 
                // --------------------------------------------------------------

                this.getView().setModel(oModel); // 이 컨의 view를 가져와서, 만들어준 oModel을 set 해주기. 이름 없는 기본 모델
                // this.getView().setModel(oModel2, "car"); // 이 컨의 view를 가져와서, 만들어준 oModel을 set 해주기. car 라는 이름의 모델
                

                // --------------------------------------------------------------
                // 실습: 
                var oTestData = { // 이 변수 없이, JSONModel 생성할 때 그 파라미터 안에 아래 데이터 그대로 복붙해도 됨.
                    textValue : "Hello",
                    name : {
                        firstName : "Hong",
                        lastName : "GilDong"
                    },
                    datas : [ // 배열. 모든 요소가 다 필요할 때, 상대경로 지정. 이렇게 배열 객체를 table(row, col)
                        { name : "Kim", age : 30, tel : '010-2222-2222' },
                        { name : "park", age : 10, tel : '010-3333-3333' },
                        { name : "Moon", age : 20, tel : '010-4444-4444' } // 세번째 객체에서 이거 출력
                    ]
                }
                var oTestModel = new JSONModel(oTestData);
                this.getView().setModel(oTestModel, "test"); // 바인딩 전 마지막 단계. 모델 이름을 "test"라고 설정. oTestModel은 변수 이름.
                
                console.log(oTestModel.getData()); // 개발자도구 콘솔창에 oModel의 데이터 출력.

                
            },

            onClick : function () {
                // var oModel = this.getView().getModel("test");
                // var data1 = oModel.getData();
                // var data2 = oModel.getProperty("/name/firstName");
                // //var data2 = oModel.getProperty("/");// 바꿀 데이터가 많ㅇ면, 이렇게 전체데이터 갖고 와서, 셋데이터는 한 번만. 남발하지 않기.

                // // // 데이터 가져온 후, 데이터 핸들링

                // oModel.setData({name : "Hong"}, true); // setData는 true 안주면 merge 안되서 값 싹 덮어씌워짐. hong 밖에 안남음.
                // // debugger;
                // oModel.setProperty("/name/firstName", "Park");
                // console.log(oModel.getData());
                var newResult = {name : "hong", age : "20", tel: "010-9999-9999"};

                var oModel = this.getView().getModel("test"); // 모델명 입력해서 "local" 모델 가져오기. 빈 모델이면 빈 값("") 입력. 
                var aDatas = oModel.getProperty("/datas"); // "datas" 배열 가져오기.
                // json 파일에서 데이터 가져오기 메소드
                // 1. getProperty() : 특정경로 지정해서 거기에 있는 데이터. (/) 면 거깄는거 싹다 가져온다. 애초부터 그 경로만 가서 history만 가져옴. 쪼끔 더 느림.
                //                      /history : 모델의 루트에서부터 시작하여 "history"라는 속성에 접근하는 경로.
                //                      모델의 특정 위치에 있는 데이터에 접근하려면 해당 위치까지의 경로를 제공해야 함.
                // 2. getData() : 객체 전체 데이터 가져오기. 근데 보통 객체는 .으로 접근하니까,
                //                  history를 가져오려면 oLocalModel.getData.history 하면 됨. 전체 가져온 후 history 골라얻기.
                
                aDatas.push(newResult); // 새로운 결과 행을 "history" 배열에 직접 추가
                oModel.setProperty("/datas", aDatas); // 변경된 배열을 다시 모델에 직접 설정. 특정 경로를 설정해서 걔만 바꿈. 파라미터는 (대상경로, 바꿀 값)
                // oLocalModel.setData({name : 'okok'}); // 하면 기존에 있던 데이터 다 날라가고 덮어쓰기 해버림. 근데 merge에 true 설정하면 기존에 잇던 데이터 안날리고 할수잇음. 보통 얘는 덮어쓰기용으로 많이 씀. 파라미터는 (세팅할 데이터, 합치기merge 여부)
                
            },

            onSetData : function (oEvent) { // 오이벤트라는 이름으로 객체를 불러오겠다
                var oModel = this.getView().getModel(); // 기본 이름없는 모델 호출
                var oTestModel = this.getView().getModel("test"); // test라는 이름의 모델 호출
                
                // var sInputData = oModel.getProperty("/inpValue"); // input은 따로 받아 오기!
                var sInputData = oModel.getData().inpValue; // 기본 이름없는 모델에서 갯데이터로 전체데이터 갖고와서, 그 다음에 inpValue값만 걸러줌. 
                // console.log(sInputData);
                
                // oTestModel에 있는 textValue 데이터 변경
                // Hello + Input 창에 입력한 데이터 

                // setProperty, setData 둘 다 적용 가능!
                oTestModel.setProperty("/textValue", `Hello ${sInputData}`); // setProperty("/경로", 변경할 값)
                //oTestModel.setData({textValue : "Hello " + sInputData}, true); // setData(변경할 객체 전보, 합치기여부(bool))

            }

        });
    });
