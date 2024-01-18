sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox) {
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
            onEntity: function () {
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey('/Member', {
                    Memid : '00000002'
                });

                oDataModel.read(sPath, {
                    success : function (oReturn) {
                        MessageBox.success("데이터 생성이 완료되었습니다.");
                        console.log("데이터 생성이 완료되었습니다.", oReturn);
                    }
                })
            },
            onEntitySet: function () {
                var oDataModel = this.getView().getModel(); 

                oDataModel.read("/Member", {
                    success: function(oReturn) {
                        MessageBox.error("전체 조회가 완료되었습니다.");
                        console.log("전체조회 완료 ", oReturn);
                    },
                    error: function (oError) { 
                        MessageBox.error("전체조회 중 오류가 발생하였습니다");
                        console.log("전체조회 중 오류 발생 : ", oError);
                    }
                });
            },
            onCreate: function () { 
                var oDataModel = this.getView().getModel();
                var oLocalData = this.getView().getModel('data').getData();

                var oBody = { 
                    "Memid" : oLocalData.Memid,
                    "Memnm" : oLocalData.Memnm || '', 
                    "Telno" : oLocalData.Telno || '',
                    "Email" : oLocalData.Email || ''
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
