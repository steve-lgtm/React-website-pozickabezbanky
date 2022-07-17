import React, {useState, useRef} from 'react'
import styled from 'styled-components'
import '../../App.css';
import { useFormik} from 'formik';


const Dakujeme = () => {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbw5S16IyQouK3CX1MutcynVmf7k9cK68M0B5ZdRGdr0IbAG9ni0/exec"
    const [loading, setLoading] = useState(false)
    const formRef = useRef(null)
    const formik =  useFormik({
        initialValues: {

          email:'',
          name: '',
          phone:''
        },
        }
    )
    const handleSubmit = (e) =>{
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
        <form  ref={formRef}  name="google-sheet" onSubmit={handleSubmit}>
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

export default Dakujeme
