***Welcome to the ASSETS folder for Office Dolphin***
@Author: Ben Rumptz
@Date:	 3/27/14

To use this zip folder, unzip all contents to the assets folder of your project. Everything that needs hit detection from movement should be placed into the AstarPathfindingEditor folder. (DO NOT include this README file)

Contents:
	-Plugins folder for movement **DO NOT EDIT**
	-AstarPathfindingEditor folder for movement scripts and collision handling
		*%PathfindingTest.scene	--- The scene containing the intro office
		*dolphinPlayer.blend	--- dolphin model with movement script applied (needs a bit of work)
		*office.blend 		--- Office model that the player can move around in by point/click
		*AstarAI.cs		--- Our players movement script
		*GameObject.prefab	--- The grid that the player uses to move around int (DO NOT EDIT without thumbs up from @Author)
		*Red.mat		--- Red color that was used for movement testing
		*Astar.prefab		--- Object that is used for testing any changes to AstarAI.cs or the components attached to dolphinPlayer.blend
		*Editor			--- Used for movement scripts (DO NOT EDIT)
		*Materials		--- Materials used for office.blend and dolphinPlayer.blend