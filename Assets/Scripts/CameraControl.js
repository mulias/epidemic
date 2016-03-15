var minSize: float = 6f;
var maxSize: float = 15f;
var zoomSpeed: float = 10f;
public var size : float;
var moveSpeed : float = 5f;

function Update () {
  size = Camera.main.orthographicSize;
  size += Input.GetAxis("Mouse ScrollWheel") * zoomSpeed;
  size = Mathf.Clamp(size, minSize, maxSize);
  Camera.main.orthographicSize = size;

  if(Input.GetKey(KeyCode.RightArrow)) {
    transform.Translate(new Vector3(moveSpeed*Time.deltaTime, 0, 0));
  }
  if(Input.GetKey(KeyCode.LeftArrow)) {
    transform.Translate(new Vector3(-moveSpeed*Time.deltaTime, 0, 0));
  }
  if(Input.GetKey(KeyCode.DownArrow)) {
    transform.Translate(new Vector3(0, -moveSpeed*Time.deltaTime, 0));
  }
  if(Input.GetKey(KeyCode.UpArrow)) {
    transform.Translate(new Vector3(0, moveSpeed*Time.deltaTime, 0));
  }
}