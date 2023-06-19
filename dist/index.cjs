'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chart_js = require('chart.js');
var vue = require('vue');

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _defineProperty$1(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _objectSpread$1(target) {
    var _loop = function _loop(i) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty$1(target, key, source[key]);
        });
    };
    for(var i = 1; i < arguments.length; i++)_loop(i);
    return target;
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
var ChartEmits;
(function(ChartEmits) {
    ChartEmits["ChartRendered"] = "chart:rendered";
    ChartEmits["ChartUpdated"] = "chart:updated";
    ChartEmits["ChartDestroyed"] = "chart:destroyed";
    ChartEmits["LabelsUpdated"] = "labels:updated";
})(ChartEmits || (ChartEmits = {}));
function chartCreate(createChartFunction, chartData, chartOptions, context) {
    createChartFunction(chartData, chartOptions);
    if (context !== undefined) {
        context.emit(ChartEmits.ChartRendered);
    }
}
function chartUpdate(chart, context) {
    chart.update();
    if (context !== undefined) {
        context.emit(ChartEmits.ChartUpdated);
    }
}
function chartDestroy(chart, context) {
    chart.destroy();
    if (context !== undefined) {
        context.emit(ChartEmits.ChartDestroyed);
    }
}
function getChartData(data, datasetIdKey) {
    var nextData = {
        labels: typeof data.labels === "undefined" ? [] : _toConsumableArray(data.labels),
        datasets: []
    };
    setChartDatasets(nextData, _objectSpread$1({}, data), datasetIdKey);
    return nextData;
}
function setChartDatasets(oldData, newData, datasetIdKey) {
    var addedDatasets = [];
    oldData.datasets = newData.datasets.map(function(nextDataset) {
        // given the new set, find it's current match
        var currentDataset = oldData.datasets.find(function(dataset) {
            return dataset[datasetIdKey] === nextDataset[datasetIdKey];
        });
        // There is no original to update, so simply add new one
        if (!currentDataset || !nextDataset.data || addedDatasets.includes(currentDataset)) {
            return _objectSpread$1({}, nextDataset);
        }
        addedDatasets.push(currentDataset);
        Object.assign(currentDataset, nextDataset);
        return currentDataset;
    });
}
function setChartLabels(chart, labels, context) {
    chart.data.labels = labels;
    if (context !== undefined) {
        context.emit(ChartEmits.LabelsUpdated);
    }
}
function setChartOptions(chart, options) {
    chart.options = _objectSpread$1({}, options);
}
function compareData(newData, oldData) {
    // Get new and old DataSet Labels
    var newDatasetLabels = newData.datasets.map(function(dataset) {
        return dataset.label;
    });
    var oldDatasetLabels = oldData.datasets.map(function(dataset) {
        return dataset.label;
    });
    // Check if Labels are equal and if dataset length is equal
    return oldData.datasets.length === newData.datasets.length && newDatasetLabels.every(function(value, index) {
        return value === oldDatasetLabels[index];
    });
}
var templateError = "Please remove the <template></template> tags from your chart component. See https://vue-chartjs.org/guide/#vue-single-file-components";
var chartUpdateError = "Update ERROR: chart instance not found";
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread(target) {
    var _loop = function _loop(i) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    };
    for(var i = 1; i < arguments.length; i++)_loop(i);
    return target;
}
var generateChart = function generateChart(chartId, chartType, chartController) {
    return vue.defineComponent({
        props: {
            chartData: {
                type: Object,
                required: true
            },
            chartOptions: {
                type: Object,
                "default": function _default() {}
            },
            datasetIdKey: {
                type: String,
                "default": "label"
            },
            chartId: {
                type: String,
                "default": chartId
            },
            width: {
                type: Number,
                "default": 400
            },
            height: {
                type: Number,
                "default": 400
            },
            cssClasses: {
                type: String,
                "default": ""
            },
            styles: {
                type: Object,
                "default": function _default() {}
            },
            plugins: {
                type: Array,
                "default": function _default() {
                    return [];
                }
            }
        },
        setup: function setup(props, context) {
            var renderChart = function renderChart(data, options) {
                if (_chart.value !== null) {
                    chartDestroy(vue.toRaw(_chart.value), context);
                }
                if (canvasEl.value === null) {
                    throw new Error(templateError);
                } else {
                    var chartData = getChartData(data, props.datasetIdKey);
                    var canvasEl2DContext = canvasEl.value.getContext("2d");
                    if (canvasEl2DContext !== null) {
                        _chart.value = new chart_js.Chart(canvasEl2DContext, {
                            type: chartType,
                            data: vue.isProxy(data) ? new Proxy(chartData, {}) : chartData,
                            options: options,
                            plugins: props.plugins
                        });
                    }
                }
            };
            var chartDataHandler = function chartDataHandler(newValue, oldValue) {
                var newData = vue.isProxy(newValue) ? vue.toRaw(newValue) : _objectSpread({}, newValue);
                var oldData = vue.isProxy(oldValue) ? vue.toRaw(oldValue) : _objectSpread({}, oldValue);
                if (Object.keys(oldData).length > 0) {
                    var chart = vue.toRaw(_chart.value);
                    var isEqualLabelsAndDatasetsLength = compareData(newData, oldData);
                    if (isEqualLabelsAndDatasetsLength && chart !== null) {
                        setChartDatasets(chart === null || chart === void 0 ? void 0 : chart.data, newData, props.datasetIdKey);
                        if (newData.labels !== undefined) {
                            setChartLabels(chart, newData.labels, context);
                        }
                        updateChart();
                    } else {
                        if (chart !== null) {
                            chartDestroy(chart, context);
                        }
                        chartCreate(renderChart, props.chartData, props.chartOptions, context);
                    }
                } else {
                    if (_chart.value !== null) {
                        chartDestroy(vue.toRaw(_chart.value), context);
                    }
                    chartCreate(renderChart, props.chartData, props.chartOptions, context);
                }
            };
            var chartOptionsHandler = function chartOptionsHandler(options) {
                var chart = vue.toRaw(_chart.value);
                if (chart !== null) {
                    setChartOptions(chart, options);
                    updateChart();
                } else {
                    chartCreate(renderChart, props.chartData, props.chartOptions, context);
                }
            };
            var updateChart = function updateChart() {
                var chart = vue.toRaw(_chart.value);
                if (chart !== null) {
                    chartUpdate(chart, context);
                } else {
                    console.error(chartUpdateError);
                }
            };
            chart_js.Chart.register(chartController);
            var _chart = vue.shallowRef(null);
            var canvasEl = vue.ref(null);
            vue.watch(function() {
                return props.chartData;
            }, function(newValue, oldValue) {
                return chartDataHandler(newValue, oldValue);
            }, {
                deep: true
            });
            vue.watch(function() {
                return props.chartOptions;
            }, function(newValue) {
                return chartOptionsHandler(newValue);
            }, {
                deep: true
            });
            vue.onMounted(function() {
                if ("datasets" in props.chartData && props.chartData.datasets.length > 0) {
                    chartCreate(renderChart, props.chartData, props.chartOptions, context);
                }
            });
            vue.onBeforeUnmount(function() {
                if (_chart.value !== null) {
                    chartDestroy(vue.toRaw(_chart.value), context);
                }
            });
            context.expose({
                chart: _chart,
                updateChart: updateChart
            });
            return function() {
                return vue.h("div", {
                    style: props.styles,
                    "class": props.cssClasses
                }, [
                    vue.h("canvas", {
                        id: props.chartId,
                        width: props.width,
                        height: props.height,
                        ref: canvasEl
                    })
                ]);
            };
        }
    });
};
var Bar = /* #__PURE__ */ generateChart("bar-chart", "bar", chart_js.BarController);
var Doughnut = /* #__PURE__ */ generateChart("doughnut-chart", "doughnut", chart_js.DoughnutController);
var Line = /* #__PURE__ */ generateChart("line-chart", "line", chart_js.LineController);
var Pie = /* #__PURE__ */ generateChart("pie-chart", "pie", chart_js.PieController);
var PolarArea = /* #__PURE__ */ generateChart("polar-chart", "polarArea", chart_js.PolarAreaController);
var Radar = /* #__PURE__ */ generateChart("radar-chart", "radar", chart_js.RadarController);
var Bubble = /* #__PURE__ */ generateChart("bubble-chart", "bubble", chart_js.BubbleController);
var Scatter = /* #__PURE__ */ generateChart("scatter-chart", "scatter", chart_js.ScatterController);

exports.Bar = Bar;
exports.Bubble = Bubble;
exports.Doughnut = Doughnut;
exports.Line = Line;
exports.Pie = Pie;
exports.PolarArea = PolarArea;
exports.Radar = Radar;
exports.Scatter = Scatter;
exports.generateChart = generateChart;
//# sourceMappingURL=index.cjs.map
