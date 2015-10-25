angular.module('starter.controllers', [])

.controller('TeapotCtrl', function($scope) {
})

.directive('teapotView', function() {
  var container, stats;
  var camera, scene, renderer;
  var uniforms;

  function onWindowResize( event ) {
    renderer.setSize(window.innerWidth, window.innerHeight);

    uniforms.resolution.value.x = renderer.domElement.width;
    uniforms.resolution.value.y = renderer.domElement.height;
  }

  //

  function animate() {
    requestAnimationFrame( animate );

    render();
    stats.update();
  }

  function render() {
    uniforms.time.value += 0.05;

    renderer.render( scene, camera );
  }

  return {
    link: function (scope, element, attrs) {
      camera = new THREE.Camera();
      camera.position.z = 1;

      scene = new THREE.Scene();

      var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

      uniforms = {
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() }
      };

      var material = new THREE.ShaderMaterial( {

        uniforms: uniforms,
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent

      } );

      var mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      element.append( renderer.domElement );

      stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.top = '0px';
      element.append( stats.domElement );

      onWindowResize();

      window.addEventListener( 'resize', onWindowResize, false );

      animate();
    }
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
