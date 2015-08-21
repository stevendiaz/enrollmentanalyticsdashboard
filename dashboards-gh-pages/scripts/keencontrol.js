var client = new Keen({
  projectId: "55a818a346f9a76020f5232c",
  readKey: "7098cd39ac668d7ab67d448d7b71210cc94bd40467b941fc9157e9dbde1ca1507e14a3d76d15554b16fa1982ccb93b0b239811c35b2404f6065b85cd3144534eabd71d07a6bbcb1271bc2726634eb865bf79a98c5ca09255935e13836b13d188d0f61393857a7cce8f1209abf27a5014"
});

Keen.ready(function(){

  var enrollments_top = new Keen.Query("count", {
    eventCollection: "enrollments",
    interval: "hourly",
    timeframe: "this_2_days",
    timezone: "UTC"
  });
  
  client.draw(enrollments_top, document.getElementById("chart-03"), {
    chartType: "linechart",
    title: false,
    height: 250,
    width: "auto",
    chartOptions: {
      chartArea: {
        height: "85%",
        left: "5%",
        top: "5%",
        width: "80%"
      },
      isStacked: true
    }
  });

  var enrollments_bottom = new Keen.Query("count", {
    eventCollection: "enrollments",
    interval: "daily",
    timeframe: "this_2_days",
    timezone: "UTC"
  });

  client.draw(enrollments_bottom, document.getElementById("chart-01"), {
    chartType: "linechart",
    title: false,
    height: 250,
    width: "auto",
    chartOptions: {
      chartArea: {
        height: "85%",
        left: "5%",
        top: "5%",
        width: "80%"
      },
      isStacked: true
    }
  });

  var state_chart = new Keen.Query("count", {
    eventCollection: "enrollments",
    groupBy: "BillingAddress.State",
    timeframe: {
      start: "2014-05-01T00:00:00.000Z",
      end: "2015-07-22T00:00:00.000Z"
    }
  });
  client.draw(state_chart, document.getElementById("state-chart"), {
    chartType: "piechart",
    title: false,
    height: "auto",
    width: "auto",
    chartOptions: {
      chartArea: {
        height: "85%",
        left: "5%",
        top: "5%",
        width: "100%"
      },
      pieHole: .4
    }
  });


  var enrollments_vendorid = new Keen.Query("count", {
    eventCollection: "enrollments",
    groupBy: "CompanyDetails.VendorId",
    targetProperty: "CompanyDetails.VendorId",
    timeframe: "this_2_days",
    timezone: "UTC"
  });
  
  client.draw(enrollments_vendorid, document.getElementById("vendor-chart"), {
    chartType: "piechart",
    title: false,
    height: "auto",
    width: "auto",
    chartOptions: {
      chartArea: {
        height: "85%",
        left: "5%",
        top: "5%",
        width: "100%"
      },
      pieHole: .4
    }
  });

  var existingcustomer_query = new Keen.Query("count", {
    eventCollection: "enrollments",
    groupBy: "CompanyDetails.ExistingCustomer",
    targetProperty: "CompanyDetails.ExistingCustomer",
    timeframe: "this_2_days",
    timezone: "UTC"
  })

  client.draw(existingcustomer_query, document.getElementById("status-chart"), {
    chartType: "piechart",
    title: false,
    height: "auto",
    width: "auto",
    chartOptions: {
      chartArea: {
        height: "85%",
        left: "5%",
        top: "5%",
        width: "100%"
      },
      pieHole: .4
    }
  });

  var channel_query = new Keen.Query("count", {
    eventCollection: "enrollments",
    groupBy: "CompanyDetails.ChannelCode",
    targetProperty: "CompanyDetails.ChannelCode",
    timeframe: "this_2_days",
    timezone: "UTC"
  })

  client.draw(channel_query, document.getElementById("channel-chart"), {
    chartType: "piechart",
    title: false,
    height: "auto",
    width: "auto",
    chartOptions: {
      chartArea: {
        height: "85%",
        left: "5%",
        top: "5%",
        width: "100%"
      },
      pieHole: .4
    }
  });

});

function submitForm() {
  var vendor = document.getElementById("vendor-input").value;
  var source = document.getElementById("source-input").value;
  var startdate = document.getElementById("start-date").value
}


function selectlist() {
  var time = document.getElementById("timelist");
  updateGraph(time.options[time.selectedIndex].text);
}

function updateGraph(x) {
  var timeinterval = x.toLowerCase();

  Keen.ready(function() {
    var query = new Keen.Query("count", {
      eventCollection: "enrollments",
      interval: timeinterval,
      timeframe: "this_2_days",
      timezone: "UTC"
    });

    client.draw(query, document.getElementById("chart-03"), {
      chartType: "linechart",
      title: false,
      height: 250,
      width: "auto",
      chartOptions: {
        chartArea: {
          height: "85%",
          left: "5%",
          top: "5%",
          width: "80%"
        },
        isStacked: true
      }
    });

  });

}
