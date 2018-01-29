// ==UserScript==
// @name         binance - profits automatically
// @namespace    http://igeek.io/
// @version      1.0
// @description  profits automatically
// @author       @Saleh7
// @match        https://www.binance.com/tradeDetail.html*
// @grant        none
// ==/UserScript==

$("tr th.f-left span span.ng-binding").ready(function(){
  setTimeout(function(){
      var Profit = 1.50; // Profit | Optional change
      var Refresh = 1000; // Refresh every 1 second | Optional change
      function autoRefresh_div(){
        var getPrice = $('tr th.f-left span span.ng-binding').text();
        var proPrice = getPrice * Profit / 100;
        var profitPrice = Number(getPrice) + Number(proPrice.toFixed(8));
        var getAmount = $('input#buy_order').val();
        var feeAmount = getAmount * 0.1 / 100;
        var amount = Number(feeAmount) - Number(getAmount);
        $(".f-fr").first().after(`
          <div class="border-bottom" id='setTable'>
           <table class="table">
             <colgroup style="width:17%;"></colgroup>
             <colgroup style="width:24%;"></colgroup>
             <colgroup style="width:19%;"></colgroup>
             <colgroup style="width:19%;"></colgroup>
             <colgroup style="width:26%;"></colgroup>
             <tbody><tr>
               <th class="f-center ng-binding">Buy Price</th>
               <th class="f-center ng-binding">Target</th>
               <th class="f-center ng-binding">Profit margin</th>
               <th class="f-center ng-binding">Amount - Fee</th>
             </tr>
             <tr>
             <td class="f-center ng-binding">`+getPrice+`</td>
               <td class="f-center ng-binding green">`+profitPrice.toFixed(8)+` BTC</td>
               <td class="f-center ng-binding green">`+Profit+`%</td>
               <td class="f-center ng-binding green">`+amount.toFixed(5)+`</td>
             </tr>
           </tbody></table>
          </div>
        `);
      }
      // auto Refresh
      setInterval(function(){
        $('#setTable').remove();
        $('div.tip.ng-binding.ng-scope').remove();
        autoRefresh_div();
      }, Refresh);
  }, 1500);
});
