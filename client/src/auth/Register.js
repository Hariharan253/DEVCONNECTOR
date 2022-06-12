import React, {Fragment, useState} from "react";
import axios from 'axios';
const Register = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:'',        
    });
    const {name, email, password, password2} = formData;
    const onChange = e => setFormData({...formData,[e.target.name]: e.target.value});

    const onSubmit = async e =>{
        e.preventDefault();

        if(password !== password2){
            console.log('Password Incorrect');            
        }
        else{
            const newUser = {
                name,
                email,
                password
            };

            
            try {
                const config = {
                headers:{
                'Content-Type': 'application/json'
                }
            };


            const requestOptions = {
                method: 'POST',
                headers: {
                    'Access-Control-Request-Headers': true,
                    'Content-Type': 'text/plain',
                  },                
                body: JSON.stringify(newUser)
            };

            const body = JSON.stringify(newUser);
                const res = await fetch('http://localhost:5000/api/users', requestOptions); //No need to give full URL coz we're using proxy for localhost://5000
            
                console.log(res);    
            } catch (err) {
                console.error(err.message);
            }
            
        }
    }
    return(
        <Fragment>
            <form class="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
        </div>
        <div class="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
          <div class="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email
            </div>
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} 
            onChange={e => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2} 
            onChange={e => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
      </form>
        </Fragment>
    );
}

export default Register;