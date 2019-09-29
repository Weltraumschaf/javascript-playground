#!/usr/bin/env bash

set -eu

playgoundName="${1:-}"
usage="${0} <playgroundName>"

if [ "${playgoundName}" = "" ]; then
    echo "No playground name given!"
    echo "${usage}"
    exit 1
fi

if [ "${PROJECT_DIR}" = "" ]; then
    echo "No PROJECT_DIR var exported!"
    echo "Source the .envrc file."
    exit 1
fi

playgroundDir="${PROJECT_DIR}/${playgoundName}"
if [ -d "${playgroundDir}" ]; then
    echo "There is already a playground in ${playgroundDir}!"
    exit 2;
fi

mkdir -p "${playgroundDir}"

cat << EOF > "${playgroundDir}/README.md"
# ${playgoundName}
EOF

cat << EOF > "${playgroundDir}/main.css"
#canvas {
    background: #fefefe;
    border: thin solid lightgray;
    -webkit-box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
}
EOF

cat << EOF > "${playgroundDir}/main.js"
(function(global) {

}(window));
EOF

cat << EOF > "${playgroundDir}/index.html"
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>${playgoundName}</title>
        <link rel="stylesheet" type="text/css" href="main.css"/>
    </head>
    <body>
        <canvas id="canvas"></canvas>
        <script src="main.js"></script>
    </body>
</html>
EOF
