if (!Function.prototype.bind) {
    Function.prototype.bind = function (e) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
        }
        var t = Array.prototype.slice.call(arguments, 1), n = this, r = function () {
        }, i = function () {
            return n.apply(this instanceof r && e ? this : e, t.concat(Array.prototype.slice.call(arguments)))
        };
        r.prototype = this.prototype;
        i.prototype = new r;
        return i
    }
}
(function () {
    var e = {
        content: [{
            type: "row",
            content: [{
                width: 80,
                type: "column",
                content: [{title: "Fnts 100", type: "component", componentName: "stockGrid"}, {
                    isClosable: false,
                    type: "row",
                    content: [{
                        type: "component",
                        title: "Golden",
                        componentName: "demo",
                        width: 30,
                        componentState: {bg: "golden_layout_spiral.png"}
                    }, {
                        title: "Layout",
                        type: "component",
                        componentName: "demo",
                        componentState: {bg: "golden_layout_text.png"}
                    }]
                }, {
                    type: "stack",
                    content: [{
                        type: "component",
                        title: "Acme, inc.",
                        componentName: "stockChart",
                        componentState: {companyName: "Stock X"}
                    }, {
                        type: "component",
                        title: "LexCorp plc.",
                        componentName: "stockChart",
                        componentState: {companyName: "Stock Y"}
                    }, {
                        type: "component",
                        title: "Springshield plc.",
                        componentName: "stockChart",
                        componentState: {companyName: "Stock Z"}
                    }]
                }]
            }, {
                width: 20,
                type: "column",
                content: [{type: "component", title: "Performance", componentName: "columnChart"}, {
                    height: 40,
                    type: "component",
                    title: "Market",
                    componentName: "pieChart"
                }]
            }]
        }]
    };
    var t = new GoldenLayout(e, "#exampleLayoutContainer");
    t.registerComponent("demo", function (e, t) {
        if (t.bg) {
            e.getElement().append('<img class="testImg" src="assets/images/' + t.bg + '" />')
        }
    });
    ChartComponent = function (e, t, n) {
        this._highChartsConfig = n;
        this._container = e;
        this._name = t;
        this._chart = null;
        this._container.on("open", this._createChart.bind(this))
    };
    ChartComponent.prototype._createChart = function () {
        this._chart = new Highcharts.Chart(this._highChartsConfig);
        this._bindContainerEvents()
    };
    ChartComponent.prototype._bindContainerEvents = function () {
        this._container.on("resize", this._setSize.bind(this));
        this._container.on("destroy", this._chart.destroy.bind(this._chart))
    };
    ChartComponent.prototype._setSize = function () {
        this._chart.setSize(this._container.width, this._container.height)
    };
    t.registerComponent("stockChart", function (e, t) {
        var n = [], r, i, s = (new Date).getTime() - 307584e5, o = Math.random() * 1e3;
        for (i = 0; i < 100; i++) {
            o *= .9 + Math.random() * .2;
            s += 864e5;
            n.push([s, parseFloat(o.toFixed(2))])
        }
        r = {
            title: null,
            legend: {enabled: false},
            credits: {enabled: false},
            plotOptions: {line: {marker: {enabled: false}}},
            xAxis: {type: "datetime", gridLineColor: "#3A3A3A", lineColor: "#3A3A3A", tickColor: "#3A3A3A"},
            yAxis: {title: "Price in USD", gridLineColor: "#3A3A3A"},
            series: [{color: "#555", name: "Close price", data: n}],
            chart: {renderTo: e.getElement()[0], marginBottom: 28, marginTop: 15, backgroundColor: "#222"}
        };
        return new ChartComponent(e, t.companyName, r)
    });
    t.registerComponent("pieChart", function (t, n) {
        e = {
            title: {text: "Market Share", style: {color: "#555", fontSize: "14px"}},
            legend: {enabled: false},
            credits: {enabled: false},
            plotOptions: {
                pie: {
                    colors: ["#4A4A4A", "#444444", "#3A3A3A"],
                    allowPointSelect: true,
                    cursor: "pointer",
                    borderColor: "#111",
                    dataLabels: {enabled: false},
                    tooltip: {
                        headerFormat: '<span style="font-size: 10px">Market Share</span><br/>',
                        pointFormat: "<b>{point.name}</b>: {point.percentage:.1f} %"
                    }
                }
            },
            xAxis: {type: "datetime", gridLineColor: "#3A3A3A", lineColor: "#3A3A3A", tickColor: "#3A3A3A"},
            yAxis: {title: "Price in USD", gridLineColor: "#3A3A3A"},
            series: [{
                type: "pie",
                name: "market share",
                data: [["Competitor A", 45], ["Competitor B", 26.8], {
                    name: "us",
                    y: 12.8,
                    sliced: true,
                    selected: true
                }, ["Competitor C", 8.5], ["Competitor D", 4], ["Competitor E", 3.9]]
            }],
            chart: {renderTo: t.getElement()[0], backgroundColor: "#222"}
        };
        return new ChartComponent(t, "share", e)
    });
    t.registerComponent("columnChart", function (t, n) {
        e = {
            title: {text: "Relative Performance", style: {color: "#555", fontSize: "14px"}},
            legend: {enabled: false},
            credits: {enabled: false},
            plotOptions: {},
            xAxis: {
                categories: ["Q1", "Q2", "Q3", "Q4"],
                gridLineColor: "#3A3A3A",
                lineColor: "#3A3A3A",
                tickColor: "#3A3A3A"
            },
            yAxis: {
                min: 0,
                title: {text: null},
                labels: {enabled: false},
                gridLineColor: "#3A3A3A",
                lineColor: "#3A3A3A",
                tickColor: "#3A3A3A"
            },
            series: [{color: "#444", borderWidth: 0, name: "rel. performance", data: [49.9, 71.5, 26, 33]}],
            chart: {renderTo: t.getElement()[0], type: "column", backgroundColor: "#222"}
        };
        return new ChartComponent(t, "share", e)
    });
    var n = function (e, t) {
        this._container = e;
        this._state = t;
        this._grid = null;
        this._columns = [{id: "symbol", name: "Symbol", field: "symbol"}, {
            id: "company",
            name: "Company",
            field: "company"
        }, {id: "price", name: "Price", field: "price"}, {
            id: "change",
            name: "Change",
            field: "change"
        }, {id: "changeRel", name: "Change %", field: "changeRel"}, {id: "volume", name: "Volume", field: "volume"}];
        this._options = {editable: false, enableAddRow: false, enableCellNavigation: true, enableColumnReorder: false};
        e.on("open", this._scheduleGridCreation, this)
    };
    n.prototype._scheduleGridCreation = function () {
        var e = setInterval(function () {
            var t = $("link[rel=stylesheet]"), n;
            for (n = 0; n < t.length; n++) {
                if (t[n].sheet === null) {
                    return
                }
            }
            clearInterval(e);
            this._createGrid()
        }.bind(this), 10)
    };
    n.prototype._createGrid = function () {
        this._grid = new Slick.Grid(this._container.getElement(), function () {
            var e = ["Acme, inc.", "ACI", "Ajax", "AJX", "Allied Biscuit", "ABS", "Ankh-Sto Associates", "ASA", "Atlantic Northern", "ANO", "Axis Chemical Co.", "ACC", "Barrytron", "BRT", "Big Kahuna Burger", "BKB", "Big T Burgers and Frie", "BBF", "Blammo", "BLM", "BLAND Corporation", "BLC", "Bluth Company", "BLU", "Burleigh and Strongint", "BAS", "C.H. Lavatory and Sons", "CLS", "Carrys Candles", "CCD", "Central Perk", "CEP", "Charles Townsend Agenc", "CTA", "Chasers", "CSS", "Chez Quis", "CQU", "Chotchkies", "CKI", "Cogswell Cogs", "CCO", "Colonial Movers", "CMO", "Compuglobalhypermegane", "CCH", "Corellian Engineering", "CEN", "Data Systems", "DAS", "Duff Brewing Company", "DBC", "Dunder Mifflin", "DMF", "Extensive Enterprise", "EEP", "Fake Brothers", "FBR", "Flowers By Irene", "FBI", "Foo Bars", "FOB", "Gadgetron", "GAG", "Galaxy Corp", "GAC", "General Forge and Foun", "GFF", "General Products", "GPO", "General Services Corpo", "GSC", "Gizmonic Institute", "GIT", "Globex Corporation", "GLC", "Globo Gym American Cor", "GGA", "Globo-Chemimacals", "GCE", "Gringotts", "GGO", "Incom Corporation", "ICO", "Industrial Automation", "IAU", "Initech", "IIT", "Initrode", "INT", "Input, Inc.", "INP", "Keedsler Motors", "KMS", "Klimpys", "KLM", "Krustyco", "KUC", "Kumatsu Motors", "KMO", "Leeding Engines Ltd.", "LEL", "LexCorp", "LCO", "LuthorCorp", "LCP", "Mainway Toys", "MTO", "Mammoth Pictures", "MPI", "McMahon and Tate", "MAT", "Megadodo Publications", "MPU", "Milliways", "MIW", "Minuteman Cafe", "MIC", "Moes Tavern", "MOT", "Monarch Playing Card Corp", "MPC", "Monks Diner", "MOD", "Mooby Corp", "MOB", "Mr. Sparkle", "MRS", "Niagular", "NIA", "Nordyne Defense Dynamimics", "NDD", "North Central Positron", "NCP", "Omni Consimer Products", "OCP", "Osato Chemicals", "OCE", "Petrox Oil Company", "POC", "Plow King", "PLK", "Powell Motors", "PWM", "Praxis Corporation", "PRX", "Primatech", "PMT", "QWERTY Logistics", "QWR", "Roboto Industries", "ROI", "Rouster and Sideways", "RAS", "Roxxon", "ROX", "Sirius Cybernetics Cor", "SCC", "Sixty Second Avenue", "SSA", "Smith and Co.", "SAC", "Sombra Corporation", "SOC", "Sonky Rubber Goods", "SRG", "Spacely Sprockets", "SPR", "Spade and Archer", "SAA", "SpringShield", "SSH", "St. Anky Beer", "SAB", "Stay Puft Corporation", "SPC", "Sto Plains Holdings", "SPH", "Strickland Propane", "SPO", "Taco Grande", "TAG", "Taggart Transcontinent", "TTA", "Tessier-Ashpool", "TEA", "Thatherton Fuels", "TAF", "The Frying Dutchman", "TFD", "The Krusty Krab", "TKK", "The Legitimate Busines", "TLB", "The New Firm", "TNF", "Three Waters", "TWA", "Thrift Bank", "TBA", "Tip Top Cafe", "TTC", "Transworld Consortium", "TWC", "U.S. Robotics and Mech", "URM", "United Fried Chicken", "UFC", "Universal Export", "UEX", "Vandelay Industries", "VAI", "Videlectrix", "VEX", "Virtucon", "VUC", "Water and Power", "WAP", "Wentworth Industries", "WEI", "Wernham Hogg", "WEH", "Western Gas & Electric", "WGE", "Widget Corp", "WCO", "Zevo Toys", "ZET", "ZiffCorp", "ZFC"];
            var t = [];
            var n, r;
            for (var i = 0; i < e.length; i += 2) {
                r = (1e3 * Math.random()).toFixed(2);
                changeRel = (-5 + 10 * Math.random()).toFixed(2);
                t.push({
                    symbol: e[i],
                    company: e[i + 1],
                    price: r,
                    change: (r * (changeRel / 100)).toFixed(2),
                    changeRel: changeRel,
                    volume: Math.floor(Math.random() * 1e5)
                })
            }
            return t
        }(), this._columns, this._options);
        this._container.on("resize", this._resize, this);
        this._container.on("destroy", this._destroy, this);
        this._resize()
    };
    n.prototype._resize = function () {
        this._grid.resizeCanvas();
        this._grid.autosizeColumns()
    };
    n.prototype._destroy = function () {
        this._grid.destroy()
    };
    t.registerComponent("stockGrid", n);
    t.init()
})()