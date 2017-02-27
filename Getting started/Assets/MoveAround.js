import CnControls;
var speed: float = 8.0;
var rotateSpeed: float = 3.0;
var gravity: float = 20.0;
var jumpSpeed: float;
var moveDirection: Vector3 = Vector3.zero;
var bounce: Vector3 = Vector3.zero;
var v;
var flag = false;
function Update () {
    var controller: CharacterController = GetComponent(CharacterController);
    // Rotate around y - axis
    /*transform.Rotate(0, CnControls.CnInputManager.GetAxis("Horizontal") * rotateSpeed, 0);
 
    // Move forward / backward
    var forward: Vector3 = transform.TransformDirection(Vector3.forward);
    var curSpeed: float = speed * CnControls.CnInputManager.GetAxis ("Vertical");
    controller.Move(forward * curSpeed);*/
    /*var currentSpeed = speed * CnControls.CnInputManager.GetAxis("Vertical");
    var moveDirection: Vector3 = Vector3.zero;
    moveDirection = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
   // moveDirection = new Vector3(-3.4, y, -10.97);
    moveDirection = transform.TransformDirection(moveDirection);
    //moveDirection *= currentSpeed;
    controller.SimpleMove(moveDirection);*/

    if (controller.isGrounded) {
        if (bounce.sqrMagnitude > 0) {
            moveDirection = bounce;
            bounce = Vector3.zero;
        } else {
            moveDirection = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
            moveDirection = transform.TransformDirection(moveDirection);
            moveDirection *= speed;
        }
 
        if (Input.GetButton("Jump"))
            moveDirection.y = jumpSpeed;
    } else {
        moveDirection = Vector3(Input.GetAxis("Horizontal"), moveDirection.y, Input.GetAxis("Vertical"));
        moveDirection = transform.TransformDirection(moveDirection);
        moveDirection.x *= speed;
        moveDirection.z *= speed;
    }
 
    moveDirection.y -= gravity * Time.deltaTime;
    controller.Move(moveDirection * Time.deltaTime);
}

function OnControllerColliderHit(hit) {
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