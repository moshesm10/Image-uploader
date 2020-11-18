<?php
    // get uploaded image
    $img = $_FILES['image'];
    $cfile = new CURLFile ($img['tmp_name'],$img['type'],$img['type']['name']);

    // create request
    $url = 'https://api.imgbb.com/1/upload';
    $header = array('Content-Type: multipart/form-data');
    $fields = array(
        'image' => $cfile,
        'key' => '228016febf92b2eb2a242fb2e50adbc5',
    );

    $resource = curl_init();
    curl_setopt($resource, CURLOPT_URL, $url);
    curl_setopt($resource, CURLOPT_HTTPHEADER, $header);
    curl_setopt($resource, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($resource, CURLOPT_POST, 1);
    curl_setopt($resource, CURLOPT_POSTFIELDS, $fields);
    $result = curl_exec($resource);
    curl_close($resource);

    // return answer from server
    echo $result;
?>