describe('Tweetrep', function () {
  beforeEach(module('tweetrep'));

  describe('dataService', function () {
    var $httpBackend;
    var dataService;
    beforeEach(inject(function (_dataService_, _$httpBackend_) {
      dataService = _dataService_;
      $httpBackend = _$httpBackend_;
    }));

    it('should call the right API endpoint and receive tweets from server', function () {
      var tweets = [
        {
          text: "this is a tweet from imdb",
          createdAt: new Date(),
          createdAtDisplay: 'current Date',
          retweetCount: 3,
          favCount: 5,
          media: 'pic.twitter.com/image.jpg'
        }
      ];

      $httpBackend
        .expectGET('/api/timeline/imdb')
        .respond(200, tweets);

      var data = dataService.getTweets('imdb');
      expect(tweets[0].text).to.eql('this is a tweet from imdb');

      $httpBackend.flush();

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();     
    });
  });

  describe('tweetsCtrl', function () {
    var scope;
    beforeEach(inject(function (_$controller_, _$rootScope_) {
      scope = _$rootScope_.$new();
      _$controller_('tweetsCtrl', {$scope: scope});
    }));

    it('should have getTweets function', function () {
      expect(scope.getTweets).to.exist;
    });

    it('should sort tweets by date', function () {
      scope.sortByDate();
      expect(scope.sort).to.eql('-createdAt');
    });

    it('should sort tweets by retweet', function () {
      scope.sortByRetweet();
      expect(scope.sort).to.eql('-retweetCount');
    });

    it('should toggle between all tweets and the ones with picture only', function () {
      scope.picOnly();
      expect(scope.show.value).to.eql(false);
      scope.all();
      expect(scope.show.value).to.eql(true);
    });
  });

});
