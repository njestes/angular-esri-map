angular.module('esri-map-docs')
    .controller('SceneViewCtrl', function(esriLoader) {
        var self = this;
        // load esri modules
        esriLoader.require([
            'esri/Map',
            'esri/layers/ArcGISTiledLayer'
        ], function(
            Map, ArcGISTiledLayer
        ) {

            // add layers to the map
            var transportationLyr = new ArcGISTiledLayer({
                url: '//server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer',
                id: 'streets'
            });
            var popLyr = new ArcGISTiledLayer({
                url: '//services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_by_Sex/MapServer',
                id: 'male-population',
                opacity: 0.7
            });
            self.map = new Map({
                basemap: 'dark-gray',
                layers: [popLyr]
            });
            self.map.add(transportationLyr);

            // zoom to the population layer on load
            self.onViewCreated = function(view) {
                popLyr.then(function() {
                    view.animateTo(popLyr.initialExtent);
                });
            };

            // toggle transportation layer based on user click
            self.onStreetsToggle = function(e) {
                transportationLyr.visible = !!e.currentTarget.checked;
            };
        });
    });
