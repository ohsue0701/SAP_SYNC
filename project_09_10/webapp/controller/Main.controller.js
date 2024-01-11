sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, FlattenedDataset, FeedItem) {
        "use strict";

        return Controller.extend("project0910.controller.Main", {
            onInit: function () {
                var oData = {
                    list : [
                        {name : 'aaa', rate : '35', cost : '10'},
                        {name : 'bbb', rate : '15', cost : '12'},
                        {name : 'ccc', rate : '10', cost : '11'},
                        {name : 'ddd', rate : '15', cost : '15'},
                        {name : 'eee', rate : '20', cost : '10'},
                        {name : 'fff', rate : '5', cost : '16'},
                    ]
                }
                this.getView().setModel(new JSONModel(oData), "view");

                // 파이차트 클릭했을때 정보 뜨게
                // var oPopover = this.byId("idPopover");
                // oPopover = connect(this.byId("idLineChart").getVizUid());

                // 뷰에 껍데기만 놓고, 컨에서!
                this._setChartInController(); // 인잇함수 내에서 이 함수를 실행시키기 가능.
            },

            _setChartInController: function () {
                var oData = {
                    sales : [
                        { product : "Jackets", amount : "65" },
                        { product : "Shirts", amount : "70" },
                        { product : "Pants", amount : "83" },
                        { product : "Coats", amount : "92" },
                        { product : "Purse", amount : "77" }
                    ]
                }
                this.getView().setModel(new JSONModel(oData), "cont"); // 모델명 지정 시 ""!

                // chart 껍데기 불러오기
                var oColFrame = this.byId("idColChart");

                // dataset (FlattenedDataset 써야 하니까 찾아서 라이브러리에 추가하기)
                var oColDataset = new FlattenedDataset({
                    // 아래 세개는 FlattenedDataset의 aggregation
                    data : { // 여기서 지정한 path가 위 두개의 길잡이
                        path : 'cont>/sales' // 여기는 {} 안들어감. 왠지 모름
                    },
                    dimensions : [{
                        name : 'Product', // 카테고리명 등
                        value : '{cont>product}' // 데이터 정보
                    }],
                    measures : [{
                        name : 'Amount', // 이 name이 FeedItem 의 values 에 들어간다!
                        value :  '{cont>amount}'
                    }]
                });

                oColFrame.setDataset(oColDataset);
                // 아까 가져왔던 껍데기 안에, 위에서 만든 데이터셋 세팅해주기
                // -> 차트와 데이터셋이 연결된 상태가 됨!

                // 이제 피드를 구성. 
                // FeedItem 써야 하니까 찾아서 라이브러리에 추가하기
                var feedColCategoryAxis = new FeedItem({
                    // 뷰에서 했을때와 마찬가지로 type, uid, values 3개의 값 넣기
                    uid : 'categoryAxis',
                    type : 'Dimension',
                    values : ['Product'] // FlattenedDataset의
                });
                var feedColValueAxis = new FeedItem({
                    // 뷰에서 했을때와 마찬가지로 type, uid, values 3개의 값 넣기
                    uid : 'valueAxis',
                    type : 'Measure',
                    values : ['Amount'] // FlattenedDataset의
                });

                // 피드 추가 -> 화면 나옴!
                oColFrame.addFeed(feedColCategoryAxis);
                oColFrame.addFeed(feedColValueAxis);

                // 뷰에서 했던거랑 똑같이 프로퍼티 설정 가능
                oColFrame.setVizProperties({
                    title : { text : '두 번째 차트' }
                });

            }
        });
    });
