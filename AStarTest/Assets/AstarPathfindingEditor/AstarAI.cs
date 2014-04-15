using UnityEngine;
using System.Collections;
//Note this line, if it is left out, the script won't know that the class 'Path' exists and it will throw compiler errors
//This line should always be present at the top of scripts which use %Pathfinding
using Pathfinding;

public class AstarAI : MonoBehaviour 
{
	//The point to move to
	public Vector3 targetPosition;

	//Get a reference to the Seeker component we added earlier
	private Seeker seeker;
	private CharacterController controller;

	//The calculated path
	public Path path;

	//The AI's speed per second
	public float speed = 500;

	//The max distance from the AI to a waypoint for it to continue to the next waypoint
	public float nextWaypointDistance = 3;

	//The waypoint we are currently moving towards
	private int currentWaypoint = 0;

	public void Start () 
	{
		seeker = GetComponent<Seeker>();
		controller = GetComponent<CharacterController>();
	}
	
	public void OnPathComplete (Path p) 
	{
		Debug.Log ("Yey, we got a path back. Did it have an error? "+p.error);
		if(!p.error)
		{
			path = p;
			//Reset the waypoint counter
			currentWaypoint = 0;
		}
	}

	public void FixedUpdate ()
	{
		if (Input.GetMouseButtonDown(0))
		{
			Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
			RaycastHit hit;
			// Casts the ray and get the first game object hit
			Physics.Raycast(ray, out hit);
			Debug.Log("This hit at " + hit.point );
			targetPosition = hit.point;
			seeker.StartPath (transform.position,targetPosition, OnPathComplete);
		}

		if(path == null)
		{
			//We have no path to move after yet
			return;
		}

		if(currentWaypoint >= path.vectorPath.Count)
		{
			//We made it to the end of the path
			Debug.Log("End of Path Reached");
			return;
		}

		//Direction to the next waypoint
		Vector3 dir = (path.vectorPath[currentWaypoint]-transform.position).normalized;
		//calculate how fast to move to the waypoint
		dir *= speed * Time.fixedDeltaTime;
		//move towards the next waypoint
		controller.SimpleMove (dir);
		
		//Check if we are close enough to the next waypoint
		//If we are, proceed to follow the next waypoint
		if (Vector3.Distance (transform.position,path.vectorPath[currentWaypoint]) < nextWaypointDistance) {
			currentWaypoint++;
			return;
		}
	}
} 