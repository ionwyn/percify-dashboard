for file in $(find src/main/ -name "*.js"); do
	echo Transforming $file
    echo -e ' \t arrow '
    lebab $file -o $file --transform arrow
    echo -e ' \t arrow-return'
    lebab $file -o $file --transform arrow-return
    echo -e ' \t for-each'
    lebab $file -o $file --transform for-each
    echo -e ' \t arg-rest'
    lebab $file -o $file --transform arg-rest
    echo -e ' \t obj-method'
    lebab $file -o $file --transform obj-method
    echo -e ' \t obj-shorthand'
    lebab $file -o $file --transform obj-shorthand
    echo -e ' \t multi-var'
    lebab $file -o $file --transform multi-var
done
