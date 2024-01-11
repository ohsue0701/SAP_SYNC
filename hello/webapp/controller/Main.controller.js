sap.ui.define([ // 첫번째값은 배열, 두번째 값은 함수.
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel" // 배열 안에 SAP에서 만들어놓은 컨트롤러 껍데기가 들어감. 아래에서 사용할 애를 라이브러리에서 불러와서 담아두기. 아래의 변수로 사용될 수 있도록 funtion에 파라미터로 controller 넣음.
    // , "sap/m/Button"
    //, "sap/ui/table/Table" // 쓸 객체 지정. 라이브러리로부터.
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) { // 라이브러리에서 불러온 애들 파라미터 변수에 넣을 수 있음
        "use strict";

        return Controller.extend("hello.controller.Main", { // 컨트롤러 껍데기를 확장, 아이디 설정. 보통 경로로 설정. 최종적으로 우리가 멋지게 확장한 컨트롤러를 반환할거야.
            // 컨트롤러의 life cycle : onInit, OnBeforeRendering, onAterRendering, onExit
            onInit: function () { // 초기화 함수. 초기값 설정, 화면에서 사용할 모델 생성, 아래 함수들이 사용할 공통 변수
                // new sap.m.Button 이렇게 할 거를 (이건 일회성)
                // new Button 이렇게 가능. (많이 쓰는 객체일 때 유용)
                // 위에 배열에 저장을 해둬서 이렇게 간소화해서 생성할 수 있다.
                
                // 01/03
                // 여기서, 초기화 설정 한다!
                // this.byId("idInput1").setValue("10"); 
                // this.byId("idInput2").setValue("20");
                // 했는데 안되면, 이 화면이 아직 그려지기 전에 oninit이 실행되기 때문에 타이밍이 맞지 않아 이게 아직 다 완성이 안될 수도 있음.
                // 고로 geyView는 idinput 객체가 없다고 오류 날 수도 있다.
                // 그러면 onAfterRendering 등 화면이 그려진 후에 로직을 실행할 수 있도록 설정하면 되는데, 그런 경우는 많지는 않음.
                

                // 나중에 모델 배울 때, 모델 접근 시 뷰에서 하는게 아니라 컴포넌ㅋ트나 메니페스트로 가야 댈수도
                this.getOwnerComponent().getModel() // Componant 단으로 올라가기 위해서 getOwnerComponent() 사용



                // 상대경로로 불러올 데이터
                var oData = { // 이 포맷 기억!
                    title : {
                        subTitle : 'Calculator Program'
                    },
                    list : [ // 각 요소가, 같은 속성명으로 쭈루룩 있어야. 두 개의 쌍이 하나의 객체를 이루도록. 한 행!
                        {key : 'plus', text : '+'},
                        {key : 'minus', text : '-'},
                        {key : 'multiple', text : '*'},
                        {key : 'divide', text : '/'}
                    ]

                }
                // JSON 데이터 객체 oData 만들기
                var oModel = new JSONModel(oData); // oData를 넣어서 JSON 모델 oModel 만들기
                this.getView().setModel(oModel, "op");

                // 1. 뷰의 title에 id 부여하고 거기에 바인딩
                // this.byId("idTitle").bindElement('/title'); // 모델 이름 없는 경우
                this.byId("idTitle").bindElement({ // 모델 이름이 있기 때문에 이렇게 상세하게 적어야,
                    path : '/title',
                    model : 'op'
                }); 

                // // 2. 뷰의 버티컬레이아웃에 id 부여하고 거기에 바인딩
                // this.byId("test").bindElement({
                //     path : '/title',
                //     model : 'op'
                // });



                var oTableData = {
                    history : [ // 이 배열을 건드려야! 력받은 애를 화면에 뿌리려면. 이 배열에 저장해야!
                        {num1 : '1', oper : '+', num2 : '1', result : '2'},
                        {num1 : '99', oper : '+', num2 : '2', result : '101'}
                    ]
                }
                var oTableModel = new JSONModel(oTableData);
                this.getView().setModel(oTableModel, "local");
                

            },

            fnColorFormat : function (sValue) {
                if (sValue > 100) {
                    return '#86E57F';
                } else {
                    return '#F361A6';
                }
            },

            onBeforeRendering : function () {/*메인 뷰가 그려지기 전 실행*/},
            onAfterRendering: function () {/*메인 뷰가 그려진 후 실행*/},
            onExit: function () {/*화면 종료되면 실행. 가비지 컬렉터 역할 구현 가능*/},

            onClear : function () {
                var iInput1 = this.byId("idInput1");
                var iInput2 = this.byId("idInput2");
                iInput1.setValue("");
                iInput2.setValue("");
            },

            // 내가만든 이벤트함수. main.view.xml에서 갖다쓸것.
            onCalc : function () {
                // 객체 가져오기
                var iInput1 = Number(this.byId("idInput1").getValue());
                var iInput2 = Number(this.byId("idInput2").getValue());
                var oSelect = this.byId("idSelect")
                var sOperator = oSelect.getSelectedItem().getText(); // 함수 중첩하여 활용!! 바로 윗줄과 합쳐도 되지만 oSelect 사용할 일이 많다면 이렇게 하는 게 더 유용
                // ID에 해당되는 객체 가져오기. 최종적으로는 input을 가져오게 되고, input 객체의 메소드들을 다 쓸 수 있게 된다! 우리는 getValue() 쓸거임!
                // this는 현재의 나 자신. 여기선 controller. , .getView : Controller에 있는 메소드 -> main.view.xml 얻을수있다, .byId() : View에 있는 메소드
                // API에서 확인가능.맨위 define에 지정해놨던 거 참고. mvc.controller
                // alert(sValue);

                var iResult;

                switch(sOperator) {
                    case "+":
                        iResult = iInput1 + iInput2;
                        break;
                    case "-":
                        iResult = iInput1 - iInput2;
                        break;
                    case "*":
                        iResult = iInput1 * iInput2;
                        break;
                    case "/":
                        iResult = iInput1 / iInput2;
                        break;
                };

                sap.m.MessageToast.show(iResult) // 토스트 메시지


                // onCalc 에, 입력받은 계산에 대한 결과까지 테이블에 추가하기!
                var newResult = {
                    num1 : iInput1,
                    oper : sOperator,
                    num2 : iInput2,
                    result : iResult
                };
                
                var oLocalModel = this.getView().getModel("local"); // 모델명 입력해서 "local" 모델 가져오기. 빈 모델이면 빈 값("") 입력. 
                // var aHistory = oLocalModel.getProperty("/history"); // "history" 배열 가져오기.
                var aHistory = oLocalModel.getData().history; // "history" 배열 가져오기.

                // json 파일에서 데이터 가져오기 메소드
                // 1. getProperty() : 특정경로 지정해서 거기에 있는 데이터. (/) 면 거깄는거 싹다 가져온다. 애초부터 그 경로만 가서 history만 가져옴. 쪼끔 더 느림.
                //                      /history : 모델의 루트에서부터 시작하여 "history"라는 속성에 접근하는 경로.
                //                      모델의 특정 위치에 있는 데이터에 접근하려면 해당 위치까지의 경로를 제공해야 함.
                // 2. getData() : 객체 전체 데이터 가져오기. 근데 보통 객체는 .으로 접근하니까,
                //                  history를 가져오려면 oLocalModel.getData.history 하면 됨. 전체 가져온 후 history 골라얻기.
                
                // aHistory의 변경 후 이걸 통째로 다시 모델에 업데이트를 해 줘야 바뀜.
                // this.getView().getModel() 로 가져온 '모델'은 찐 모델의 '주소값'을 oLocalModel 변수에 넣었고,
                // oLocalModel.getProperty()로 가져온 '속성(배열 aHistory)'는 찐 history 변수의 주소값이 아닌 '그 안에 있는 값'을 넣었기 때문??
                // 근데 이걸 어떻게 구분????? 그냥 깔끔하게 SET 까지 다 해라~
                aHistory.push(newResult); // 새로운 결과 행을 "history" 배열에 직접 추가
                oLocalModel.setProperty("/history", aHistory); // 변경된 배열을 다시 모델에 직접 설정. 특정 경로를 설정해서 걔만 바꿈. 파라미터는 (대상경로, 바꿀 값)
                // oLocalModel.setData({history : aHistory});
                // oLocalModel.setData({name : 'okok'}); // 하면 기존에 있던 데이터 다 날라가고 덮어쓰기 해버림. 근데 merge에 true 설정하면 기존에 잇던 데이터 안날리고 할수잇음. 보통 얘는 덮어쓰기용으로 많이 씀. 파라미터는 (세팅할 데이터, 합치기merge 여부)
                // 얕은 복사 vs 깊은 복사 


                // Expression Binding (표현식 바인딩) : 바인딩할 때 간단한 로직이 들어감
            }
        });
    });