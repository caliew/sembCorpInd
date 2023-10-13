const express = require('express');
const fs = required('fs');

const app = express();

app.use((req,res,next) => {
    //
    if (req.method === 'OPTIONS'){
        console.log('OPTIONS...');
    }
    next();
})

app.get('/',(req,res)=>{
    res.send('HELLO');
    res.end();

});

app.listen(6000,()=>{
    console.log('SERVER IS READY...')
})