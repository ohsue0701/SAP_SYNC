sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("odata.project0913.controller.Main", {
            onInit: function () {

                var oData = {
                    Productno : "",
                    Productname : "",
                    Fname : "",
                    Lname : "",
                    Memo : ""
                } // 빈 데이터 구조 생성

                this.getView().setModel(new JSONModel(oData), 'data'); // 빈 로컬 모델 생성
                // 이 data 라는 모델은, input값을 다루기 위해.
                // 테이블의 값을 눌렀을 때 비어 있던 input의 value에 값을 띄워 주거나,
                // input에 들어온 값을 odata 모델 테이블에 넣어 주기 위해서.
                // table에 보여지는 건 진짜 odata 모델.
                
            },
            onRowSelectionChange: function (oEvent) {
                // 로우 선택 해제 되었을 때도, 선택 된것, 변경사항이 일어난 것이기 때문에 이벤트 발생
                // 따라서 rowContext가 null 값일 땐 함수 종료하도록 함.
                if(!oEvent.getParameter('rowContext'))  return; 
                // 이 앞에서 디버거 찍어보고 하나씩 함수 순서대로 작성한것 뿐!
                // sPath는 경로. 문자열. '/Orders('선택된 행의 키 10238')'
                var sPath = oEvent.getParameter('rowContext').getPath();
                var oSelectData = this.getView().getModel().getProperty(sPath); // 서버 모델의 데이터 싹 가져오기
                this.getView().getModel('data').setData(oSelectData);

                // oSelectData에는 이런 값이 들어감
                //             : 
                //             Fname
                //             : 
                //             "HONG"
                //             Lname
                //             : 
                //             "GILDONG"
                //             Memo
                //             : 
                //             "HELLO HELLO"
                //             Productname
                //             : 
                //             "PRODUCT NAME"
                //             Productno
                //             : 
                //             "1000"

                // 모델 데이터를 가져와서 각각의 Input에 세팅할 수 있음.
                // 이때, 세팅하는 방법은 id 말고, JSON MODEL 로 해보기.
                // JSON MODEL의 이름은 data 로 하겠음.

                // Row 선택 시, 모델 데이터를 가져와서 각각의 input에 세팅
                // 1. 제이슨모델, 오데이터모델 가져오기
                // 2. 사용자가 선택한 로우 경로를 가지고, 오데이터모델 데이터 가져오기
                // 3. 제이슨모델 데이터에, 사용자가 선택한 로우 데이터 세팅
                // 4. 테스트
                // 모델 데이터만 변경하면, 투웨이 바인딩이기 때문에 화면에 바로 적용됨.

            },
            onReset: function () {
                // Reset 버튼 클릭 시 Input 데이터 초기화
                // 아까와 동일하게, 'data' JsonModel 가져와서 데이터 초기화 하면 됨

                var oEmptyData = {
                    Productno : "",
                    Productname : "",
                    Fname : "",
                    Lname : "",
                    Memo : ""
                }

                this.getView().getModel('data').setData(oEmptyData); // 그냥 빈값으로 세팅해도 괜찮음. 구조가 일차원이기 때문에.
                this.byId("idTable").clearSelection(); // 이거 하면 선택(클릭)한 것도 클리어됨!
                this.getView().getModel().refresh(true);
            },
            onEntitySet: function () {
                // 전체 데이터셋 조회 구현
                // GET 요청 : "/Products"
                var oDataModel = this.getView().getModel(); 

                oDataModel.read("/Products", { // read 메서드  : read(sPath, mParameters?)
                    // filters : [], // 이런식으로 필터 객체 배열 들어감.
                    success: function(oReturn) { // mParameters?에 success있음. 타입은 function이라고 되어있으므로.
                        MessageBox.success("전체조회 완료되었습니다.");
                        console.log("전체조회 : ", oReturn);
                    },
                    error: function (oError) { // mParameters?에 에러 처리하는 애도 있음.
                        MessageBox.error("데이터 생성 중 오류가 발생하였습니다.");
                        console.log("전체조회 중 오류 발생 : ", oError);
                    }
                }); // -> 서버에 한번 다녀와서, 데이터 가지고 와서 리턴해줌. 
            },
            onEntity: function () {
                // 데이터 한 건 조회
                // GET 요청 : "Products(ProductNo='1')"
                // url으로 확인. 오데이터서비스 이름 주고 안쪽에 키값입력.
                // ZCL2_PRODUCT_CDS/Products('1000')

                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey('/Products', { // createKey(sCollection, oKeyProperties) : string
                    Productno : '1234' // 나중에 활용할 땐 그 키값에 대한 내용(변수)이 들어가야! 이건 1000번에 해당하는 데이터 한건만 조회.
                }); // sPath 값 => '/Products('0701')'

                // oDataModel.read("/Products('0701')", { // 하드코딩처럼 키값으로 경로 지정.
                oDataModel.read(sPath, { 
                    success : function (oReturn) {
                        console.log("한 건 조회", oReturn);
                        MessageBox.success("한 건 조회가 완료되었습니다.");
                    }
                })
            },
            onCreate: function () { 
                // 데이터 생성 구현
                // POST 요청 : "/Product" + Body
                // 인풋에 값들 넣고 Create 버튼 누르면 추가되도록.

                var oDataModel = this.getView().getModel();
                var oLocalData = this.getView().getModel('data').getData(); // 로컬 데이터의 전체 데이터 가져오기

                var oBody = { // 넘겨줄 바디값 구성. json 데이터 구조에 맞춰서 구성해야 함!
                    "Productno" : oLocalData.Productno,
                    "Productname" : oLocalData.Productname || '', // 값이 있으면 넣고, 없으면 '' 디폴트값을 넣겠다.
                    "Fname" : oLocalData.Fname || '',
                    "Lname" : oLocalData.Lname || '',
                    "Memo" : oLocalData.Memo || ''
                };

                oDataModel.create("/Products", oBody, {  // create 메서드 : create(sPath, oData, mParameters?) , oData는 Body값
                    success : function () {
                        MessageBox.success("데이터 생성이 완료되었습니다.");
                        this._showMessage("데이터 생성이 완료되었습니다!!!!!"); 
                    }.bind(this),  // success 함수 안쪽에 this(컨)를 넘겨 줘서 컨을 바라볼 수 있게 한다.
                    error : function () {
                        MessageBox.error("데이터 생성 중 오류가 발생하였습니다.");
                    }
                });
            },
            onUpdate: function () {
                // 화면에서 특정 데이터 클릭하면 인풋에 값이 들어오는데, 키값 빼고 나머지 값에 대해 변경 후 업뎃 버튼.
                // PUT 요청 : "/Products('1000')" + Body!

                var oBody = this.getView().getModel('data').getData(); // 제이슨 모델만 가져와서 값 가져오면 바디값 간단히 보내기 가능
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey('/Products',{
                    Productno : oBody.Productno // input으로 받아 온 oBody의 키값을 넣는다.
                }); // '/Products('1000')'(키값)과 동일

                oDataModel.update(sPath, oBody, {
                    success: function () {
                        MessageBox.success("데이터 변경이 완료되었습니다.");
                    }
                });
            },
            onDelete: function () {
                // 데이터 삭제 요청
                // DELETE 요청 : "/Products('1000')" 키값만 작성해서 넘겨주면 댐

                var oBody = this.getView().getModel('data').getData(); // 제이슨 모델만 가져와서 값 가져오면 바디값 간단히 보내기 가능
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey('/Products',{
                    Productno : oBody.Productno
                }); // '/Products('1000')'(키값)과 동일

                oDataModel.remove(sPath, {
                    success: function () {
                        MessageBox.success("데이터 삭제가 완료되었습니다.");
                    }
                })
            },
            _showMessage: function (msg) {
                MessageBox.success(msg);
            }
        });
    });
