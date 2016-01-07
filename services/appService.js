var appServices = angular.module('appServices', ['ngStorage']);

appServices.factory('stories', ['$rootScope', '$localStorage',
	function($rootScope, $localStorage) {
		var s = {
			stories: [
				{
					title: 'Todo #1',
					content: 'This is a sample todo story description.',
					color: 'white',
					status: 'todo',
					rank: 0
				},
				{
					title: 'Doing #2',
					content: 'This is a sample in progress story description.',
					color: 'red',
					status: 'doing',
					rank: 0
				},
				{
					title: 'Done #3',
					content: 'This is a sample done story description.',
					color: 'green',
					status: 'done',
					rank: 0
				}
			],
			initialize: function() {
				// Only initialize if there is no data in local storage
				$rootScope.$storage = $localStorage;
				if($rootScope.$storage.stories == undefined) {
					$rootScope.$storage.stories = [];
					//$rootScope.$storage.stories = this.stories;
				}
			},
			add: function(story) {
				if(story == undefined || story == null) {
					return;
				}
				
				$rootScope.$storage.stories.push(story);
			},
			remove: function(story) {
				if(story == undefined || story == null) {
					return;
				}

				var idx = $rootScope.$storage.stories.indexOf(story);
				$rootScope.$storage.stories.splice(idx, 1);
			}
		};
		return s;
	}
]);