#pragma strict
var textString = "";
var toolTipText = "";
var customGuiStyle : GUIStyle;
var CopyMachineFixed = false;
var CMForDummiesRead = false;
var CopiedDocuments = false;
var MadeCoffee = false;
var ItemsToSecratary = false;
var LateWorkDone = 0;
var DayCount = 0;
//Day 2 variables
var GotDirt = false;
var GotWater = false;
var GotPaper = false;
var HaveCoffee = false;
var copyBroken = 0;

function Start () 
	{
		//Only want to set these variables at the start and then never again.
		//Day 1 variables
		CopyMachineFixed = false;
		CMForDummiesRead = false;
		CopiedDocuments = false;
		MadeCoffee = false;
		ItemsToSecratary = false;
		LateWorkDone = 0;
		DayCount = 1;
		//Day 2 variables
		GotDirt = false;
		GotWater = false;
		GotPaper = false;
		HaveCoffee = false;
	}

function Update () {
	var hit : RaycastHit;
	var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	
	//Raycast to determine which object the mouse is over.
	if(Physics.Raycast(ray, hit, 100.0) && DayCount == 1)
	//Day 1
	{//Inteaction with the door
		if(hit.transform.tag  == "Door" && Input.GetMouseButtonDown(0))
		{
			textString = "The door to the Boss' office is unlocked... For now...";
			Application.LoadLevel("BossRoom");
			return;
			
		}
		else if (hit.transform.tag  == "Door")
		{
			toolTipText = "The Boss has a very large door";
		}
		
		//Interaction with the door in the break room
		else if(hit.transform.tag == "Interactable Object" && Input.GetMouseButtonDown(0))
		{
			textString = "You continue to the main lobby...";
			Application.LoadLevel("%PathfindingTest");
			return;
		}
		else if(hit.transform.tag == "Interactable Object")
		{
			toolTipText = "The Door to the main lobby...";
		}
		
		//Interaction to get into the break room
		else if(hit.transform.tag == "BreakRoomDoor" && Input.GetMouseButtonDown(0))
		{
			textString = "You waddle into the the break room...";
			Application.LoadLevel("BreakRoom");
			return;
		}
		else if(hit.transform.tag == "BreakRoomDoor")
		{
			toolTipText = "The door to the break room...";
		}
		
		//Look at this WaterCooler
		else if (hit.transform.tag  == "WaterCooler")
		{
			toolTipText = "This is a nice Water Cooler. I like this water cooler...";
		}
		
		//Interaction with the copy machine
		else if (hit.transform.tag  == "CopyMachine" && Input.GetMouseButtonDown(0))
		{
			textString = "The office copy machine";
			if(CopyMachineFixed == true && CopiedDocuments == false)
			{
				//!!!Add copied documents to inventory!!!
				toolTipText = "The documents are now copied, I should probably head back to the secretary...";
				CopiedDocuments = true;
			}
			if(CMForDummiesRead == true && CopyMachineFixed == false)
			{
				copyBroken = 1;
			}
			if (copyBroken == 1)
			{
				CopyMachineFixed = true;
			}
		}
		else if (hit.transform.tag  == "CopyMachine")
		{
			if(CopyMachineFixed == true)
			{
				toolTipText = "The copy machine is ready to make copies";
			}
			else if(CMForDummiesRead == true)
			{
				toolTipText = "The copy machine's power cable is unplugged";
			}
			else
			{
				toolTipText = "The copy machine is broken";
			}
		}
				
		//Interaction with Copy Machine for dummies
		else if (hit.transform.tag  == "CMForDummies" && Input.GetMouseButtonDown(0))
		{
			textString = "Step 1: Plug in power cable";
			if(CMForDummiesRead == false)
			{
				CMForDummiesRead = true;
			}
		}
		else if (hit.transform.tag  == "CMForDummies")
		{
			toolTipText = "A book titled Copy Machines for Dummies'";
		}
		
		//Interaction with the bookshelf
		else if (hit.transform.tag  == "Bookshelf")
		{
			textString = "This bookshelf may have a useful book";
			CMForDummiesRead = true;
		}
		
		//Interactions with the coffee maker
		else if (hit.transform.tag  == "CoffeeMaker")
		{
			if(MadeCoffee == false)
			{
				toolTipText = "I should make some coffee for the boss";
			}
			else if(MadeCoffee == true)
			{
				toolTipText = "I already made coffee for the boss";
			}
			else
			{
				toolTipText = "That's a nice coffee maker";
			}
		}
		else if (hit.transform.tag  == "CoffeeMaker" && Input.GetMouseButtonDown(0))
		{
			textString = "The office coffee machine";
			if(MadeCoffee == false && CopyMachineFixed == true)
			{
				//!!!Add Coffee to the inventory!!!
				MadeCoffee = true;
			}
		}
		
		else if (hit.transform.tag  == "SecrataryDesk" && Input.GetMouseButtonDown(0))
		{
			textString = "Ms. Susie Secretary";
			if(MadeCoffee == true && CopiedDocuments == true && ItemsToSecratary == false)
			{
				ItemsToSecratary = true;
			}
		}
		else if(hit.transform.tag  == "SecrataryDesk")
		{
			if(ItemsToSecratary == false)
			{
				toolTipText = "I need to copy the documents and get coffee to the secretary";
			}
			else
			{
				toolTipText = "The Boss' secretary's desk";
			}
		}
		
		//If the late night bonus mission is chosen you click the work 10 tines to finish it.
		else if (hit.transform.tag  == "LateWork" && Input.GetMouseButtonDown(0))
		{
			if(LateWorkDone == 0)
			{
				textString = "This shouldn't take too long...";
				LateWorkDone++;
			}
			else if(LateWorkDone > 0 && LateWorkDone <= 5)
			{
				textString = "This is a lot of work";
				LateWorkDone++;
			}
			else if(LateWorkDone > 5 && LateWorkDone <= 9)
			{
				textString = "Almost finsihed with this work";
				LateWorkDone++;
			}
			else
			{
				textString = "All finished";
				DayCount++;
				//What about if the late mission isnt chosen?
			}
		}
		else if(hit.transform.tag  == "LateWork")
		{
			if(LateWorkDone < 10)
			{
				toolTipText = "I need to get this work done";
			}
			else
			{
				toolTipText = "I finished the work";
			}
		}
		
		//Else if you click off and object or are not hovering over anything then the text goes blank.
		else if (Input.GetMouseButtonDown(0))
		{
			textString = "";
		}
		else
		{		
			toolTipText = "";
		}
		
	}
	
	if(Physics.Raycast(ray, hit, 100.0) && DayCount == 2)
	//Day 2
	{
		if (hit.transform.tag  == "CoffeeMaker" && Input.GetMouseButtonDown(0))
		{
			textString = "No coffee for the Boss from you today! -Nemesis";
			if(GotDirt == true && GotWater == true && GotPaper == true)
			{
				//!!!Add coffee to inventory
			}
		}
		else if (hit.transform.tag  == "CoffeeMaker")
		{
			if(GotDirt == true && GotWater == true && GotPaper == true)
			{
				toolTipText = "I can make the Boss some coffee. I hope it tastes alright";
			}
			else
			{
				toolTipText = "The coffee grounds, filter, and water are missing";
			}
		}
		
		//Intereactions with the paper
		else if (hit.transform.tag  == "Paper" && Input.GetMouseButtonDown(0))
		{
			//!!!Add paper to inventory
			GotPaper = true;

		}
		else if (hit.transform.tag  == "Paper")
		{
			toolTipText = "Here is some paper I can use for a coffee filter";
		}
		
		//Intereactions with the potted plant
		else if (hit.transform.tag  == "PottedPlant" && Input.GetMouseButtonDown(0))
		{
			//!!!Add dirt to inventory
			GotDirt = true;
		}
		else if (hit.transform.tag  == "PottedPlant")
		{
			toolTipText = "This dirt looks a lot like coffee grounds";
		}
		
		else if (hit.transform.tag  == "WaterCooler" && Input.GetMouseButtonDown(0))
		{
			//!!!Add water to inventory
			GotWater = true;
		}
		
		//Intereactions with the water cooler
		else if (hit.transform.tag  == "WaterCooler")
		{
			toolTipText = "Here is some water I can use";
		}
		
		else if (hit.transform.tag  == "SecrataryDesk" && Input.GetMouseButtonDown(0))
		{
			textString = "Ms. Susie Secretary";
			if(HaveCoffee == true)
			{
				//!!!Give coffee to secratary. Boss comes out to tell you how great your coffee is.
			}
		}
		
		//Interactions with the secratary
		else if(hit.transform.tag  == "SecrataryDesk")
		{
			if(HaveCoffee == false)
			{
				toolTipText = "I need to get the Boss some coffee";
			}
			else
			{
				toolTipText = "The Boss' secretary's desk";
			}
		}
		
		//Else if you click off and object or are not hovering over anything then the text goes blank.
		else if (Input.GetMouseButtonDown(0))
		{
			textString = "";
		}
		else
		{		
			toolTipText = "";
		}
	
	}
	
}


function OnGUI () {
	// Make a background box
	GUI.Box (Rect (10,10,100,90), textString, customGuiStyle);
	GUI.Label (Rect (10,50,100,40), GUIContent(toolTipText), customGuiStyle);
	//GUILayout.Button(textString, GUIStyle);
}