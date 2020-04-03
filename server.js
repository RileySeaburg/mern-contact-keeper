const express = require('express');


const app = express();

app.get('/', (req, res) => res.json({msg: 'This is an API'}));

const PORT = process.env.PORT || 5000;

// Define Routs
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));



app.listen(PORT, () => console.log(`server running on port ${PORT}`));
