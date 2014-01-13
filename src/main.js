var Game           = require('cgame').Game;
var Scene          = require('cgame').Scene;
var FillLayer      = require('cgame').layers.FillLayer;
var DebugLayer     = require('cgame').layers.DebugLayer;
var EntityLayer    = require('cgame').layers.EntityLayer;
var Position       = require('cgame').ecs.components.Position;
var Camera         = require('cgame').ecs.components.Camera;
var TreeMaintainer = require('cgame').ecs.systems.TreeMaintainer;

// Application
var game = global.game = new Game().start();

// ECS layer
var layer = new EntityLayer();
var treeSystem = layer.systemManager.addSystem(TreeMaintainer);

// Create scene
var scene = new Scene();
game.addScene(scene);
scene.addLayer(layer);

// Setup back layer
var background = new FillLayer();
background.zIndex = -10;
background.color = '#080808';
scene.addLayer(background);

// Debug layer
var debug = new DebugLayer();
debug.zIndex = 100;
debug.entityManager = layer.entityManager;
debug.treeSystem = treeSystem;
debug.tree = treeSystem.tree;
scene.addLayer(debug);

// Add a camera
var camera = layer.entityManager.addNewEntity();
camera.addComponent(Camera);
camera.addComponent(Position);
camera.addTag('mainCamera');
camera.Camera.canvas = Game.instance.screen;
camera.Camera.scale = 1;
