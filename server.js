const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
app.use(cors());
//Connect DB
connectDB();

//init middleware
app.use(express.json({extended: false}));

app.get('/',(req,res)=> res.send('API Running'));

//Define Routes
app.use('/api/users',require('./routes/api/user'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/jobs',require('./routes/api/job'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`server started on PORT ${PORT}`));