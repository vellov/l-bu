import CnControls;
var speed: float = 8.0;
var rotateSpeed: float = 3.0;
var gravity: float = 20.0;
var jumpSpeed: float;
var moveDirection: Vector3 = Vector3.zero;
var bounce: Vector3 = Vector3.zero;
var v;
var flag = false;
private var isTouchDevice: boolean = false; 

function Awake() {
	if(Application.platform == RuntimePlatform.IPhonePlayer) {
		isTouchDevice = true;
	} else {
		isTouchDevice = false;
	}
}

function Update () {
    var controller: CharacterController = GetComponent(CharacterController);

	var x = isTouchDevice ? Input.acceleration.x : Input.GetAxis("Horizontal");
	var z = isTouchDevice ? -Input.acceleration.z : Input.GetAxis("Vertical");

    if (controller.isGrounded) {
        if (bounce.sqrMagnitude > 0) {
            moveDirection = bounce;
            bounce = Vector3.zero;
        } else {
            moveDirection = new Vector3(x, 0, z);
            moveDirection = transform.TransformDirection(moveDirection);
            moveDirection *= speed;
        }
 
        if (Input.GetButton("Jump"))
            moveDirection.y = jumpSpeed;
    } else {
        moveDirection = Vector3(x, moveDirection.y, z);
        moveDirection = transform.TransformDirection(moveDirection);
        moveDirection.x *= speed;
        moveDirection.z *= speed;
    }
 
    moveDirection.y -= gravity * Time.deltaTime;
    controller.Move(moveDirection * Time.deltaTime);
}

function OnControllerColliderHit(hit: ControllerColliderHit) {
    var body = hit.collider.attachedRigidbody;
    if ((body == null || body.isKinematic)) {
        
        if(!flag) {
            v = hit.controller.velocity;
            flag = true;
        }
        var n: Vector3 = hit.normal;
        var vn: Vector3 = Vector3.Dot(v,n) * n;

        bounce = -(vn);
    }
}

@script RequireComponent(CharacterController)