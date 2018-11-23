for file in $(find src/main/ -name "*.js"); do
	echo Transforming $file
    echo -e ' \t arrow '
    lebab $file -o $file --transform arrow
    echo -e ' \t arrow-return'
    lebab $file -o $file --transform arrow-return
    echo -e ' \t for-of'
    lebab $file -o $file --transform for-of
    echo -e ' \t for-each'
    lebab $file -o $file --transform for-each
    echo -e ' \t arg-rest'
    lebab $file -o $file --transform arg-rest
    echo -e ' \t arg-spread'
    lebab $file -o $file --transform arg-spread
    echo -e ' \t obj-method'
    lebab $file -o $file --transform obj-method
    echo -e ' \t obj-shorthand'
    lebab $file -o $file --transform obj-shorthand
    echo -e ' \t no-strict'
    lebab $file -o $file --transform no-strict
    echo -e ' \t exponent'
    lebab $file -o $file --transform exponent
    echo -e ' \t multi-var'
    lebab $file -o $file --transform multi-var
done
