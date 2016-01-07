var appControllers = angular.module('appControllers', []);

appControllers.controller('BoardCtrl',
 ['$rootScope', '$scope', '$localStorage', '$modal', 'stories',
	function($rootScope, $scope, $localStorage, $modal, stories) {

		stories.initialize();
		$scope.stories = $rootScope.$storage.stories;
		$scope.sortedStories = {};

    // ZoomTrello Wiz: set variable for initial loading
    if($rootScope.$storage.wiz == null) {
      $rootScope.$storage.wiz = { value: false };
    }

    if($rootScope.$storage.wiz.value == false) {
      $modal.open({
        templateUrl: 'views/wizard.html',
        controller: 'WizardCtrl',
        size: 'lg',
        backdrop: 'static'
      });
    }

		sortStories = function(boardName) {
			var _boardName = boardName || 'todo';
			$scope.sortedStories[_boardName] = _.filter($scope.stories, function(obj) {
				return obj.status == _boardName;
			});
		}

		createOptions = function(boardName) {
  		var _boardName = boardName || 'todo';
    	var options = {
      	placeholder: 'alert',
      	connectWith: '.story-container',
        'ui-floating': true, 
      	items: $scope.sortedStories[_boardName],
      	update: function(event, ui) {
      		ui.item.sortable.model.status = _boardName;
				},
				stop: function(event, ui) {					
					ui.item.sortable.model.rank = ui.item.sortable.index - 1;
      		
          var _cnt = ui.item.sortable.model.rank;
          while (_cnt < $scope.sortedStories[_boardName].length && _cnt >= 0) {
      			var rankCnt = _cnt;
          	$scope.sortedStories[_boardName][_cnt++].rank = rankCnt;
      		}
				}
    	};
    	return options;
  	}

		$scope.addStory = function(status, rank) {
			var story = {
				title: status +  rank,
				content: "ZoomTrello Description is also SEARCHABLE.",
				color: 'white'
			};

			story.rank = rank || 0;
			story.status = status || 'todo';

			$scope.sortedStories[status].push(story);
			stories.add(story);
		}

		$scope.clearBoard = function(status) {
			if(status == undefined || status == null) {
				return;
			}

      var clearedStories = $scope.sortedStories[status];
      $scope.sortedStories[status] = [];
  		_.each(clearedStories, function(story) {
  			$scope.trashStory(story);
  		});
  	}

  	$scope.trashStory = function(story, oldStatus) {
			if(story == undefined || story == null) {
				return;
			}
     
      story.status = 'deleted';
	    $scope.sortedStories['deleted'].push(story);
      sortStories(oldStatus);
    }

		$scope.removeStory = function(story) {
			if(story == undefined || story ==  null) {
				return;
			}
			$scope.sortedStories['deleted'].pop(story);
			stories.remove(story);
    };

    $scope.sortableStories = [createOptions('todo'), createOptions('doing'), createOptions('done')];

  	sortStories('todo');
  	sortStories('doing')
  	sortStories('done');
	}
]);