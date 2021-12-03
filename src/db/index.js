const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/travelers-social-network', { useNewUrlParser: true, useUnifiedTopology: true })
.then(ok => console.log('db conectada'))
.catch(err => console.log(err));


