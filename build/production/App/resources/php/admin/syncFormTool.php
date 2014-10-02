<?session_start();
require_once("../db_connect.php");
require_once("../include.php");

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);
$userid = $_SESSION['userid'];

switch ($act) {
    case 'read':
        $sql = "select *
		        from `tool` u";
        try {
            $res = $mysqli->query($sql);
            $list=array();
            while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
                foreach ($row as $k => $v)
                    $arr[$k]= $v;
                array_push($list, $arr);
            }
        } catch (Exception $e) {
            $success = false;
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        echo json_encode($list);
        break;
    case 'update':
        foreach ($data as $k=>$row) {
            $values .= $k." = $row,";
        }
        _log($mysqli, $userid, 18, 'Изменение: '.$values);
        $values .= "toolid = toolid";
        $sql = "update `tool`
                    set ".$values;
        $res = $mysqli->query($sql);

        break;
    default:
        echo "default";
};

if ($mysqli)
    $mysqli->close();

?>
