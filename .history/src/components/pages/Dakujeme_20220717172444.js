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
        Dakujemeeee
        </div>
    </FormStyle>
  )
}

export default Dakujeme
