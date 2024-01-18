sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/Filter", "sap/ui/model/json/JSONModel", "sap/viz/ui5/controls/VizFrame"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, JSONModel) {
        "use strict";

        return Controller.extend("sap.btp.ux410solving.controller.Detail", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this); // 이 줄이 없으면, 메인에서 값이 못 넘어옴! 패턴매치를 안하니까. 온패턴매치드 함수 안에, 값 받아와서 뷰에 바인드해서 뿌리는 코드가 잇다!
            },
            _onPatternMatched: function (oEvent) { // 이벤트객체 받기
                var oArgu = oEvent.getParameters().arguments; // 메인컨에서 보낸 애(argument)를 받아오기
                console.log("Detail : ", oArgu); // 메인컨에서 보낸 애를 잘 받아오는지!
                this.byId("idForm").bindElement(`/Order_Details(OrderID=${oArgu.OrderID},ProductID=${oArgu.ProductID})`);
                // 우리가 디멘션을 두 개를 했으니까?!!!
                // medata에, 바인딩한 엔티티셋 검색해서 key값 뭔지 확인. 아래처럼 나옴.
                // <EntityType Name="Order_Detail">
                //     <Key>
                //         <PropertyRef Name="OrderID"/>
                //         <PropertyRef Name="ProductID"/>
                //     </Key>
                // 내가 데이터를 가져올 EntitySetName이 뭔지 꼭 확인! 여기서는 차트를 클릭해서 들어온거고, 그 차트에 Order_Details가 바인딩되어있으므로 Order_Details
                // EntitySetName을 메타데이터에 검색해서, 키값 몇갠지 뭔지 꼭 확인할 것!
                // '/EntitySetName(OrderID="",ProductID="")' // Order_Details는 키가 OrderID, ProductID 두개 필요함!
                // , 사이에 띄어쓰기 없게!!!
                
                
            },
            onNavBack: function () {
                this.oRouter.navTo('RouteMain',{
                    test: 'test!!!!!!!!!!!!!!!!!!'
                }, true);
                
            }
            
        });
    });
