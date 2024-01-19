sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/m/MessageBox","sap/ui/core/Fragment","sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, Fragment, Filter) {
        "use strict";

        return Controller.extend("project0914.controller.Main", {
            onInit: function () {

                var oData = {
                    "Memid": "",
                    "Memnm": "",
                    "Telno": "",
                    "Email": ""
                }

                var oModel = new JSONModel(oData);

                this.getView().setModel(oModel, 'data');
                

            },
            onRowSelectionChange: function (oEvent) {
                if(!oEvent.getParameter('rowContext'))  return; 

                var sPath = oEvent.getParameter('rowContext').getPath();
                var oSelectData = this.getView().getModel().getProperty(sPath);
                this.getView().getModel('data').setData(oSelectData);

            },
            onReset: function () {
                var oEmptyData = {
                    "Memid": "",
                    "Memnm": "",
                    "Telno": "",
                    "Email": ""
                }

                this.getView().getModel('data').setData(oEmptyData); 
                this.byId("idTable").clearSelection(); 
                this.getView().getModel().refresh(true);
            },
            onRead: function () {
                // var oPopover = sap.ui.getCore().byId("myPopover");

                // Fragment.load() 사용 시,
                // view id를 같이 넘겨줬기 때문에 View 안에서 popover가 붙게 됨
                // 따라서 this.byId() 로 접근 가능

                var oPopover = this.byId("myPopover");
                var oPopoverModel = oPopover.getModel('popover');

                // console.log(oPopoverModel.getData());

                // 해당 모델 데이터로 {Membername : "입력값"} 얻을 수 있음.
                // 입력값을 가지고 필터 객체 생성 후, ODataModel.read() 사용하여
                // 데이터 조회해보기. 필터 조건은 Contains
                // 이름에 Kim 들어간 거 했을때 Kim 다 나와야. 
                // read 구문 구현해보기!
                
                    // Memberid
                    //     : "00000010"
                    // Membername
                    //     : "Kim gee gee"
                var oData = oPopoverModel.getData();

                // var oFilter = new Filter("Memnm", "EQ", oPopoverModel.oData.Membername);
                var oFilter = new Filter("Memnm", "Contains", oData.Membername); // Contains로 하려면 back에서 다중필터 형태여야! 단일이면 안됨.
                // 첫 패스값은 오데이터 서비스의 그 키값과 똑같아야 하고, 세 번째 값은 우리가 만든 애의 키여야지.
                var oDataModel = this.getView().getModel();

                oDataModel.read("/Member", {
                    urlParameters : {
                        "$expand" : "WorkSet",
                        // 멤버를 조회할 때 확장해서 , 서브 테이블인 워크셋도 같이 조회해라!
                        "$select" : "Memid,WorkSet" // 내가 조회할 데이터 선택해서 걔네만 조회 가능
                    },
                    filters: [oFilter],
                    success: function(oReturn) {
                        MessageBox.success("전체 조회가 완료되었습니다.");
                        console.log("전체조회 완료 ", oReturn);
                    },
                    error: function (oError) { 
                        MessageBox.error("전체조회 중 오류가 발생하였습니다");
                        console.log("전체조회 중 오류 발생 : ", oError);
                    }
                });


            },
            onEntity: function () {
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey('/Member', {
                    Memid : '00000002'
                });

                oDataModel.read(sPath, {
                    success : function (oReturn) {
                        MessageBox.success("데이터 단건조회가 완료되었습니다.");
                        console.log("데이터 단건조회가 완료되었습니다.", oReturn);
                    }
                })
            },
            onEntitySet: function (oEvent) {
                var oDataModel = this.getView().getModel(); 
                

                var oButton = oEvent.getSource(),
                    oView = this.getView();
    
                // create popover
                if (!this._pPopover) { // 이 변수에 값이 없으면
                    this._pPopover = Fragment.load({ // 초기세팅
                        id: oView.getId(),
                        // 이렇게 뷰를 같이 세팅해주면
                        // sap.ui.getCore().byID() 일케 안하고, 
                        // this.byId() 이렇게 할 수 있다.
                        name: "project0914.view.fragment.Popover",
                        controller: this
                    }).then(function(oPopover) {
                        oPopover.setModel(new JSONModel(), 'popover');
                        // 이렇게 모델을 빈값으로 두면, 뷰에서 입력하는 대로 속성:값 쑥쑥 들어옴.
                        // 팝오버라는 객체는 popover 모델을 들고 다닌다.
                        oView.addDependent(oPopover);
                        return oPopover;
                    });
                }
                this._pPopover.then(function(oPopover) { // 세팅된 팝오버 열기
                    oPopover.openBy(oButton);
                });

                // oDataModel.read("/Member", {
                //     success: function(oReturn) {
                //         MessageBox.error("전체 조회가 완료되었습니다.");
                //         console.log("전체조회 완료 ", oReturn);
                //     },
                //     error: function (oError) { 
                //         MessageBox.error("전체조회 중 오류가 발생하였습니다");
                //         console.log("전체조회 중 오류 발생 : ", oError);
                //     }
                // });
            },
            onCreate: function () { 
                var oDataModel = this.getView().getModel();
                var oLocalData = this.getView().getModel('data').getData();

                var oBody = { 
                    "Memid" : oLocalData.Memid,
                    "Memnm" : oLocalData.Memnm || '', 
                    "Telno" : oLocalData.Telno || '',
                    "Email" : oLocalData.Email || ''
                    // ,"WorkSet" : [
                    //     { }, { }, { } ... // 리스트 형태. 백 단에서 이걸 어떻게 받을까.
                    // ] 
                };

                oDataModel.create("/Member", oBody, { 
                    success : function () {
                        console.log('12345');
                        MessageBox.success("데이터 생성이 완료되었습니다.");
                        this._showMessage("데이터 생성이 완료되었습니다!!!!")
                    }.bind(this), // success 함수 안쪽에 this(컨)를 넘겨 줘서 컨을 바라볼 수 있게 한다.
                    error : function() {
                        MessageBox.error("에러가 발생하였습니다.");
                    }
                    
                });
                console.log('54321');
            },
            onUpdate: function () {
                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey('/Member', {
                    Memid : oBody.Memid
                })

                oDataModel.update(sPath, oBody, {
                    success : function () {
                        MessageBox.success("업데이트가 완료되었습니다.");
                    }
                })

            },
            onDelete: function () {
                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath =  oDataModel.createKey('/Member', {
                    Memid : oBody.Memid
                })
                
                oDataModel.remove(sPath, {
                    success : function () {
                        MessageBox.success("삭제되었습니다.");
                    }
                })
                
            },
            _showMessage: function (msg) {
                
                MessageBox.success(msg);
            }

            
        });
    });
