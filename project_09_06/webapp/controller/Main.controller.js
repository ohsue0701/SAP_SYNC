sap.ui.define([
    "sap/ui/core/mvc/Controller",
    // 미리 라이브러리에서 가져와서, 함수에서 변수처럼 쓸 수 있게@!
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) { //  순서가 중요하다!
        "use strict";

        return Controller.extend("project0906.controller.Main", {
            onInit: function () {

            },
            
            // HelloFrag.fragment.xml 안에 있는 버튼 press 이벤트
            HelloButtonPress: function () {
                sap.m.MessageToast.show("Hello fragment!");
            },
            
            // id를 활용해서 팝업창 불러와서 오픈하기!
            onOpenDialog: function () {
                this.byId("idDialog").open();
            },

            onOpenDialogP: function () {
                this.byId("idDialogP").open();
            },
            
            // id를 활용해서 팝업창 불러와서 클로즈하기! 버튼의 아이디가 아닌, 그냥 그 닫을 다이얼로그의 아이디 가지고, 그걸 닫는 함수니까. 함수의 역할, 영향 미치는 상대 잘 생각하기!
            onClose: function () {
                // this가 먹힐땐 이렇게
                // this.byId("idDialog").close();

                // this가 안먹힐 땐 이렇게
                sap.ui.getCore().byId("idDialog").close();
                // 닫았다 다시키면 안됨.
                // idDialog가 중복되었다는 에러가 남.
                // 외부 파일을 로드해서 불러온 거기 때문에. 그 파일이 지금 두 번 호출되었기 때문에.
                // 프래그를 뷰에서 로드했어. idDialog가 하나 생겼다. ... 한 번만 하는 로직을 만들면 더이상 에러가 발생하지 않아.

            },

            onCloseP: function () {
                // this가 먹힐땐 이렇게
                // this.byId("idDialog").close();

                // this가 안먹힐 땐 이렇게
                sap.ui.getCore().byId("idDialogP").close();
                // 닫았다 다시키면 안됨.
                // idDialog가 중복되었다는 에러가 남.
                // 외부 파일을 로드해서 불러온 거기 때문에. 그 파일이 지금 두 번 호출되었기 때문에.
                // 프래그를 뷰에서 로드했어. idDialog가 하나 생겼다. ... 한 번만 하는 로직을 만들면 더이상 에러가 발생하지 않아.

            },
            
            // Button의 press 이벤트
            // 이벤트 함수는 이벤ㅌ 객체 oEvent 받아옴
            onClose: function(oEvent) {
                // oEvent 안에는 getSource(), getParameters() 등이 있음\
                //getSource() : 해당 이벤트를 일으킨 객체, 여기서는 앤드버튼(agg(소문자). class(대문자) 아님.)의 클로즈 버튼이 리턴됨.
                
                // this.byId("idDialog").close(); -> View 안에서 호출한 팝업 닫기. 
                // sap.ui.getCore().byId("idDialog").close(); -> 컨 안에서 파일 로드한 팝업 닫기
                // 두 버전의 팝업 닫기를 통일하여 사용하려면? oEvent 활용
                // -> 
                // oEvent.getSource() 하면, 이벤트를 일으킨 객체가 리턴됨 -> 버튼
                // 버튼에서 .getParent() 하면, 상위 객체 Dialog 를 가져올 수 있음
                // 따라서 Dialog 에서 .close() 실행 시 팝업이 닫힘
                oEvent.getSource().getParent().close(); 
            },

            // 아예 독립된 애에서 불러오는 애이기 때문에 this가 안먹히겠지. webapp\view\fragment\Dialog.fragment.xml
            onOpenDialog_con: function () {

                var dialog = sap.ui.getCore().byId("idDialog");
                // 만약에, dialog 변수에 값이 있으면 dialog.open() 하면 되고, 
                // dialog 변수에 값이 없으면 load 메소드를 실행
                if (dialog) { // 1회 연 후 이미 dialog 변수에 값이 있으니까 있는 걸 dialog.open()만 하면 되고
                    dialog.open();
                } else { // 새로고침 후 최초 1회만 실행. 없으니까 가져와라.
                    Fragment.load({ // 별도의 프래그를 호출하겠다!
                        name : "project0906.view.fragment.Dialog",
                        type : "XML",
                        controller : this // 컨 넘겨주기
                    }).then(function(oDialog){
                        oDialog.open();
                    });
                    // Fragment에 load 메소드 있음. 사이트 참고! 첫번째 값에 객체 형태로 들어감 {}. {} 안에느 name, type 등등이 들어갈 수있음.
                    // 일반 뷰에서 프렉을 로드할건데, 그 로드에 시간이 좀 걸림, 그 후에 다른 작업을 해야 하므로 이 파일이 로드가 완료되면 then이라는 함수가 자동으로 실행되게 해야함
                    // 로드할 때 컨트롤러 같이 넘겨주면 닫기 가능. 이 컨 내에서 클로즈 함수 작성하면 걔가 실행됨
                }

            },

            onOpenDialogP_con: function () {

                var dialogP = sap.ui.getCore().byId("idDialogP");
                // 만약에, dialog 변수에 값이 있으면 dialog.open() 하면 되고, 
                // dialog 변수에 값이 없으면 load 메소드를 실행
                if (dialogP) { // 1회 연 후 이미 dialog 변수에 값이 있으니까 있는 걸 dialog.open()만 하면 되고
                    dialogP.open();
                } else { // 새로고침 후 최초 1회만 실행. 없으니까 가져와라.
                    Fragment.load({ // 별도의 프래그를 호출하겠다!
                        name : "project0906.view.fragment.Name", // name 똑바로 입력하기! 경로임!
                        type : "XML",
                        controller : this // 컨 넘겨주기
                    }).then(function(oDialogP){
                        oDialogP.open();
                    });
                    // Fragment에 load 메소드 있음. 사이트 참고! 첫번째 값에 객체 형태로 들어감 {}. {} 안에느 name, type 등등이 들어갈 수있음.
                    // 일반 뷰에서 프렉을 로드할건데, 그 로드에 시간이 좀 걸림, 그 후에 다른 작업을 해야 하므로 이 파일이 로드가 완료되면 then이라는 함수가 자동으로 실행되게 해야함
                    // 로드할 때 컨트롤러 같이 넘겨주면 닫기 가능. 이 컨 내에서 클로즈 함수 작성하면 걔가 실행됨
                }

            }
            

        });
    });
