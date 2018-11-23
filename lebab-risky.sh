for file in $(find src/main/ -name "*.js"); do
	echo Transforming $file
    echo -e ' \t let'
    lebab $file -o $file --transform let
    echo -e ' \t class'
    lebab $file -o $file --transform class
    echo -e ' \t commonjs'
    lebab $file -o $file --transform commonjs
    echo -e ' \t default-param'
    lebab $file -o $file --transform default-param
    echo -e ' \t destruct-param'
    lebab $file -o $file --transform destruct-param
    echo -e ' \t includes'
    lebab $file -o $file --transform includes

done
