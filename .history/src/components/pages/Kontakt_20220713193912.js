import React, {useState, useRef} from 'react'
import styled from 'styled-components'
import '../../App.css';
import { useFormik} from 'formik';


const Kontakt = () => {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbw5S16IyQouK3CX1MutcynVmf7k9cK68M0B5ZdRGdr0IbAG9ni0/exec"
    const [loading, setLoading] = useState(false)

    const formik =  useFormik({
        initialValues: {

          email:'',
          name: '',
          phone:''
        },
        onSubmit: values,e) => {
            console.log(values)
          },
        }
    )

    const handleSubmit = (e) =>{
      console.log(formRef.current)
        e.preventDefault()
        setLoading(true)

        fetch(scriptUrl, {
        method: 'POST',
        body: new FormData(formRef.current),

    }).then(res => {
            console.log("SUCCESSFULLY SUBMITTED")
            setLoading(false)
        })
        .catch(err => console.log(err))
    }

  return (
    <FormStyle>
        <div className="container">
        <form  onSubmit={formik.handleSubmit} name="google-sheet">
        <div className="input-style">
            <label htmlFor='name'>
                Name
            </label>
            <input type="text" id="name"  name="name" placeholder='Your Name *' onChange={formik.handleChange}value={formik.values.name}/>
        </div>
        <div className="input-style">
            <label htmlFor='name'>Email</label>
            <input type="email" name="email" placeholder='Your Email *' onChange={formik.handleChange} value={formik.values.email} />
        </div>
        <div className="input-style">
            <label htmlFor='name'>Phone No</label>
            <input type="number" name="phone" placeholder='Your Phone *'onChange={formik.handleChange} value={formik.values.phone} />
        </div>
        <div className="input-style">

            <input type="submit" value={loading ? "Loading..." : "SEND MESSAGE"} />
        </div>
        </form>
        </div>
    </FormStyle>
  )
}

export default Kontakt

const FormStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    .container{
        background-color: #F9CFF2;
        margin-top: 10%;
        padding: 10rem 10rem 10rem 10rem;
        display: flex;
        justify-content: center;
        align-items: center;
        @media(max-width: 610px){
            padding: 4rem 4rem 4rem 4rem;
        }

        .input-style{
            padding-top: 0.8em;
            display: flex;
            flex-direction: column;
            gap: 0.8em;

            label{
                font-family: 'Poppins', sans-serif;
            }

            input{
                outline: none;
                border: none;
                padding: 0.8em;
                border-radius: 2em;
            }
            input[type=submit]{
                background-color: #52154E;
                color: #FFFFFFFF;
                font-weight: bold;


            }
        }

    }

`
