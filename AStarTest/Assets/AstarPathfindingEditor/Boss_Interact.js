#pragma strict
var textString = "";
var toolTipText = "";
var customGuiStyle : GUIStyle;

function Start () {
}

function Update () {
	var hit1 : RaycastHit;
	var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	if(Physics.Raycast(ray, hit1, 100.0))
	{
		Debug.Log("Door touch at " + hit1.point);
		//Input for door
		if(hit1.transform.tag  == "Interactable Object" && Input.GetMouseButtonDown(0))
		{
			textString = "You walk through the door...";
			Application.LoadLevel("%PathfindingTest");
			return;
		}
		else if (hit1.transform.tag  == "Interactable Object")
		{
			toolTipText = "The Boss's extremely large door";
		}
		else if (hit1.transform.tag  == "BossDesk")
		{
			toolTipText = "The Boss's overly large desk...";
		}
		else if (hit1.transform.tag  == "BossChair")
		{
			toolTipText = "This chair is far to big for your boss...";
		}
		else if (hit1.transform.tag  == "BossPainting")
		{
			toolTipText = "A boring piece of modern art titled 'Red'...";
		}
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

function highlightOn ()
{
	print("hi");

}
	
function highlightOff ()
{
	print("bye");
	
}


function OnGUI () {
	// Make a background box
	GUI.Box (Rect (10,10,100,90), textString, customGuiStyle);
	GUI.Label (Rect (10,50,100,40), GUIContent(toolTipText), customGuiStyle);
	//GUILayout.Button(textString, GUIStyle);
}